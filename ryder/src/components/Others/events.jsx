import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../src/styles/Navbarstyles.css';
import { useNavigate } from 'react-router-dom';

const Events = () => {
   const navigate = useNavigate();
   const dummyData = [
    {
        location: 'Lagos',
        contact: 'Makurdi',
        item: "Water bag",
        Amount: '5,000',
        status: 'Pending',
    },
    {
        location: 'Abuja',
        contact: 'Jos',
        item: "Phone",
        Amount: '19,000',
        status: 'Delivered',
    },
    {
        location: 'Makurdi',
        contact: 'Ibadan',
        item: "Bottle",
        Amount: '8,000',
        status: 'Pending',
    },
    {
        location: 'Abuja',
        contact: 'kaduna',
        item: "Phone stand",
        Amount: '12,000',
        status: 'Delivered',
    },
    ];
  const [rideHistory, setRideHistory] = useState(dummyData);

    const RideHistoryEntry = ({ pickLocation, droplocation, item, Amount }) => {

    return (
      <div className={`dropelements row`}>
        <div className="col-md-3">{pickLocation}</div>
        <div className="col-md-3">{droplocation}</div>
        <div className="col-md-2">{item}</div>
        <div className="col-md-1 sub1">{Amount}</div>
        <div className="col-md-2 decision">
          <button className='toogleDecision' onClick={handleSubmit}>
            <p>Accept</p> </button>
          <button className='toogleDecision' onClick={gotoBid}>
            <p>Bid</p> </button>
        </div>
      </div>
    );
  };
    var authToken = localStorage.getItem('token');
    var userId = localStorage.getItem('riderId');
  
  function handleSubmit() {
    
  }

  function gotoBid() {
    
  }


    // var userId = 'c1f7fdaf-752f-4cea-aa1a-5f039f7d4402';
    useEffect(() => {
        // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjU3NGNiOGI3LWQ2NzAtNDE5YS05NDdiLTVkYThhYjBjNTlmZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IkF5b21pZGVAZ21haWwuY29tIiwianRpIjoiOGEyZGU1ODctMDBjYi00OWNmLWIxNDUtNWRiNDI4MjU5ZDQ3IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiQXlvbWlkZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiJBZGVveWUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjExMTExMTExMTExIiwicm9sZXMiOiJDdXN0b21lciIsImV4cCI6MTY5Nzk0ODE2MCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzA1NC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDU0LyJ9.7BzertqbOkdvJYUosanuUFz3hW0KARpsAO_mi1d2eIo'; // Replace with your actual authorization token

        axios.get(`https://ryder-test.onrender.com/api/v1/Rider/ride-history-by-id/${userId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        })
        .then((response) => {
            const data = response.data.data;

            if (Array.isArray(data)) {
                const extractedData = data.map(item => ({
                    pickLocation: item.pickUpLocation.city,
                    droplocation: item.pickUpPhoneNumber,
                    //dateTime: item.dateTime, // Make sure this property exists in your data
                    status: item.status,
                }));
                setRideHistory(extractedData);
                console.log(extractedData);
            } else {
                console.error('Response data is not as expected:', data);
            }
        })

        .catch((error) => {
            console.error('Error fetching ride history:', error);
        });
    }, []);
  return (
    <div>
      <div className="top_container">
                <div className="inside_body">
                    <div className="topper">
                        <h2>Available Rides</h2>
                        
                    </div>
                    <div className="inner_content">
                        <div className="titlle row">
                            <span className='sub col-md-3'>Pick-up Location</span>
                            <span className='sub col-md-3'>Drop-off Location</span>
                            <span className='sub col-md-2'>Item</span>
                            <span className='sub1 col-md-1'>Amount</span>
                            {/* <span className='sub col-md-2'>Select</span> */}
                        </div>
                        <div className="title_body">
                            {rideHistory.map((entry, index) => (
                                <RideHistoryEntry
                                    key={index}
                                    pickLocation={entry.location}
                                    droplocation={entry.contact}
                                    item= {entry.item}
                                    Amount= {entry.Amount}
                                    status={entry.status}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Events