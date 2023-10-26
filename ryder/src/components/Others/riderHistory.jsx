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
        <div className=''>
            <div className={`dropelements`}>
                <div className="">{location}</div>
                <div className="">{contact}</div>
                <div className="">{dateTime}</div>
                <div className={` ${statusColorClass}`}>{statusText}</div>
            </div>
        </div>
       
    );
};
    // var userId = 'ccef6b80-797c-4211-adc1-d843a59ebc83';
    // var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjNlYTQ5YmE3LTI4ZTUtNDIyYy1hMDZkLTg0MDc2NjRkY2M5ZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Ik1vc2VzQGdtYWlsLmNvbSIsImp0aSI6IjAwZDcwNjEzLTJmMjgtNDY3NC1iODFjLWE2YmIwNjg0NGRmMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6IlByYWlzZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiJNb3NlcyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDgxNDk1MzE0MjQiLCJyb2xlcyI6IlJpZGVyIiwiZXhwIjoxNjk4MzExNDEwLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDU0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcwNTQvIn0.9xJXFhqdZvTri0XToTor-gl_FyGmfCFoMqQlPUERKUU';
    var userId = localStorage.getItem('riderId');
    const authToken = localStorage.getItem('token');
    useEffect(() => {
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
                    dateTime: new Date(item.updatedAt).toLocaleString(), // Make sure this property exists in your data
                    status: item.status,
                }));
                setRideHistory(extractedData);
                console.log("Hello", extractedData);
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
                    <div className="inner_content row">
                        <div className="title col-md-12">
                            <span className='sub col-md-3'>Location</span>
                            <span className='sub col-md-3'>Receiver's Contact</span>
                            <span className='sub col-md-3'>Date/Time</span>
                            <span className='sub col-md-3'>Status</span>
                        </div>
                        <div className="title_body">
                            {rideHistory.map((entry, index) => (
                                <RideHistoryEntry
                                    key={index}
                                    location={entry.location}
                                    contact={entry.contact}
                                    dateTime={entry.dateTime}
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
