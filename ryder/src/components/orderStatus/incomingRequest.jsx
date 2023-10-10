import React from "react";
import '../../styles/orderStatus.css';



export default function IncomingRequest(){
   return (
    <div className="parent-container">
        <div className="card position-relative mx-auto shadow-lg">
        <h5 className="card-title text-light text-center">Incoming Request</h5>
            <div className="card-body text-start lh-sm">                
                <p className="card-subtitle mb-2 fw-bold fs-lg-3"><span className="pe-3">4 min</span>.2.0 km</p>
                <p className="card-text fw-bold pt-2">Collins Nwachukwu</p>
                <p className="lh-2">5, Akintayo Street, Victoria Island,Lagos</p>
            </div>
        </div>
    </div>
   )
}