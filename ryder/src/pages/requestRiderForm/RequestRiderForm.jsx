import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./RequestRiderForm.module.css";
import { backArrowIcon } from "../../assets";

import { UserNavbar } from "../../components";
import Footer from "../landing_page/footer";
import axios from 'axios';

function RequestRiderForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickUpLocation: "",
    dropOffLocation: "",
    dropOffPhoneNumber: "",
    packageDescription: "",
    Offer: null,
    pickupLatLog: {},
    dropOffLatLog: {},
  });

  const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
  const [dropOffSuggestions, setDropOffSuggestions] = useState([]);
  const [selectedPickUpLocation, setSelectedPickUpLocation] = useState("");
  const [selectedDropOffLocation, setSelectedDropOffLocation] = useState("");
  const [showPickUpSuggestions, setShowPickUpSuggestions] = useState(false);
  const [showDropOffSuggestions, setShowDropOffSuggestions] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    if (formData.pickUpLocation) {
      fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${formData.pickUpLocation}&key=${process.env.REACT_APP_googleMapsKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.predictions) {
            setPickUpSuggestions(data.predictions);
          }
        })
        .catch((error) =>
          console.error("Error fetching pickup location suggestions:", error)
        );
    } else {
      setPickUpSuggestions([]);
    }
  }, [formData.pickUpLocation]);

  useEffect(() => {
    if (formData.dropOffLocation) {
      fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${formData.dropOffLocation}&key=${process.env.REACT_APP_googleMapsKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.predictions) {
            setDropOffSuggestions(data.predictions);
          }
        })
        .catch((error) =>
          console.error("Error fetching drop-off location suggestions:", error)
        );
    } else {
      setDropOffSuggestions([]);
    }
  }, [formData.dropOffLocation]);

  const handlePickUpInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSelectedPickUpLocation(value);
    setShowPickUpSuggestions(true);
  };

  const handleDropOffInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSelectedDropOffLocation(value);
    setShowDropOffSuggestions(true);
  };

  const handleSelectPickUpLocation = (location) => {
    setSelectedPickUpLocation(location);
    setFormData((prev) => ({ ...prev, pickUpLocation: location }));
    setShowPickUpSuggestions(false);
  };

  const handleSelectDropOffLocation = (location) => {
    setSelectedDropOffLocation(location);
    setFormData((prev) => ({ ...prev, dropOffLocation: location }));
    setShowDropOffSuggestions(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getLocationDetails = async (placeId) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.REACT_APP_googleMapsKey}`
    );
    const data = await response.json();

    return data.result;
  };

  const handleFormSubmission = async () => {
    try
    {
      const requestBody = {
        pickUpLocation: formData.pickUpLocation,
        dropOffLocation: formData.dropOffLocation,
        dropoffPhoneNumber: formData.dropoffPhoneNumber,
        packageDescription: formData.packageDescription,
        Offer: formData.Offer,
        pickupLatLog: formData.pickupLatLog,
        dropOffLatLog: formData.dropOffLatLog
      };

      const response = await axios.post('https://localhost:7173/api/v1/Order/placeOrder', requestBody);

      console.log('Response from the server:', response.data);

      if(response.data.success){
        setSuccessMessage('Order placed successfully');
        setErrorMessage('');
      }else{
        setErrorMessage(response.data.message);
        setSuccessMessage('');
      }
    }
    catch (error)
    {
      console.error('An error occurred while submitting the order:', error);
      setErrorMessage('An error occurred. Please try again');
      setSuccessMessage('');
    }
  };

  const getLocationDetailsAndSubmit = async () =>{
    try{
    const pickupLatLog = await getLocationDetails(
      formData.pickUpLocation?.place_id
    );

    const dropOffLatLog = await getLocationDetails(
      formData.dropOffLocation?.place_id
    );

      console.log('Pickup LatLog:', pickupLatLog);
      console.log('DropOff LatLog:', dropOffLatLog);

    setFormData((prev) => ({
      ...prev,
      pickupLatLog: pickupLatLog.geometry.location,
      dropOffLatLog: dropOffLatLog.geometry.location,
    }));

    handleFormSubmission();

  }catch(error){
    console.error('Error retrieving location details:', error);
    setErrorMessage('Error retrieving location details. Please try again.');
    setSuccessMessage('');
  }

  };

  const handleFormSubmition = async () => {
    getLocationDetailsAndSubmit();
  }

  return (
    <>
      <UserNavbar />
      <div className={styles.con}>
        <div className={styles.body_container}>
          <div className={styles.header}>
            <div className={styles.back_btn} onClick={() => navigate(-1)}>
              <img src={backArrowIcon} alt="" />
              <span>Back</span>
            </div>
            <span>Request a Rider</span>
          </div>
          <div className={styles.form_con}>
            <label htmlFor="pickUpLocation">
              <span>Pick Up Location</span>
              <input
                type="text"
                id="pickUpLocation"
                name="pickUpLocation"
                value={selectedPickUpLocation?.description}
                onChange={handlePickUpInputChange}
              />
              {showPickUpSuggestions && (
                <ul
                  className={styles.suggestions}
                  style={{ display: showPickUpSuggestions ? "block" : "none" }}
                >
                  {pickUpSuggestions.map((location) => (
                    <li
                      key={location.place_id}
                      onClick={() => handleSelectPickUpLocation(location)}
                    >
                      {location.description}
                    </li>
                  ))}
                </ul>
              )}
            </label>
            <label htmlFor="dropOffLocation">
              <span>Drop off Location</span>
              <input
                type="text"
                id="dropOffLocation"
                name="dropOffLocation"
                value={selectedDropOffLocation?.description}
                onChange={handleDropOffInputChange}
              />
              {showDropOffSuggestions && (
                <ul
                  className={styles.suggestions}
                  style={{ display: showDropOffSuggestions ? "block" : "none" }}
                >
                  {dropOffSuggestions.map((location) => (
                    <li
                      key={location.place_id}
                      onClick={() => handleSelectDropOffLocation(location)}
                    >
                      {location.description}
                    </li>
                  ))}
                </ul>
              )}
            </label>
            <label htmlFor="dropOffPhoneNumber">
              <span>Drop off Phone Number</span>
              <input
                type="tel"
                id="dropOffPhoneNumber"
                name="dropOffPhoneNumber"
                value={formData.dropOffPhoneNumber}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label htmlFor="packageDescription">
              <span>Package Description</span>
              <input
                type="tel"
                id="packageDescription"
                name="packageDescription"
                value={formData.packageDescription}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label htmlFor="Offer">
              <span>Offer (NGN)</span>
              <input
                type="number"
                id="Offer"
                name="Offer"
                value={formData.Offer}
                onChange={(e) => handleChange(e)}
              />
            </label>
            {successMessage && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}
            {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}
            <button type="button" onClick={handleFormSubmition}>
              Order Ride
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RequestRiderForm;