import React, { useState } from "react";
import "../styles/Passwordresetverification.css";
import mail from "../images/Vector.png";
import axios from "axios";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = localStorage.getItem('userEmail');

      const response = await axios.post(
        "https://ryder-test.onrender.com/api/v1/Authentication/SendConfirmEmail",
        {
          email,
        }
      );
  
      if (!response.data.succeeded) {
        setSuccessMessage("");
        setError(response.data.message);
      } else {
        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message)
      } else {
        setError(error.response.data.message)
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="passwordverification">
      <div className="holder">
        <div className="image">
          <img src={mail} alt="" />
        </div>
        <h1 className="texttwo pt-5"> Verify your email</h1>
        <p className="mytext pt-4">
          Hi there, A link has been sent to your mail for verification, if you cant see it, 
          use the link below to generate another link, verify and start enjoying Ryder.
        </p>
        <button className="verify pt-2" onClick={handleSubmit}>
          {loading ? "Sending you a mail..." : "Verify Email"}
        </button>

        <p>
          <b style={{ color: "green", fontSize: "16px" }}>{successMessage}</b>
        </p>

      </div>
    </div>
  );
};

export default VerifyEmail;
