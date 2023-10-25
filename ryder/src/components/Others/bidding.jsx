import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../src/styles/bidding.css';
import info from '../../images/icons/Info.png'
import RiderNavbar from '../dashboard/riderNavbar';
import { useNavigate } from "react-router-dom";
    
const Bidding = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [error, setError] = useState('');
    const [acceptedOrderIndex, setAcceptedOrderIndex] = useState(-1);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [orderLoading, setOrderLoading] = useState({});
    const navigate = useNavigate();
    
    const RideHistoryEntry = ({ pickLocation, droplocation, item, Amount, orderId, onAccept, onDecline, isDeclined, email, name}) => {
    const handleAccept = () => {
        onAccept(orderId, email);
    };

    const handleDecline = () => {
        onDecline(orderId);
    };
    
    return (
    <div className="elements">
      <div className="first">
        <span>Pickup location</span>
        <h5>{pickLocation}</h5>
      </div>
      <div className="second">
        <span>Delivery location</span>
        <h5>{droplocation}</h5>
      </div>
      <div className="third">
        <span>Package</span>
        <h5>{item}</h5>
      </div>
      <div className="forth">
        <span>Offer</span>
        <h5>{Amount}</h5>
      </div>

      <div className="button-container">
            <button
                className={`accept ${orderLoading[orderId] ? 'loading' : ''}`}
                onClick={() => handleAccept(orderId, email, name)}
                disabled={isDeclined}
            >
                Accept Request
            </button>
            <button
                className={`decline ${isDeclined ? 'declined' : ''}`}
                onClick={() => handleDecline(orderId, isDeclined)}
                disabled={isDeclined}
            >
                Decline
            </button>
        </div>
    </div>
  );
};

    // localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjNlYTQ5YmE3LTI4ZTUtNDIyYy1hMDZkLTg0MDc2NjRkY2M5ZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Ik1vc2VzQGdtYWlsLmNvbSIsImp0aSI6IjdmZjEzMTAxLTAyOTYtNDBkMS1iZTdhLWNjNTYyZWEzMjFiZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6IlByYWlzZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiJNb3NlcyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDgxNDk1MzE0MjQiLCJyb2xlcyI6IlJpZGVyIiwiZXhwIjoxNjk4MTc1MzA4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDU0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcwNTQvIn0.b8hvXG0ka8jBWSetOgZ6-GLJziunav1K-MrMXtSAtYM");
    // localStorage.setItem('email', "ogwuchedavid1@gmail.com");
    // localStorage.setItem('riderId', "3ea49ba7-28e5-422c-a06d-8407664dcc9e")

    /// --------------------------------------------------
    
    var token = localStorage.getItem('token');
    var riderId = localStorage.getItem('riderId');

  function handleAccept(orderId, email, name) {
    setOrderLoading({ ...orderLoading, [orderId]: true });

    axios
        .post(
        `https://ryder-test.onrender.com/api/v1/Order/accept/`,
        {
            orderId,
            riderId,
        },
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        )
        .then((response) => {
        if (!response.data.succeeded) {
            setError(response.data.message);
        } else {
            setError('');
            const acceptedOrder = orderHistory.find(
            (order) => order.orderId === orderId
            );
            if (acceptedOrder) {
            setAcceptedOrderIndex(orderHistory.indexOf(acceptedOrder));
            setShowSuccessMessage(true);
                
           // Payment Initialization Requestt
            const paymentData = {
                amountInKobo: acceptedOrder.Amount,
                email: email,
                callbackUrl: 'https://ryder-frontend.vercel.app/verify-payment', 
                currency: 'NGN', 
            };
            axios
                .post( `https://ryder-test.onrender.com/api/payment/initialize-payment/`,
                paymentData,
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
                )
                .then((response) => {
                    if (!response.data.succeeded) {
                        console.log("Error", response.data.data.message)
                    } else {
                        navigate('/verify-email');
                        console.log("Waiting for customer to make paymets");
                    }
                console.log('Payment Initialization Response:', response.data.data.message);
                })
                .catch((error) => {
                console.error('Error initializing payment:', error);
                });
            }
        }
        })
        .catch((error) => {
        if (error.response && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError(error.response.data.message);
        }
        console.error('Error accepting the order:', error);
        })
        .finally(() => {
        setOrderLoading({ ...orderLoading, [orderId]: false });
        });
    }


  function handleDecline(orderId) {

    axios
      .post(
        `https://ryder-test.onrender.com/api/v1/Order/decline`,
        {
          orderId,
          riderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succeeded) {
          setError('');
          const declinedOrderIndex = orderHistory.findIndex(
            (order) => order.orderId === orderId
          );
            console.log("Declined Order: ",declinedOrderIndex);

          if (declinedOrderIndex !== -1) {
            // Make the buttons unclickable for the specific user
            setOrderHistory((prevOrderHistory) => {
              const updatedOrderHistory = [...prevOrderHistory];
              updatedOrderHistory[declinedOrderIndex].declined = true;
              return updatedOrderHistory;
            });
          }
        } else {
          setError(response.data.message);
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Error declining the order');
        }
        console.error('Error declining the order:', error);
      });
  }
    
    useEffect(() => {
        axios.get(`https://ryder-test.onrender.com/api/v1/Order/filter`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            const data = response.data.data;
            console.log("Here:",  data);
            if (Array.isArray(data)) {
                const extractedData = data.map(item => ({
                    pickLocation: item.pickUpLocationAddressDescription,
                    droplocation: item.dropOffLocationAddressDescription,
                    item: item.packageDescription,
                    Amount: item.amount,
                    status: item.status,
                    orderId: item.orderId,
                    declined: false,
                    email: item.email,
                    name: item.name
                }));

                const filteredData = extractedData.filter(item => !item.declined);
                setOrderHistory(filteredData);
                console.log("Hello", extractedData);
            } else {
                console.error('Response data is not as expected:', data);
            }
        })
        .catch((error) => {
            console.error('Error order details:', error);
        });
    }, []);

  return (
    <div>
        <RiderNavbar />
      <div className="bid_container">
                <div className="inside_body">
                    <div className="bid_topper">
                        <h2>Bidding Orders</h2>
                      <div className="message"><img src={info} /><span>You can accept or decline a bid</span></div>
                    </div>
                    <div className="inner_content">
                        <div className="title_body">
                            {orderHistory.map((entry, index) => (
                                <RideHistoryEntry
                                key={index}
                                pickLocation={entry.pickLocation}
                                droplocation={entry.droplocation}
                                item={entry.item}
                                Amount={entry.Amount}
                                orderId={entry.orderId}
                                onAccept={() => handleAccept(entry.orderId, entry.email, entry.name)}
                                onDecline={handleDecline}
                                isDeclined={entry.declined}
                                email={entry.email}
                                name={entry.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Bidding