/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Email from "../../images/Email.svg";
import "../../styles/confirmPasswordReset.css";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

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
  const location = useLocation();
  const [isResending, setIsResending] = useState(false);
  const emailFromPreviousPage = location.state && location.state.email;

  const successful = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  const failed = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  const handleResendEmail = async () => {
    try {
      setIsResending(true);
      // Use the email from the previous page
      const emailToResend = emailFromPreviousPage;

      // Make an API call to resend the email using the emailToResend
      const apiUrl = process.env.REACT_APP_API_URL_FORGOT_PASSWORD; // Use the same API endpoint
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: emailToResend })
      });

      const data = await response.json();
      console.log("response retry: ", data);

      if (data.success) {
        successful("Email resend successful!");
      } else {
        failed("Email resend failed. Please try again.");
      }
    } catch (error) {
      console.error("Error resending email:", error);
      failed("An error occurred while resending the email.");
    } finally {
      setIsResending(false);
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
                  color: "#FB8500"
                }}
              >
                Click to Resend link
              </a>
            </p>

            <div className="div-wrapper">
              <button style={{ width: "204px" }}>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Back to Login
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </BodyContainer>
  );
};

export default ConfirmPasswordReset;
