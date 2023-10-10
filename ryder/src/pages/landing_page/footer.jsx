import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaGoogle
} from "react-icons/fa";

import dispatchBuddy from "../../images/dispatch-buddy.svg";

const Footer = () => {
  return (
    <footer className="text-light py-4 ft-bg-custom">
      <div className="container">
        <div className="row justify-content-center ">
          {/* First div */}
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                <Link to="/">
                  <img
                    src={dispatchBuddy}
                    alt="Dispatch Buddy"
                    className="mr-2"
                  />
                </Link>
                <p className="mb-0 ms-2">
                  Dispatch<br></br>Buddy
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-between flex-column flex-md-row align-items-center">
                {" "}
                {/* Added flex-column and flex-md-row */}
                <Link to="/" className="text-decoration-none text-light">
                  <p>Home</p>
                </Link>
                <Link to="/about" className="text-decoration-none text-light">
                  <p>About Us</p>
                </Link>
                <Link to="/faq" className="text-decoration-none text-light">
                  <p>FAQ</p>
                </Link>
                <Link to="/contact" className="text-decoration-none text-light">
                  <p>Contact Us</p>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-center justify-content-md-between ms-0 ms-md-5 me-0 me-md-5 ps-0 ps-md-5 pe-0 pe-md-5">
                {" "}
                {/* Updated alignment */}
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none mr-3"
                >
                  <FaFacebookSquare />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none mr-3"
                >
                  <FaTwitterSquare />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none mr-3"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none"
                >
                  <FaGoogle />
                </a>
              </div>
            </div>
          </div>

          {/* Second div */}
          <div className="row mt-4">
            <div className="col-md-4">
              <p className="text-center">© 2022 All rights reserved</p>{" "}
              {/* Centered text */}
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-between flex-column flex-md-row align-items-center">
                <Link
                  to="/privacy-policy"
                  className="text-light text-decoration-none"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-of-service"
                  className="text-light text-decoration-none"
                >
                  Terms of Service
                </Link>
                <Link to="/legal" className="text-light text-decoration-none">
                  Legal
                </Link>
                <Link to="/help" className="text-light text-decoration-none">
                  Help
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <p className="text-center">English version</p>{" "}
              {/* Centered text */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
