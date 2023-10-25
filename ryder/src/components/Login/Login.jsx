import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Login/login.module.css";
import axios from "axios";
import AppNavbar from "../AppNavbar";
import Footer from "../../pages/landing_page/footer";
import { Link } from "react-router-dom";
import Bike from "../../images/RyderImg.svg";
import Logo from "../../images/Ryder-Logo.svg";
import mailLogo from "../../images/Mailbox.svg";
import PasswordLogo from "../../../src/images/Password.svg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const isPasswordValid = passwordRegex.test(formData.password);
  const isEmailValid = emailRegex.test(formData.email);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isEmailValid) {
        setError("Please enter a valid email address.");
        setSuccessMessage("");
        setLoading(false);
        return;
      }

      if (!isPasswordValid) {
        setError(
          "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
        );
        setSuccessMessage("");
        setLoading(false);
        return;
      }
      setError("");

      const response = await axios.post(
        "https://ryder-test.onrender.com/api/v1/Authentication/Login",
        formData
      );
      console.log(response);

      if (response.data.succeeded) {
        localStorage.setItem("userId", response.data.data.userId);
        localStorage.setItem("riderId", response.data.data.riderId);
        localStorage.setItem("token", response.data.data.token);

        var res = response.data.data.userRole;
        if (res === "Rider") {
          navigate("/ryder-dasboard");
        } else if (res === "Customer") {
          navigate("/customer-dashboard");
        }
        setSuccessMessage("");
        setError(response.data.message);
      } else {
        setError("response.message");
        setSuccessMessage(response.data.message);
      }
      // Clear input fields after successful registration
      setFormData({ email: "", password: "" });
      setError("");
    } catch (error) {
      if (error.response) {
        setSuccessMessage("");
        setError(error.response.data.message);
      } else {
        console.error(error);
        setError("An error occurred during Login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppNavbar />
      <div className={`${styles.wrapper} row`}>
        <div className={`${styles.holder} col-md-12`}>
          <div className={`${styles.left} col-md-7`}>
            <img src={Bike} alt="" height={800} />
          </div>
          <div className={`${styles.right} col-md-5`}>
            <div className={`${styles.content}`}>
              <div className={`${styles.logoholder} mt-6`}>
                <img src={Logo} alt="" />
              </div>

              <form action="" method="post" className="elements">
                <h3 className={`${styles.login} mt-2`}>Login</h3>

                <div className="form-holder col-md-12">
                  <label className="mt-2">
                    <b>Email</b>
                  </label>
                  <div className={`${styles.input_container}`}>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter your Email"
                      className={`${styles.form_control} form-control px-5 mt-1`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <img
                      src={mailLogo}
                      alt=""
                      className={`icon ${styles.icon}`}
                    />
                  </div>
                </div>
                <div className="form-holder col-md-12">
                  <label className="mt-2">
                    <b>Password</b>
                  </label>
                  <div className={`${styles.input_container}`}>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className={`${styles.form_control} form-control px-5 mt-1`}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <img
                      src={PasswordLogo}
                      alt=""
                      className={`icon ${styles.icon}`}
                    />
                  </div>
                  <br />
                </div>

                <Link
                  to="/forget-password"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Forgot password?
                </Link>

                {/* Display error message */}
                {error && (
                  <div
                    className="error-message col-md-12"
                    style={{ textAlign: "center", color: "red" }}
                  >
                    {error}
                  </div>
                )}

                {/* Display success message */}
                {successMessage && (
                  <div
                    className={`${styles.messages1}form-holder col-md-12`}
                    style={{ textAlign: "center", color: "green" }}
                  >
                    <small>
                      <b>{successMessage}</b>
                    </small>
                  </div>
                )}
                {/* Display loading spinner */}
                {loading && (
                  <div
                    className={`${styles.messages2}form-holder col-md-12`}
                    style={{ textAlign: "center", color: "yellow" }}
                  >
                    <small>Loading...</small>
                  </div>
                )}

                <div className="form-holder col-md-12">
                  <button
                    className={`${styles.submitting}`}
                    type="submit"
                    onClick={handleLogin}
                  >
                    {" "}
                    Login{" "}
                  </button>
                </div>
                <div
                  className="form-holder mt-2"
                  style={{ textAlign: "left", marginTop: "25px" }}
                >
                  <label>
                    <p className={`${styles.signs}`}>
                      {" "}
                      Don't have an account?{" "}
                      <Link to="/customer-SignUp" className={`${styles.acct}`}>
                        Create account
                      </Link>
                    </p>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
