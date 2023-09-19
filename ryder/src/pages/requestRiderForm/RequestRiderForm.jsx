import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import styles from "./RequestRiderForm.module.css";
import { backArrowIcon } from "../../assets";

function RequestRiderForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    pickUpLocation: "",
    dropOffLocation: "",
    dropOffPhoneNumber: "",
    Offer: 0,
  });

  const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
  const [dropOffSuggestions, setDropOffSuggestions] = useState([]);
  const [selectedPickUpLocation, setSelectedPickUpLocation] = useState("");
  const [selectedDropOffLocation, setSelectedDropOffLocation] = useState("");
  const [showPickUpSuggestions, setShowPickUpSuggestions] = useState(true)
  const [showDropOffSuggestions, setShowDropOffSuggestions] = useState(true)

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
      setDropOffSuggestions([])
    }
  }, [formData.dropOffLocation])

  const handlePickUpInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSelectedPickUpLocation(value)
    setShowPickUpSuggestions(true)
  };

  const handleDropOffInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSelectedDropOffLocation(value)
    setShowDropOffSuggestions(true)
  };

  const handleSelectPickUpLocation = (location) => {
    setSelectedPickUpLocation(location.description);
    setFormData((prev) => ({ ...prev, pickUpLocation: location.description }));
    setShowPickUpSuggestions(false); 
  }

  const handleSelectDropOffLocation = (location) => {
    setSelectedDropOffLocation(location.description);
    setFormData((prev) => ({ ...prev, dropOffLocation: location.description }));
    setShowDropOffSuggestions(false)
  }

  const handlePickUpInputBlur = () => {
    setShowPickUpSuggestions(false)
  }

  const handleDropOffInputBlur = () => {
    setShowDropOffSuggestions(false)
  }


  return (
    <div className={styles.con}>
          <div className={styles.body_container}>
        <div className={styles.header}>
          <div className={styles.back_btn} onClick={()=>navigate(-1)}>
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
              value={selectedPickUpLocation}
              onChange={handlePickUpInputChange}
              onBlur={handlePickUpInputBlur}
            />
            {showPickUpSuggestions && (
              <ul className="suggestions">
                {pickUpSuggestions.map((location) => (
                  <li
                    key={location.place_id}
                    onClick={() => handleSelectPickUpLocation(location.description)}
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
              value={selectedDropOffLocation}
              onChange={handleDropOffInputChange}
              onBlur={handleDropOffInputBlur}
            />
            {showDropOffSuggestions && (
              <ul className="suggestions">
                {dropOffSuggestions.map((location) => (
                  <li
                    key={location.place_id}
                    onClick={() =>
                      handleSelectDropOffLocation(location.description)
                    }
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
              type="text"
              id="dropOffPhoneNumber"
              name="dropOffPhoneNumber"
              value={formData.dropOffPhoneNumber}
              onChange={handlePickUpInputChange}
            />
          </label>

          <label htmlFor="Offer">
            <span>Offer (NGN)</span>
            <input
              type="text"
              id="Offer"
              name="Offer"
              value={formData.Offer}
              onChange={handlePickUpInputChange}
            />
          </label>

          <button type="button" onClick={() => console.log(formData)}>
            Order Ride
          </button>
        </div>
      </div>
      </div>
  );
};

export default RequestRiderForm;