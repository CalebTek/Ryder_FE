import React, { useState } from "react";
import "../../styles/passwordreset.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [forgetpass, setForgetPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const [error, setError] = useState("");
  const isEmailValid = emailRegex.test(forgetpass);
  const [successMessage, setSuccessMessage] = useState("");

  const successful = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  const failed = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isEmailValid) {
        setError("Please enter a valid email address.");
        failed();
        setSuccessMessage("");
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL_FORGOT_PASSWORD;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: forgetpass })
      });

      const data = await response.json();

      if (!data.succeeded) {
        setSuccessMessage("");
        setError(data.message);
        failed();
      } else {
        setError("");
        setSuccessMessage(data.message);
        successful();

        // Pass the email as a state when navigating to ConfirmPasswordReset
        navigate("/password-reset-verification", {
          state: { email: forgetpass }
        });
      }
      setForgetPassword("");
    } catch (error) {
      console.error(error);
      setError("An error occurred while sending the email");
      failed();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="forgotpassword">
        <div className="holders">
          <form className="forgotpassword-form" action="">
            <div className="forgetpassword-container">
              <h1 className="text-one">Forget Password</h1>
              <p>
                Enter the email associated with your account, and we will send
                an email with instructions to reset your password.
              </p>
            </div>
            <div className="forget">
              <h5>Email</h5>
              <input
                className="form-control p-3"
                placeholder="Enter your email address"
                type="text"
                value={forgetpass}
                onChange={(e) => setForgetPassword(e.target.value)}
              />
              <button className="forgotpassword-send" onClick={handleSubmit}>
                Reset Password
              </button>
              {/* Display error message */}
              {error && (
                <div
                  className="form-holder"
                  style={{ color: "red", textAlign: "center" }}
                >
                  <small>
                    <b>{error}</b>
                  </small>
                </div>
              )}
              {/* Display success message */}
              {successMessage && (
                <div
                  className="form-holder"
                  style={{ color: "green", textAlign: "center" }}
                >
                  <small>
                    <b>{successMessage}</b>
                  </small>
                </div>
              )}
              {/* Display loading spinner  */}
              {loading && (
                <div className="form-holder" style={{ textAlign: "center" }}>
                  <small>Loading...</small>
                </div>
              )}
            </div>
          </form>
          <Link to="/login">
            <button className="redirect-login">Back to login</button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgetPassword;
