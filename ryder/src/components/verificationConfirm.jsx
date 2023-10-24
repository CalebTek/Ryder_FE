import React, { useEffect, useState } from "react";
import { RotatingSquare } from 'react-loader-spinner'
import '../../src/styles/special.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerificationConfirm = () => {
    const [initial, setInitialMessage] = useState("Verifying Email, Hang Tight...");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          // Extract email and token from the current URL
          const urlSearchParams = new URLSearchParams(window.location.search);
          const token = urlSearchParams.get("token");
          const email = urlSearchParams.get("email");
        
          try {
            const response = await axios.post(
              "https://ryder-test.onrender.com/api/v1/Authentication/confirm-email",
              {
                email,
                token
              }
            );

            if (!response.data.succeeded) {
                setInitialMessage(response.data.message)
                setTimeout(() => {
                    setInitialMessage("Failed to Verify your email, try again")
                }, 9000);
              } else {
                setInitialMessage(response.data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
              }
            } catch (error) {
              if (!error.response.data.succeeded) {
                setInitialMessage(error.response.data.message)
              } else {
                setInitialMessage(error.response.data.message)
              }
            }
        };
      
        fetchData();
      }, []);
      
  return (
    <div>
         <div className='holderInprocess'>
            <div className="content">
                <RotatingSquare
                height="100"
                width="100"
                color="#FB8500"
                ariaLabel="rotating-square-loading"
                strokeWidth="4"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}  
                />
                <span>{initial}</span>
            </div>
        </div>

    </div>
  )
}

export default VerificationConfirm;