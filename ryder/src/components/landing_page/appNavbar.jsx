import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import ryder from "../../images/ryder.svg";

const AppNavbar = () => {
  return (
    <Navbar bg="white" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={ryder}
            alt="Ryder Logo"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
