import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Footer.module.css";
import logo from "../../assets/homeImages/logo.png";
import { NavLink } from "react-router-dom";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="position-relative bottom-0">
      <Container>
        <Row className="text-center text-xl-start">
          <Col lg={6} xl={2} className={`mb-sm-4 mb-md-4 ${styles.logo}`}>
            {/* <div className=""> */}
            <NavLink to={"/"}>
              <img src={logo} alt="logo" />
              <span>Y</span>ourCar
            </NavLink>
            {/* </div> */}
          </Col>
          <Col lg={6} xl={3} className="d-flex justify-content-evenly">
            <ul className="mt-1 p-0">
              <li className="mb-2">
                <NavLink to={"/"}>Listings</NavLink>
              </li>
              <li className="mb-2">
                <NavLink to={"/"}>FAQ</NavLink>
              </li>
              <li className="mb-2">
                <NavLink to={"/"}>About us</NavLink>
              </li>
            </ul>
            <ul className="mt-1 p-0">
              <li className="mb-2">
                <NavLink to={"/"}>Blog</NavLink>
              </li>
              <li className="mb-2">
                <NavLink to={"/"}>Our team</NavLink>
              </li>
              <li className="mb-2">
                <NavLink to={"/"}>Contact</NavLink>
              </li>
            </ul>
          </Col>
          <Col lg={6} xl={4}>
            <p className={`mx-auto ${styles.award}`}>
              Award-winning, family owned dealership of new and pre-owned
              vehicles with several locations across the city. Lowest prices and
              the best customer service guaranteed.
            </p>
          </Col>
          <Col lg={6} xl={3}>
            <p tel="" className={styles.phone}>
              (123) <span>456-78901</span>
            </p>
            <p>support@YourCar.com</p>
            <address>West 12th Street New York, NY, USA</address>
          </Col>
        </Row>
        <hr className="my-5"></hr>
        <Row className={`text-center text-md-start {styles.copyright}`}>
          <Col md={6}>
            <p className="mb-2 mb-md-0 text-break">
              Copyright © {new Date().getFullYear()} <span>YourCar. </span>All
              rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center">
            <ul className="list-unstyled d-flex justify-content-center justify-content-md-end">
              <li className="me-2">
                <a href="#">
                  <BsFacebook />
                </a>
              </li>
              <li className="me-2">
                <a href="#">
                  <BsTwitter />
                </a>
              </li>
              <li className="me-2">
                <a href="#">
                  <BsInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
