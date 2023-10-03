import React from "react";
import "../styles/Passwordresetverification.css";
import mail from "../images/Vector.png";

const VerifyEmail = () => {
  return (
    <div className="passwordverification">
      <div className="holder">
        <div className="image">
          <img src={mail} alt="" />
        </div>
        <h1 className="texttwo pt-5"> Verify your email</h1>
        <p className="mytext pt-4">
          Hi there, use the link below to verify your email and start enjoying
          Ryder
        </p>
        <button className="verify pt-2">Verify email</button>
      </div>
    </div>
  );
};

export default VerifyEmail;
