/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Email from "../../images/Email.svg";
import "../../styles/confirmPasswordReset.css";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
// import { Link, useLocation } from "react-router-dom";

// Define a styled component for the body
const BodyContainer = styled.body`
  font-family: "Manrope";
  background-color: #f5f5f5;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ConfirmPasswordReset = () => {
  const handleResendEmail = async () => {
    try {
      const response = await axios.post(
        "https://ryder-test.onrender.com/api/v1/Authentication/SendConfirmEmail"
      );
      // Handle the response if necessary
    } catch (error) {
      // Handle errors here
      console.error("Error occurred while sending email:", error);
    }
  };

  return (
    <BodyContainer>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="frame">
            <img
              className="img-fluid"
              alt="Vector"
              src={Email}
              style={{ height: "72px", width: "90px", alignSelf: "center" }}
            />
            <h1 className="mt-3 text-center">Check your mail</h1>
            <p className="text-center">
              We sent a password reset link to your email. <br />
              Please click the link to reset your password
            </p>
            <p className="text-center">
              Didn't receive the email?{" "}
              <a
                href="#"
                onClick={handleResendEmail}
                style={{
                  textDecoration: "none",
                  color: "#FB8500",
                }}
              >
                Click to Resend link
              </a>
            </p>
            <Link to="/login" className="div-wrapper">
              <button style={{ width: "204px" }}>Back to Login</button>
            </Link>
          </div>
        </div>
      </div>
    </BodyContainer>
  );
};

export default ConfirmPasswordReset;
