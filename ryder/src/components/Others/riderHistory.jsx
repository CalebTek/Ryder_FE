import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/riderHistory.css';
import Filter from '../../../src/images/icons/Filter.png';
import RiderNavbar from '../dashboard/riderNavbar';
import Footer from '../../pages/landing_page/footer';

const RiderHistory = () => {
    const [rideHistory, setRideHistory] = useState([]);

    const RideHistoryEntry = ({ location, contact, dateTime, status }) => {
    let statusText = '';
    let statusColorClass = '';

    switch (status) {
        case 1:
            statusText = 'Order Placed';
            statusColorClass = 'status-order-placed';
            break;
        case 2:
            statusText = 'Pending Confirmation';
            statusColorClass = 'status-pending-confirmation';
            break;
        case 3:
            statusText = 'Accepted';
            statusColorClass = 'status-accepted';
            break;
        case 4:
            statusText = 'In Progress';
            statusColorClass = 'status-in-progress';
            break;
        default:
            statusText = 'Delivered';
            statusColorClass = 'status-delivered';
    }

    return (
        <div className={`dropelements row`}>
            <div className="col-md-2">{location}</div>
            <div className="col-md-3">{contact}</div>
            <div className="col-md-5">{dateTime}</div>
            <div className={`col-md-2 ${statusColorClass}`}>{statusText}</div>
        </div>
    );
};

    var userId = localStorage.getItem('riderId');
    // var userId = 'c1f7fdaf-752f-4cea-aa1a-5f039f7d4402';
    useEffect(() => {
        const authToken = localStorage.getItem('token');
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
                    location: item.pickUpLocation.city,
                    contact: item.pickUpPhoneNumber,
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
            <RiderNavbar />
            <div className="top_container">
                <div className="inside_body">
                    <div className="topper">
                        <h2>Ride History</h2>
                        <div className="filter">
                            <img src={Filter} alt="" srcSet="" />
                        </div>
                    </div>
                    <div className="inner_content">
                        <div className="title row">
                            <span className='sub col-md-2'>Location</span>
                            <span className='sub col-md-3'>Receiver's Contact</span>
                            <span className='sub1 col-md-5'>Date/Time</span>
                            <span className='sub col-md-2'>Status</span>
                        </div>
                        <div className="title_body">
                            {rideHistory.map((entry, index) => (
                                <RideHistoryEntry
                                    key={index}
                                    location={entry.location}
                                    contact={entry.contact}
                                    dateTime= 'October, Sat 21, 2023 5:21 PM'
                                    status={entry.status}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RiderHistory;
