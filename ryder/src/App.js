import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./pages/landing_page/footer";
// Import require Styles
import Login from "./components/Login";
import CustomerSignUp from "./components/sign_page/customerSignUp";
import RiderSignUp from "./components/sign_page/riderSignUp";
import Passwordreset from "./components/passwordresets/passwordreset";
import Passwordresetverification from "./components/passwordresets/Passwordresetverification.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/landingPage.css";
import "../src/styles/dashboard.css";

//pages
import { CustomerDashBoard, RequestRiderForm, LandingPage, RiderDashboard, RyderEarnings } from './pages';

function App() {
  return (

    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="dashboard" element={<CustomerDashBoard />} />
          <Route path="request-form" element={<RequestRiderForm />} />
          <Route path="ryder-dasboard" element={<RiderDashboard />} />
          <Route path="/earnings" element={<RyderEarnings/>}/>
          <Route path="/customerSignUp" exact element={<CustomerSignUp />} />
          <Route path="/riderSignUp" exact element={<RiderSignUp />} />
          <Route path="/passwordreset" exact element={<Passwordreset />} />
          <Route path="/passwordresetverification" exact element={<Passwordresetverification/>} />
        </Routes>
y
      </div>
    </Router>
    
    
  );
}

export default App;
