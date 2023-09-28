import React from "react";
import "../../styles/orderStatus.css";
import Done from "../../images/Done.svg";
export default function OrderCompleted() {
  return (
    <div className="container parent-container h-75">
      <div className="card position-relative mx-auto shadow-lg ">
        <p className="fw-bold text-center pt-3">Order completed</p>
        <img src={Done} alt="" className="done-icon mx-auto mt-1" />
        <div className="card-body text-center lh-1 mb-2">
          <h5 className="mt-1s">Dispatch order completed</h5>
          <p>You've delieved your order</p>
          <p>
            <span>14km</span> - 35mins
          </p>
          <button className="done-btn fw-bold">End Trip</button>
        </div>
      </div>
    </div>
  );
}
