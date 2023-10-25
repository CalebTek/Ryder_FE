import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import ryder from "../../images/ryder.svg";
import { LinkContainer } from "react-router-bootstrap";
import { BsBell } from "react-icons/bs";

import defaultAvatar from "../../images/avatar.svg"; // Default avatar image
import axios from "axios";
import { useNavigate } from "react-router-dom";

//https://ryder-test.onrender.com/api/v1/Authentication/Logout

const UserNavbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    imageUrl: defaultAvatar, // Default URL to the user's profile image
  });

  useEffect(() => {
    // Check if appUserId and token are available in localStorage
    const appUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (appUserId && token) {
      // Define the URL to fetch user information
      // const baseUrl = process.env.REACT_APP_USERINFO;
      // const apiUrl = `${baseUrl}/${appUserId}`;
      //`https://localhost:7173/api/v1/User/UserInformation/${appUserId}`
      //`https://ryder-test.onrender.com/api/v1/User/UserInformation/${appUserId}`
      const apiUrl = `https://ryder-test.onrender.com/api/v1/User/UserInformation/${appUserId}`;

      // Make an HTTP GET request to fetch user information with authorization headers
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Update userData with the fetched data
          const { data } = response.data;
          const { firstName, profilePictureUrl } = data;

          const updatedUserData = {
            name: firstName, // Use the first name as the user's name
            imageUrl: profilePictureUrl || defaultAvatar, // Use profilePictureUrl if available, otherwise default avatar
          };
          setUserData(updatedUserData);
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    
    if (token) {
      // Define the URL for logout
      const logoutUrl = "https://ryder-test.onrender.com/api/v1/Authentication/Logout";

      // Make an HTTP POST request to log out with authorization headers
      axios
        .post(logoutUrl, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {

          localStorage.removeItem("token");
          localStorage.removeItem("userId");

          navigate("/login");
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
    }
    localStorage.clear();
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
            <LinkContainer to="/login">
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Dropdown alignRight>
              <Dropdown.Toggle variant="transparent" className="nav-link">
                <BsBell size={24} color="black"/>
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
                  src={userData.imageUrl || defaultAvatar} // Use userData.imageUrl, or fallback to the default avatar
                  alt="User Avatar"
                  className="user-avatar"
                  onError={() => {
                  // This function is called when there's an error loading the image
                  // Set the image source to the default avatar in case of an error
                  setUserData({ ...userData, imageUrl: defaultAvatar });
                }}
                />
              </Link>
              <span className="ml-2 ms-2">{" "}{userData.name}</span>{" "}
              {/* Display the user's name */}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
