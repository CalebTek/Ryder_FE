import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/signUp.module.css';
import axios from 'axios';
import SignUpBanner from '../../images/RyderImg.svg';
import RyderLogo from '../../images/Ryder-Logo.svg';
import 'react-toastify/dist/ReactToastify.css';
import mailLogo from '../../../src/images/icons/Email.png';
import PasswordLogo from '../../../src/images/icons/Password.png';
import Loader from './loader';
import Footer from '../../pages/landing_page/footer';
import { AppNavbar } from "../../components";


function CustomerSignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    const isPasswordValid = passwordRegex.test(password);
    const isEmailValid = emailRegex.test(email);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
      
    const handlePhoneNumberChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
        const limitedValue = numericValue.substring(0, 11);
        setPhoneNumber(limitedValue);
    
        if (limitedValue.length > 11) {
            setError('Phone number must be exactly 11 digits.');
        } else {
            setError('');
        }
    };
 
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const trimmedFirstName = firstName.trim();
            const trimmedLastName = lastName.trim();

            // Check if firstName and lastName are empty after trimming
            if (!trimmedFirstName || !trimmedLastName) {
                setError('First name and last name are required.');
                setSuccessMessage('');
                setLoading(false);
                return;
            }

            // Check for special characters or spaces in firstName and lastName
            const nameRegex = /^[A-Za-z]+$/;
            if (!nameRegex.test(trimmedFirstName) || !nameRegex.test(trimmedLastName)) {
                setError('First name and last name should only contain letters.');
                setSuccessMessage('');
                setLoading(false);
                return;
            }
            if (!isEmailValid) {
                setError('Please enter a valid email address.');
                setSuccessMessage('');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                setSuccessMessage('');
                return;
            }
        
            if (!isPasswordValid) {
                setError('Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
                setSuccessMessage('');
                return;
            }
            setError('');
            
            const response = await 
            axios.post('https://ryder-test.onrender.com/api/v1/Authentication/CreateUser/', {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
            });
            
            if (!response.data.succeeded) {
                setError(response.data.message)
            }
            else {
                setError(''); 
                setSuccessMessage(response.data.message);

                localStorage.setItem('userEmail', email);
                navigate('/verify-email');
            }
            setError('User with email already exist.')

            // Clear input fields after successful registration
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError('');
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
                <div className={`${styles.left} col-md-7`}>
                    <img src={SignUpBanner} alt="" height={750}/>
                </div>
                <div className={`${styles.right} col-md-5`}>
                    <div className={`${styles.content}`}>
                        {/* <div className={`${styles.logoholder} mt-6`}> <img src={RyderLogo} alt="" /></div> */}

                        <form action="" method="post" className='elements'>
                            <h3 className={`${styles.SignUp_H4} mt-4`}>Sign Up as a Customer</h3>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>First Name</b></label>
                                <div className={`${styles.input_container}`}>
                                    <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    className={`${styles.form_control} form-control px-5 mt-1`}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <img src={mailLogo} alt="" className={`icon ${styles.icon}`} />
                                </div>
                            </div>

                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Last Name</b></label>
                                <div className={`${styles.input_container}`}>
                                    <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className={`${styles.form_control} form-control px-5 mt-1`}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    />
                                    <img src={mailLogo} alt="" className={`icon ${styles.icon}`} />
                                </div>
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Phone Number</b></label>
                                <div className={`${styles.input_container}`}>
                                    <input
                                    type="text"
                                    placeholder="Enter your phone number"
                                    className={`${styles.form_control} form-control px-5 mt-1`}
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    />
                                    <img src={mailLogo} alt="" className={`icon ${styles.icon}`} />
                                </div>
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Email Address</b></label>
                                <div className={`${styles.input_container}`}>
                                    <input
                                    type="text"
                                    placeholder="Enter your email address"
                                    className={`${styles.form_control} form-control px-5 mt-1`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <img src={mailLogo} alt="" className={`icon ${styles.icon}`} />
                                </div>
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Password</b></label>
                                <div className={`${styles.input_container}`}>
                                    <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className={`${styles.form_control} form-control px-5 mt-1`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <img src={PasswordLogo} alt="" className={`icon ${styles.icon}`} />
                                </div>
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Confirm Password</b></label>
                                <div className={`${styles.input_container}`}>
                                    <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    className={`${styles.form_control} form-control px-5 mt-1`}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <img src={PasswordLogo} alt="" className={`icon ${styles.icon}`} />
                                </div>
                            </div>

                            {/* Display error message */}
                            {error && <div className="error-message col-md-7" style={{ textAlign: 'center', color: 'red' }}>{error}</div>}

                            {/* Display success message */}
                            {successMessage && <div className={`${styles.messages1}form-holder col-md-7`} style={{ textAlign: 'center', color: 'green' }}>
                                <small><b>{successMessage}</b></small>
                            </div>}

                            <div className="form-holder col-md-8" >
                                <button
                                    className={`${styles.submitting}`}
                                    type="submit"
                                    onClick={handleRegister}
                                > Sign Up</button>
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

export default CustomerSignUp;
