import React from "react";
import Email from "../images/Email.svg";
import "../styles/ConfirmEmail.css"; 

const ConfirmEmail = () => {
  return (
    <div className="container email-verification mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="frame">
            <img className="img-fluid vector" alt="Vector" src={Email} />
            <div className="text-wrapper mt-3">Check your mail</div>
            <p className="div">
              We sent a password reset link to your email. Please click the link to reset your password
            </p>
            <p className="didn-t-receive-the">
              <span className="span">Didn’t receive the email? </span>
              <a className="link-to-page" href="#">
                <button className="btn btn-link text-wrapper-2">Click to Resend link</button>
              </a>
            </p>

            <div className="div-wrapper">
              <button className="btn btn-primary text-wrapper-3">Back to Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;