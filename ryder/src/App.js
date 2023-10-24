import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import CustomerSignUp from "./components/sign_page/customerSignUp";
import RiderSignUp from "./components/sign_page/riderSignUp";
import SignalRChat from "./components/SignalRChat";
import ForgetPassword from "./components/passwordresets/forgetPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/landingPage.css";
import "../src/styles/dashboard.css";
import {
  CustomerDashBoard,
  RequestRiderForm,
  LandingPage,
  RiderDashboard,
} from "./pages";
import ConfirmPasswordReset from "./components/passwordresets/confirmPasswordReset"
import VerifyEmail from "./components/verifyEmail";
import ResetPassword from "./components/passwordresets/resetPassword";
import RyderEarnings from "./pages/ryderEarnings/RyderEarnings";
import VerificationConfirm from "./components/verificationConfirm";
import RiderHistory from "./components/Others/riderHistory";
import Events from "./components/Others/events";
import Bidding from "./components/Others/bidding";
import VerifyPayment from "./components/Others/verifyPayment";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/customer-dashboard" element={<CustomerDashBoard />} />
          <Route path="/request-form" element={<RequestRiderForm />} />
          <Route path="/ryder-dasboard" element={<RiderDashboard />} />
          <Route path="/earnings" element={<RyderEarnings/>}/>
          <Route path="/customer-signUp" exact element={<CustomerSignUp />} />
          <Route path="/rider-signup" exact element={<RiderSignUp />} />
          <Route path="/forget-password" exact element={<ForgetPassword />} />
          <Route
            path="/password-reset-verification"
            exact
            element={<ConfirmPasswordReset />}
          />
          <Route path="/notifications" element={<SignalRChat />} />
          <Route path="/verify-email" exact element={<VerifyEmail />} />
          <Route path="/reset-password" exact element={<ResetPassword />} />
          <Route path="/confirmation" exact element={<VerificationConfirm />} />
          <Route path="/ride-history" exact element={<RiderHistory />} />
          <Route path="/events" exact element={<Events />} />
          <Route path="/bidding" exact element={<Bidding />} />
          <Route path="/verify-payment" exact element={<VerifyPayment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
