import React from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaGoogle
} from "react-icons/fa";

import dispatchBuddy from "../../images/dispatch-buddy.svg";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 ft-bg-custom">
      <div className="container">
        <div className="row justify-content-center ">
          {/* First div */}
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="d-flex align-items-center">
                <img
                  src={dispatchBuddy}
                  alt="Dispatch Buddy"
                  className="mr-2"
                />
                <p className="mb-0 ms-2">
                  Dispatch<br></br>Buddy
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-between">
                <p>Home</p>
                <p>About Us</p>
                <p>FAQ</p>
                <p>Contact Us</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-between ms-5 me-5 ps-5 pe-5">
                <FaFacebookSquare className="mr-3" />
                <FaTwitterSquare className="mr-3" />
                <FaLinkedin className="mr-3" />
                <FaGoogle />
              </div>
            </div>
          </div>

          {/* Second div */}
          <div className="row mt-4">
            <div className="col-md-4">
              <p>© 2022 All rights reserved</p>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-between">
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>Legal</p>
                <p>Help</p>
              </div>
            </div>
            <div className="col-md-4">
              <p className="text-center">English version</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
