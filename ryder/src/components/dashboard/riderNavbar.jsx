import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import ryder from "../../images/ryder.svg";
import { LinkContainer } from "react-router-bootstrap";
import { BsBell } from "react-icons/bs";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import defaultAvatar from "../../images/avatar.svg"; // Default avatar image
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignalRChat from "../SignalRChat";

const RiderNavbar = () => {
  const navigate = useNavigate();
  const [riderData, setRiderData] = useState({
    name: "",
    imageUrl: defaultAvatar, // Default URL to the rider's profile image
  });
  
  const [riderId, setRiderId] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(false);


  useEffect(() => {
    // Check if appUserId and token are available in localStorage
    const appUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (appUserId && token) {
      // Define the URL to fetch rider information
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
            name: firstName, // Use the first name as the rider's name
            imageUrl: profilePictureUrl || defaultAvatar, // Use profilePictureUrl if available, otherwise default avatar
          };
          setRiderData(updatedUserData);
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

  // const notifications = [
  //   {
  //     id: 1,
  //     text: "New order received.",
  //     date: "2 hours ago"
  //   },
  //   {
  //     id: 2,
  //     text: "Payment confirmed.",
  //     date: "Yesterday"
  //   },
  //   {
  //     id: 3,
  //     text: "Delivery in progress.",
  //     date: "3 days ago"
  //   }
  // ];

 useEffect(() => {
    const user = localStorage.getItem("userId");
    setUserId(user);
    const rider = localStorage.getItem("riderId");
    setRiderId(rider);
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);

    try {
      const data = {
        availabilityStatus: isOnline === true ? 2 : 1,
      };
      const response = axios.post(
        `https://ryder-test.onrender.com/api/v1/Rider/update-availability/${riderId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    }
  };
  function logout() {
    localStorage.clear();
  }
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
            <LinkContainer to="/ryder-dasboard">
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
            <LinkContainer to="/">
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Dropdown alignRight>
              <Dropdown.Toggle variant="transparent" className="nav-link">
                <BsBell size={24} color="black"/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <LinkContainer to="/notification">
                    <SignalRChat />
                  </LinkContainer>
                  <div className="text-muted"></div>
                </Dropdown.Item>
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
