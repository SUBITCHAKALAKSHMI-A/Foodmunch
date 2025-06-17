import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const FoodMunchNavbar = () => {
  return (
    <Navbar expand="lg" className="navbar-light bg-white fixed-top">
      <div className="container">
        <Navbar.Brand href="#">
          <img
            src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-munch-img.png"
            className="food-munch-logo"
            alt="Food Munch Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
        <Navbar.Collapse id="navbarNavAltMarkup">
          <Nav className="ml-auto">
            <Nav.Link href="#wcuSection" id="navItem1" className="nav-link active">
              Why Choose Us? <span className="sr-only">(current)</span>
            </Nav.Link>
            <Nav.Link href="#exploreMenuSection" id="navItem2" className="nav-link">
              Explore Menu
            </Nav.Link>
            <Nav.Link href="#deliveryPaymentSection" id="navItem3" className="nav-link">
              Delivery & Payment
            </Nav.Link>
            <Nav.Link href="#followUsSection" id="navItem4" className="nav-link">
              Follow Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default FoodMunchNavbar;