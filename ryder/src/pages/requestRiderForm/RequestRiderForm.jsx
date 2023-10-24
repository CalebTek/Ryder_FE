import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./RequestRiderForm.module.css";
import { backArrowIcon } from "../../assets";

import { UserNavbar } from "../../components";
import Footer from "../landing_page/footer";
import Loader from "../../components/sign_page/loader";

function RequestRiderForm() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickUpLocation: "",
    dropOffLocation: "",
    dropOffPhoneNumber: "",
    packageDescription: "",
    Offer: "",
    pickupLatLog: null,
    dropOffLatLog: null,
  });

  const [userId, setUserId] = useState(""); 
  const [token, setToken] = useState(""); 


  const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
  const [dropOffSuggestions, setDropOffSuggestions] = useState([]);
  const [selectedPickUpLocation, setSelectedPickUpLocation] = useState("");
  const [selectedDropOffLocation, setSelectedDropOffLocation] = useState("");
  const [showPickUpSuggestions, setShowPickUpSuggestions] = useState(false);
  const [showDropOffSuggestions, setShowDropOffSuggestions] = useState(false);

  useEffect(() => { 
    setUserId(localStorage.getItem("userId"));
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (formData.pickupLatLog !== null && formData.dropOffLatLog !== null) {
      postRequest(setData(formData))
    }
    
  }, [formData.pickupLatLog, formData.dropOffLatLog]);

  // const [enableBtn, setEnableBtn] = useState(false);



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
    const validatedValue = formValidationOnChange(name, value);
    setFormData((prev) => ({ ...prev, [name]: validatedValue }));
  };




  function formValidationOnChange(name, value) {
    if (name === "dropOffPhoneNumber") {
      let validated = value.replace(/[^\d]/g, "");
      let formatted = "";

      if (validated.startsWith("234")) {
        if (validated.length > 13) {
          validated = validated.slice(0, 13);
        }
        formatted = `+${validated.slice(0, 3)}`;
        if (validated.length > 3) {
          formatted += ` ${validated.slice(3, 6)}`;
        }
        if (validated.length > 6) {
          formatted += ` ${validated.slice(6, 9)}`;
        }
        if (validated.length > 9) {
          formatted += ` ${validated.slice(9)}`;
        }
      } else if (validated.startsWith("0")) {
        if (validated.length > 11) {
          validated = validated.slice(0, 11);
        }
        formatted = `${validated.slice(0, 4)}`;
        if (validated.length > 4) {
          formatted += ` ${validated.slice(4, 7)}`;
        }
        if (validated.length > 7) {
          formatted += ` ${validated.slice(7)}`;
        }
      } else {
        return value;
      }

      return formatted;
    } else if (name === "Offer") {
      value = value.replace(/[^\d]/g, "");
      value = value.replace(/,/g, "");

      if (value.length > 3) {
        let formatted = "";
        let count = 0;

        for (let i = value.length - 1; i >= 0; i--) {
          if (count > 0 && count % 3 === 0) {
            formatted = "," + formatted;
            count = 0;
          }
          formatted = value[i] + formatted;
          count++;
        }
        return formatted;
      }

      return value;
    } else {
      return value;
    }
  }



  const getLocationDetails = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.REACT_APP_googleMapsKey}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const data = await response.json();

      return data.result;
    } catch (err) {
      console.log(err);
    }
  };

  const handlePickUpLocationBlur = () => {
    setTimeout(() => {
      setShowPickUpSuggestions(false);
    }, 500);

    return clearTimeout();
  };

  const handleDropOffLocationBlur = () => {
    setTimeout(() => {
      setShowDropOffSuggestions(false);
    }, 500);

    return clearTimeout();
  };

 

  async function postRequest(requestBody) {
    try {
     
      const response = await fetch(
        "https://ryder-test.onrender.com/api/v1/Order/placeOrder",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok && response.status === 200) {
        alert("Order Placed successfully")
        navigate("/dashboard")
      } else {
        alert("Oops Somthing Went Wrong Refreash the Page and Try Again")
      }
    } catch (error) {
      console.error("An error occurred while submitting the order:", error);
    }
  }

  function setData(formData) {
    const data = {
      pickUpLocation: {
        city:
          formData?.pickUpLocation.terms[
            formData.pickUpLocation?.terms?.length - 3
          ]?.value || "",
        state:
          formData.pickUpLocation?.terms[
            formData.pickUpLocation?.terms?.length - 2
          ]?.value || "",
        postCode: "string", 
        longitude: `${formData.pickupLatLog?.lng}`,
        latitude: `${formData?.pickupLatLog?.lat}`,
        country:
          formData.pickUpLocation?.terms[
            formData.pickUpLocation.terms?.length - 1
          ]?.value,
        AddressDescription:
          formData.pickUpLocation?.description || formData.pickUpLocation,
      },
      dropOffLocation: {
        city: formData?.dropOffLocation?.terms[
          formData.pickUpLocation.terms?.length - 3
        ]?.value,
        state:
          formData.dropOffLocation?.terms[
            formData.pickUpLocation.terms?.length - 2
          ]?.value,
        postCode: "string", 
        longitude: `${formData?.dropOffLatLog?.lng}`,
        latitude: `${formData?.dropOffLatLog?.lat}`,
        country:
          formData.dropOffLocation?.terms[
            formData.pickUpLocation.terms?.length - 1
          ]?.value,
        AddressDescription:
          formData.pickUpLocation.description || formData.pickUpLocation,
      },
      pickUpPhoneNumber: formData.dropOffPhoneNumber.replace(/\s/g, ""),
      packageDescription: formData.packageDescription,
      referenceNumber: "string",
      amount: formData.Offer.replace(/,/g, ""), 
      appUserId: userId,
    };

    return data;
  }

  
  const entireFormValidation = () => {
    let phone = formData.dropOffPhoneNumber.trim().replace(/[^\d]/g, "");
      
    const isPhoneValid =
      ((phone.startsWith("0") && phone.length <= 11) ||
      (phone.startsWith("234") && phone.length <= 13) ||
      (phone.startsWith("+234") && phone.length <= 14))

    if (
      formData.pickUpLocation &&
      formData.dropOffLocation &&
      isPhoneValid &&
      formData.packageDescription &&
      formData.Offer
    ) {
      return true;
    } else {
      return false;
    }
  };


  const handleFormSubmission = async () => {
    const dataIsValid = entireFormValidation()

    console.log(dataIsValid, "data validity")
    if (dataIsValid) {
      setLoading(true);

      const pickupLatLog = await getLocationDetails(
        formData.pickUpLocation?.place_id
      );
  
      const dropOffLatLog = await getLocationDetails(
        formData.dropOffLocation?.place_id
      );
  
      setFormData((prev) => {
        return {
          ...prev,
          pickupLatLog: pickupLatLog.geometry.location,
          dropOffLatLog: dropOffLatLog.geometry.location,
        };
      });

      setLoading(false);
    } else {
      console.log("Oops")
    }
  };

  return (
    <>
      <UserNavbar />
      <div className={styles.con}>
        {loading ? <Loader visiblility={loading} /> : !<Loader />}
        
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
                required
                type="text"
                id="pickUpLocation"
                name="pickUpLocation"
                value={selectedPickUpLocation?.description}
                onChange={handlePickUpInputChange}
                onBlur={handlePickUpLocationBlur}
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
                required
                type="text"
                id="dropOffLocation"
                name="dropOffLocation"
                value={selectedDropOffLocation?.description}
                onChange={handleDropOffInputChange}
                onBlur={handleDropOffLocationBlur}
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
                required
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
                required
                type="text"
                id="packageDescription"
                name="packageDescription"
                value={formData.packageDescription}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label htmlFor="Offer">
              <span>Offer (NGN)</span>
              <input
                required
                type="text"
                id="Offer"
                name="Offer"
                value={formData.Offer}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <div>
              <small></small>
            </div>
            <button type="button" onClick={handleFormSubmission}>
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
