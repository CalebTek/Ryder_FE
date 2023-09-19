import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import ryder from "../../images/ryder.svg";
import { LinkContainer } from "react-router-bootstrap";
import { BsBell } from "react-icons/bs";

import Avatar from "../../images/avatar.svg";

const UserNavbar = ({ userData }) => {
  userData = {
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

  return (
    <Navbar bg="white" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={ryder}
            alt="User Logo"
            className="d-inline-block align-top user-image"
          />
          {/* {userData.name} */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <LinkContainer to="/my-orders">
              <Nav.Link>My Orders</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/payment">
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/logout">
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
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
              <Link to="/user-profile">
                <img
                  src={userData.imageUrl} // Provide the user's image URL
                  alt="User Avatar"
                  className="user-avatar"
                />
              </Link>
              <span className="ml-2">{userData.name}</span>{" "}
              {/* Display the user's name */}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
