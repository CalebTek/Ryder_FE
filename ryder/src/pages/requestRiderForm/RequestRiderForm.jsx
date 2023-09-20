import {useNavigate} from "react-router-dom"
import { useState } from "react";
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

  function handleFormDataChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handleFormsubmition() {
    console.log(formData, "Form submited");
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
              value={formData.pickUpLocation}
              onChange={(e) => handleFormDataChange(e)}
            />
          </label>

          <label htmlFor="dropOffLocation">
            <span>Drop off Location</span>
            <input
              type="text"
              id="dropOffLocation"
              name="dropOffLocation"
              value={formData.dropOffLocation}
              onChange={(e) => handleFormDataChange(e)}
            />
          </label>

          <label htmlFor="dropOffPhoneNumber">
            <span>Drop off Phone Number</span>
            <input
              type="text"
              id="dropOffPhoneNumber"
              name="dropOffPhoneNumber"
              value={formData.dropOffPhoneNumber}
              onChange={(e) => handleFormDataChange(e)}
            />
          </label>

          <label htmlFor="Offer">
            <span>Offer (NGN)</span>
            <input
              type="text"
              id="Offer"
              name="Offer"
              value={formData.Offer}
              onChange={(e) => handleFormDataChange(e)}
            />
          </label>

          <button type="button" onClick={handleFormsubmition}>
            Order Ride
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestRiderForm;
