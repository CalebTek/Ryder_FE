import React, { useState } from "react";
import Bike from "../images/Bike.svg";
import Logo from "../images/RyderLogo.svg";
// import Email from "../images/Email.svg";
// import passimgage from "../images/Password.svg";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const isPasswordValid = passwordRegex.test(password);
  const isEmailValid = emailRegex.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isEmailValid) {
        setError("Please enter a valid email address.");
        setSuccessMessage("");
        return;
      }

      if (!isPasswordValid) {
        setError(
          "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
        );
        setSuccessMessage("");
        return;
      }

      const response = await axios.post("", {
        email,
        password
      });

      if (response.data.succeeded) {
        // Access the Authorization header from the response headers
        const authorizationHeader = response.headers["authorization"];

        if (authorizationHeader) {
          const token = authorizationHeader.replace("Bearer ", "");
          const result = jwtDecode(token);

          // Save the JWT token and decoded data to component state
          // (Note: useState replaces this.setState in functional components)
          //setJwtToken(token);
          //setDecodedData(result);

          // Optionally, you can also store the token in localStorage
          localStorage.setItem("userToken", JSON.stringify(result));
        }

        const fetchData = async () => {
          try {
            const apiUrl = ``;
            const response = await axios.get(apiUrl);
            // Log the data from the response
            console.log(response.data);

            console.log("success");
            navigate("/landingPage");
          } catch (err) {
            navigate("/LoginPage");
            console.log("fail");

            console.error("Error fetching data:", err);
          }
        };
        await fetchData();

        setError(""); // Clear any previous error
        setSuccessMessage(response.data.data);
      } else {
        setSuccessMessage("");
        setError(response.data.data); // Display the error message
      }

      // Clear input fields after successful login
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      if (error.response) {
        setSuccessMessage("");
        setError(error.response.data.data);
      } else {
        setSuccessMessage("");
        setError("An error occurred during Login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper-login row">
      <div className="holder-login col-md-12">
        <div className="left-login col-md-7">
          <img src={Bike} alt="" srcset="" height={700} />
          {/* <p className="delivery-service">
               <span className="text-wrapper">
                 Delivery service just got
                 <br />
                 easier, elegant &amp; superb
                 <br />
                 with{" "}
               </span>
               <span className="span">Ryder</span>
             </p> */}
        </div>

        <div className="right-login col-md-5">
          <div className="content-login">
            <div className="logoholder-login mt-6">
              {" "}
              <img src={Logo} alt="" srcset="" />
              <div className="text-wrapper-2">Ryder</div>
            </div>

            <form action="" method="post" className="elements-login">
              <h3 className="Login-H4 mt-4">Login</h3>
              <div className="form-holder col-md-7">
                <label className="mt-4">
                  <b>Email</b>
                </label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="form-control mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-holder col-md-7">
                <label className="mt-2">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  placeholder="Enter your Password"
                  className="form-control mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link
                to="/forget-password"
                className="text-wrapper-6"
                style={{ textDecoration: "none" }}
              >
                Forgot password?
              </Link>

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
              {/* Display loading spinner */}
              {loading && (
                <div className="form-holder" style={{ textAlign: "center" }}>
                  <small>Loading...</small>
                </div>
              )}

              <div className="form-holder col-md-7">
                <button
                  className="submitting"
                  type="submit"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {" "}
                  Login{" "}
                </button>
              </div>
              <div className="form-holder mt-2" style={{ textAlign: "left" }}>
                <label>
                  <p>
                    {" "}
                    Don't have an account?{" "}
                    <a className="create" href="/customer-signup">
                      Create account
                    </a>
                  </p>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
