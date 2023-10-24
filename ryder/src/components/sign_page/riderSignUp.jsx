import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpBanner from '../../images/RyderImg.svg';
import RyderLogo from '../../images/Ryder-Logo.svg';
import styles from '../../styles/signUp.module.css';
import '../../styles/special.css';
import 'react-toastify/dist/ReactToastify.css';
import mailLogo from '../../../src/images/icons/Email.png';
import Cloud from '../../../src/images/icons/Cloud.png';
import PasswordLogo from '../../../src/images/icons/Password.png';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Footer from '../../pages/landing_page/footer';
import { AppNavbar } from "../../components";
import Loader from './loader';

function RiderSignUp() {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [City, setCity] = useState('Lagos');
    const [State, setState] = useState('Lagos');
    const [PostCode, setPostCode] = useState('');
    const [Longitude, setLongitude] = useState('3.384360');
    const [Latitude, setLatitude] = useState('6.601700');
    const [Country, setCountry] = useState('Nigeria');
    const [BikeDocument, setBikeDocument] = useState('');
    const [ValidIdUrl, setValidIdUrl] = useState('');
    const [PassportPhoto, setPassportPhoto] = useState('');
    const [Password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    const isPasswordValid = passwordRegex.test(Password);
    const isEmailValid = emailRegex.test(Email);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    
    const [address, setAddress] = useState('');

    const handleLoadMap = () => {
        const script = document.createElement('script');
        script.src =`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_googleMapsKey}&libraries=places&callback=initMap`;
        script.async = true;
        document.head.appendChild(script);
    };

    useEffect(() => {
        handleLoadMap();
    }, []);
    
    const handleChange = (newAddress) => {
        setAddress(newAddress);
    };

    const handleSelect = (newAddress) => {
        let city = '';
        let state = '';
        let country = '';
    
        geocodeByAddress(newAddress)
            .then((results) => {
                if (results && results[0]) {
                    const result = results[0];
    
                    // Extracting address components (city, state, country)
                    const addressComponents = result.address_components;
                    for (const component of addressComponents) {
                        if (component.types.includes('locality')) {
                            city = component.long_name;
                        } else if (component.types.includes('administrative_area_level_1')) {
                            state = component.long_name;
                        } else if (component.types.includes('country')) {
                            country = component.long_name;
                        }
                    }
                    // Extract latitude and longitude
                    return getLatLng(result);
                }
            })
            .then((latLng) => {
                if (latLng) {
                    setAddress(newAddress);

                    setCity(city);
                    setState(state);
                    setCountry(country);
                    setLatitude(latLng.lat);
                    setLongitude(latLng.lng);
                }
            })
        .catch((error) => console.error('Error', error));
    };
    
    const handleFileChange = (e, setFile, maxFileSize, setError) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > maxFileSize) {
                setError(`File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`);
                setFile(null);
            } else {
                setError(null);
                setFile(selectedFile);
            }
        }
    };
    
    const handlePostCodeChange = (e) => {
        const newValue = e.target.value.replace(/\D/g, '');
        const maxLength = 6;
        const truncatedValue = newValue.slice(0, maxLength);

        setPostCode(truncatedValue);
    };

    const handlePhoneNumberChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
        const limitedValue = numericValue.substring(0, 12);
        setPhoneNumber(limitedValue);
        if (limitedValue.length !== 11) {
            setError('Phone number must be exactly 11 digits.');
        } else { setError(''); }
    };
  
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (!BikeDocument || !ValidIdUrl || !PassportPhoto) {
            setError('Please upload all required documents.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
    
        formData.append("FirstName", FirstName);
        formData.append("LastName", LastName);
        formData.append("PhoneNumber", PhoneNumber);
        formData.append("Email", Email);
        formData.append("City", City);
        formData.append("State", State);
        formData.append("PostCode", PostCode);
        formData.append("Longitude", Longitude);
        formData.append("Latitude", Latitude);
        formData.append("Country", Country);
        formData.append("Password", Password);
    
        formData.append("ValidIdUrl", ValidIdUrl, ValidIdUrl.name);
        formData.append("PassportPhoto", PassportPhoto, PassportPhoto.name);
        formData.append("BikeDocument", BikeDocument, BikeDocument.name);
    
        try {
            const trimmedFirstName = FirstName.trim();
            const trimmedLastName = LastName.trim();
    
            if (!trimmedFirstName || !trimmedLastName) {
                setError('First name and last name are required.');
                setSuccessMessage('');
                setLoading(false);
                return;
            }
    
            const nameRegex = /^[A-Za-z]+$/;
            if (!nameRegex.test(trimmedFirstName) || !nameRegex.test(trimmedLastName)) {
                setError('First name and last name should only contain letters.');
                setSuccessMessage('');
                setLoading(false);
                return;
            }
    
            if (!isEmailValid) {
                setError('Please enter a valid email address.');
                setLoading(false);
                return;
            }
            if (!PhoneNumber) {
                setError('Phone number is required.');
                setLoading(false);
                return;
            }
            if (!PostCode) {
                setError('Postcode is required.');
                setLoading(false);
                return;
            }
            if (Password !== confirmPassword) {
                setError('Passwords do not match');
                setLoading(false);
                return;
            }
    
            if (!isPasswordValid) {
                setError('Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
                setLoading(false);
                return;
            }
    
            
    
            if (City.trim() === '' || State.trim() === '' || Longitude === '' || Latitude === '' || Country.trim() === '') {
                setError('A location data is not set, select a valid location');
                setLoading(false);
                return;
            }
    
            setError('');
    
            const response = await axios.post('https://ryder-test.onrender.com/api/v1/Authentication/CreateRider', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (!response.data.succeeded) {
                setError('Unable to register at the moment, try again.');
            } else {
                setSuccessMessage(response.data.message); 
                localStorage.setItem('userEmail', Email);
                navigate('/verify-email');
            }
    
            // Clear input fields after successful registration
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setPassword('');
            setEmail('');
            setCity('');
            setState('');
            setPostCode('');
            setLongitude('');
            setLatitude('');
            setCountry('');
            setValidIdUrl('');
            setPassportPhoto('');
            setBikeDocument('');
            setConfirmPassword('');
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
    <AppNavbar />
        <div className={`${styles.wrapper} row`}>
        {loading ? <Loader visiblility={loading}/> : !<Loader />}
            <div className={`${styles.holder} col-md-12`}>
                <div className= {`${styles.left} col-md-9`}>
                    <img src={SignUpBanner} alt="" height={1000}/>
                </div>
                <div className={`${styles.right} col-md-5`}>
                    <div className={`${styles.content}`}>
                        {/* <div className={`${styles.logoholder} mt-6`}> <img src={RyderLogo} alt=""/></div> */}

                        <form action="" method="post" className='elements'>
                            <h2 className={`${styles.SignUp_H4} mt-4`}>Sign Up as a Rider</h2>
                            <div className="form-holder col-md-8">
                                <label className='mt-1'><b>First Name</b></label>
                                <div className={`${styles.topper_container}`}>
                                    <img src={mailLogo} alt="" className={`${styles.icon}`} />

                                    <input type="text"
                                    placeholder="Enter your first name"
                                    className={`${styles.top_control} mt-1`}
                                    value={FirstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-1'><b>Last Name</b></label>
                                <div className={`${styles.topper_container}`}>
                                    <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className={`${styles.top_control} mt-1`}
                                    value={LastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    />
                                    <img src={mailLogo} alt="" className={`${styles.icon}`} />
                                </div>
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-1'><b>Phone Number</b></label>
                                <div className={`${styles.topper_container}`}>
                                    <input
                                    type="text"
                                    placeholder="Enter your phone number"
                                    className={`${styles.top_control} mt-1`}
                                    value={PhoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    />
                                    <img src={mailLogo} alt="" className={`icon ${styles.icon}`} />
                                </div>
                            </div>

                            <div className="form-holder col-md-8">
                                <label className='mt-1'><b>Email Address</b></label>
                                <div className={`${styles.topper_container}`}>
                                    <input
                                    type="text"
                                    placeholder="Enter your email address"
                                    className={`${styles.top_control} mt-1`}
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <img src={mailLogo} alt="" className={`${styles.icon}`} />
                                </div>
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-1'><b>Location</b></label>
                                <div className="autocomplete-container">
                                    <PlacesAutocomplete
                                        value={address}
                                        onChange={handleChange}
                                        onSelect={handleSelect}
                                        onLoad={handleLoadMap}
                                        googleCallbackName= "handleLoadMap"
                                        googleCallbackParams={{ key: process.env.REACT_APP_googleMapsKey }}
                                    >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                        {...getInputProps({
                                            placeholder: 'Search Places ...',
                                            className: 'location-search-input',
                                        })}
                                        />
                                        <div className="autocomplete-dropdown-container" >
                                            {loading && <div key="loading">Loading...</div>}
                                            {suggestions.map((suggestion, index) => {
                                            const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                            return (
                                            <div
                                                key={index}
                                                {...getSuggestionItemProps(suggestion, {
                                                className,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                            );
                                        })}
                                        </div>
                                    </div>
                                    )}
                                </PlacesAutocomplete>
                                </div>
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-1'><b>Post Code</b></label>
                                <div className={`${styles.input_container}`}>
                                    <input
                                        type="text"
                                        placeholder="Enter your postcode"
                                        className={`${styles.form_control} mt-1`}
                                        value={PostCode}
                                        onChange={handlePostCodeChange}
                                    />
                                    <img src={PasswordLogo} alt="" className={`${styles.icon}`} />
                                </div>
                            </div>
                              <div className="form-holder col-md-8">
                                  <label className='mt-1'><b>Password</b></label>
                                  <div className={`${styles.input_container}`}>
                                      <input
                                          type="password"
                                          placeholder="Enter your password"
                                          className={`${styles.form_control} mt-1`}
                                          value={Password}
                                          onChange={(e) => setPassword(e.target.value)}
                                      />
                                      <img src={PasswordLogo} alt="" className={`${styles.icon}`} />
                                  </div>
                              </div>
                              <div className="form-holder col-md-8">
                                  <label className='mt-1'><b>Confirm Password</b></label>
                                  <div className={`${styles.input_container}`}>
                                      <input
                                          type="password"
                                          placeholder="Confirm your password"
                                          className={`${styles.form_control} mt-1`}
                                          value={confirmPassword}
                                          onChange={(e) => setConfirmPassword(e.target.value)}
                                      />
                                      <img src={PasswordLogo} alt="" className={`${styles.icon}`} />
                                  </div>
                              </div>
                            <div className="form-holder col-md-8">
                                
                            <label className='mt-2'><b>Bike Documents</b></label>
                            <div className={`input_container form-control ${styles.input_container}`}>
                                <div className={`${styles.takers}`}>
                                    <label className={`${styles.selection}`}>
                                        <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileChange(e, setBikeDocument, 1 * 1024 * 1024, setError)}
                                        required
                                        />
                                        <div className="inform">
                                            <img src={Cloud} alt="" className={`${styles.iconn}`} />
                                            <>Upload</>
                                        </div>
                                    </label>
                                    <div className="txt" style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {BikeDocument && (
                                        <span> {BikeDocument.name} </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            </div>

                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Valid ID</b></label>
                                <div className={`input_container form-control ${styles.input_container}`}>
                                    <div className={`${styles.takers}`}>
                                    <label className={`${styles.selection}`}>
                                        <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileChange(e, setValidIdUrl, 1 * 1024 * 1024, setError)}
                                        required
                                        />
                                        <div className="inform">
                                            <img src={Cloud} alt="" className={`${styles.iconn}`} />
                                            <>Upload</>
                                        </div>
                                    </label>
                                    <div className="txt" style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {ValidIdUrl && (
                                        <span> {ValidIdUrl.name} </span>
                                        )}
                                    </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-holder col-md-8">
                            <label className='mt-2'><b>Passport</b></label>
                            <div className={`input_container form-control ${styles.input_container}`}>
                                <div className={`${styles.takers}`}>
                                <label className={`${styles.selection}`}>
                                    <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileChange(e, setPassportPhoto, 1 * 1024 * 1024, setError)}
                                    required
                                    />
                                    <div className="inform">
                                            <img src={Cloud} alt="" className={`${styles.iconn}`} />
                                            <>Upload</>
                                        </div>
                                </label>
                                <div className="txt" style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {PassportPhoto && (
                                    <span> {PassportPhoto.name} </span>
                                    )}
                                </div>
                                </div>
                            </div>
                            </div>
                            

                              {/* Display error message */}
                              {error && <div className="error-message col-md-7" style={{ textAlign: 'center', justifyContent: 'center', color: 'red' }}>{error}</div>}
                              {/* Display success message */}
                              {successMessage && <div className={`${styles.messages1}form-holder col-md-7`} style={{ textAlign: 'center', color: 'green' }}>
                                  <small><b>{successMessage}</b></small>
                              </div>}

                            <div className="form-holder col-md-8" >
                                <button
                                    className={`${styles.submitting}`}
                                    type="submit"
                                    onClick={handleRegister}
                                > Sign Up </button>
                            </div>
                            <div className="form-holder mt-2" style={{ textAlign: 'left' }}>
                                <label>
                                    <p> Already have an account? <a href="/login">SignIn</a></p>
                                </label>
                            </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default RiderSignUp;
