import React from "react";
import "../../styles/orderStatus.css";
import Done from "../../images/Done.svg";

export default function RequestAccepted() {
  return (
    <div className="container parent-container h-75">
      <div className="card position-relative mx-auto shadow-lg ">
        <img src={Done} alt="" className="done-icon mx-auto" />
        <div className="card-body text-center lh-sm">
          <h5 className="text-center">Request Accepted</h5>
          <p className="lh-2 w-50 mx-auto">
            You've accepted to pick up{" "}
            <span className="fw-bold">Collins Nwachukwu</span> request.
          </p>

          <button className="done-btn fw-bold">Done</button>
        </div>
      </div>
    </div>
  );
}
