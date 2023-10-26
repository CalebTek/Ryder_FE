import React, { useEffect, useState } from "react";
import { RotatingSquare } from 'react-loader-spinner';
import '../../styles/special.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WaitForPayments = () => {
    const [initial, setInitialMessage] = useState("Waiting For Customer to make Payments, in 10mins...");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          // Extracting reference from the current URL
          const urlSearchParams = new URLSearchParams(window.location.search);
          const paymentReference = urlSearchParams.get("reference");
          const token = localStorage.getItem('authToken')
        
          try {
            const response = await axios.post(
              "https://ryder-test.onrender.com/api/payment/verify-payment",
              {
                paymentReference
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );

            if (!response.data.succeeded) {
                setInitialMessage(response.data.message)
                setTimeout(() => {
                    navigate("/bidding");
                }, 9000);
              } else {
                setInitialMessage(response.data.data.message);
                setTimeout(() => {
                    navigate("/accpet-confirm");
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
    );
}

export default WaitForPayments