import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Bike from "../../images/Bike.svg";
import RyderLogo from "../../images/Ryder-Logo.svg";

// Create a styled component for ResetPassword
const ResetPasswordContainer = styled.div`
  font-family: "Inter", sans-serif;
`;

// Create a styled component for input
const StyledInput = styled.input`
  width: 396px;
  height: 48px;
  padding: 9px 16px 8px 16px;
  border-radius: 6px;
  border: 1px solid;
  gap: 16px;
  opacity: 0.8;
`;

const ResetPassword = () => {
  const secondDivStyle = {
    width: "600px",
    height: "456px",
    top: "85px",
    left: "894px",
    gap: "80px"
  };

  const h1Style = {
    width: "444px",
    height: "234px",
    color: "#FFFFFF",
    fontSize: "32px",
    fontWeight: "700",
    lineHeight: "48px",
    letterSpacing: "0em"
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get("token");
  const email = queryParams.get("email");

  //console.log("Token: ", token);
  //console.log("Email: ", email);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL_RESET_PASSWORD;
  const requestData = {
    newPassword: newPassword,
    confirmPassword: confirmPassword,
    resetToken: token,
    email: email
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      //console.log("reset data: ", data);

      if (!data.succeeded) {
        setError(data.message);
      } else {
        setSuccessMessage("Password reset successfully");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while resetting the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResetPasswordContainer>
      <div className="row">
        <div
          className="col-md-6"
          style={{
            backgroundImage: `url(${Bike})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "relative"
          }}
        >
          <div style={h1Style}>
            Delivery service just got easier, elegant & superb with{" "}
            <span style={{ color: "#FB8500" }}>Ryder</span>
          </div>
        </div>

        <div
          className="col-md-6 d-flex align-items-center justify-content-center"
          style={secondDivStyle}
        >
          <div>
            <img
              src={RyderLogo}
              alt="ryder-img"
              className="img-fluid mb-5 mt-5"
            />
            <p className="mb-4 fw-bold fs-5">Reset Password</p>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <StyledInput
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="Enter your password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <StyledInput
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Re-Enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button onClick={handleResetPassword} disabled={loading}>
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {successMessage && (
              <div style={{ color: "green" }}>{successMessage}</div>
            )}
          </div>
        </div>
      </div>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;
