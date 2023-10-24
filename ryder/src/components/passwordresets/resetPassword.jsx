import React, { useState } from "react";
import styles from "../../styles/signUp.module.css";
//import axios from "axios";
import SignUpBanner from "../../images/RyderImg.svg";
import RyderLogo from "../../images/Ryder-Logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isPasswordValid = passwordRegex.test(password);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const successMess = (successMessage) => {
    toast.success(successMessage, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const errorMesage = (error) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <>
      <div className={`${styles.wrapper} row`}>
        <div className={`${styles.holder} col-md-12`}>
          <div className={`${styles.left} col-md-7`}>
            <img src={SignUpBanner} alt="" srcset="" height={700} />
          </div>
          <div className={`${styles.right} col-md-5`}>
            <div className={`${styles.content}`}>
              <div className={`${styles.logoholder} mt-6`}>
                {" "}
                <img src={RyderLogo} alt="" srcset="" />
              </div>

              <form action="" method="post" className="elements">
                <h3 className={`${styles.SignUp_H4} mt-4`}>Reset Password</h3>
                <div className="form-holder col-md-7">
                  <label className="mt-2">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="form-control mt-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-holder col-md-7">
                  <label className="mt-2">
                    <b>Confirm Password</b>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="form-control mt-1"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {/* Display success message */}
                {successMessage && (
                  <div className={`${styles.messages1}form-holder col-md-7`}>
                    <small>
                      <b>{successMessage}</b>
                    </small>
                  </div>
                )}
                {/* Display loading spinner */}
                {loading && (
                  <div className={`${styles.messages2}form-holder col-md-7`}>
                    <small>Loading...</small>
                  </div>
                )}

                <div className="form-holder col-md-7">
                  <button
                    className={`${styles.submitting}`}
                    type="submit"
                    onClick={handleRegister}
                    //disabled={!isPasswordValid} // Disable button if password is not a match
                  >
                    {" "}
                    Reset Password{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;
