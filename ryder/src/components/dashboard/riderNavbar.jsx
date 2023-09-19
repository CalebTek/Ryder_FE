import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import ryder from "../../images/ryder.svg";
import { LinkContainer } from "react-router-bootstrap";
import { BsBell } from "react-icons/bs";
import { FaToggleOff, FaToggleOn } from "react-icons/fa"; // Import the Font Awesome icons for the toggle

import Avatar from "../../images/avatar.svg";

const RiderNavbar = ({ riderData }) => {
  riderData = {
    name: "Babatunde", // User's name
    imageUrl: Avatar // URL to the user's profile image
  };

  const notifications = [
    {
      id: 1,
      text: "New order received.",
      date: "2 hours ago"
    },
    {
      id: 2,
      text: "Payment confirmed.",
      date: "Yesterday"
    },
    {
      id: 3,
      text: "Delivery in progress.",
      date: "3 days ago"
    }
  ];

  const [isOnline, setIsOnline] = useState(false);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <Navbar bg="white" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={ryder}
            alt="Rider Logo"
            className="d-inline-block align-top rider-image"
          />
          {/* {riderData.name} */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <LinkContainer to="/bidding">
              <Nav.Link>Bidding</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ride-history">
              <Nav.Link>Ride History</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/earnings">
              <Nav.Link>Earnings</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link>Availability</Nav.Link>
            </LinkContainer>
            {/* Render the appropriate icon based on the isOnline state */}
            {isOnline ? (
              <FaToggleOn
                size={36}
                onClick={toggleOnlineStatus}
                className="online-icon ml-3"
                style={{ color: "#4caf50" }}
              />
            ) : (
              <FaToggleOff
                size={36}
                onClick={toggleOnlineStatus}
                className="offline-icon ml-3"
                style={{ color: "#FB8500" }}
              />
            )}
          </Nav>
          <Nav>
            <Dropdown alignRight>
              <Dropdown.Toggle variant="transparent" className="nav-link">
                <BsBell size={24} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {notifications.map((notification) => (
                  <Dropdown.Item key={notification.id}>
                    <LinkContainer to="/notification">
                      <div>{notification.text}</div>
                    </LinkContainer>
                    <div className="text-muted">{notification.date}</div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div className="d-flex align-items-center ml-3">
              <Link to="/rider-profile">
                <img
                  src={riderData.imageUrl}
                  alt="Rider Avatar"
                  className="rider-avatar"
                />
              </Link>
              <span className="ml-2">{riderData.name}</span>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default RiderNavbar;
