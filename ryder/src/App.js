import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import CustomerSignUp from "./components/sign_page/customerSignUp";
import RiderSignUp from "./components/sign_page/riderSignUp";
import ForgetPassword from "./components/passwordresets/forgetPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/landingPage.css";
import "../src/styles/dashboard.css";
import {
  CustomerDashBoard,
  RequestRiderForm,
  LandingPage,
  RiderDashboard,
  RyderEarnings
} from "./pages";
import ConfirmPasswordReset from "./components/passwordresets/confirmPasswordReset";
import VerifyEmail from "./components/verifyEmail";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="dashboard" element={<CustomerDashBoard />} />
          <Route path="request-form" element={<RequestRiderForm />} />
          <Route path="ryder-dasboard" element={<RiderDashboard />} />
          <Route path="/earnings" element={<RyderEarnings />} />
          <Route path="/customer-signUp" exact element={<CustomerSignUp />} />
          <Route path="/rider-signup" exact element={<RiderSignUp />} />
          <Route path="/forget-password" exact element={<ForgetPassword />} />
          <Route
            path="/password-reset-verification"
            exact
            element={<ConfirmPasswordReset />}
          />
          <Route path="/verify-email" exact element={<VerifyEmail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
