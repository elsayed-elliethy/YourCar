import React, { useEffect, useState } from "react";
import styles from "./AdminNav.module.css";
import { NavLink, redirect } from "react-router-dom";
import logo from "../../../assets/homeImages/logo.png";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import useHttp from "../../../hook/use-http";
import { checkIsLogin } from "../../Auth/auth";
////
const AdminNav = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const login = checkIsLogin();
  const logoutHandler = () => {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ token: "", id: "", expirationTime: -1 })
    );
    return redirect("/");
  };
  /////getUserInfo///
  const getUserApi = `https://cars-3a440-default-rtdb.firebaseio.com/users.json`;
  const { isLoading, error, requestFn } = useHttp();
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const transformData = (data) => {
      Object.entries(data).map((ele) => {
        if (ele[1].id === currentUser.id) {
          setUserInfo({
            name: ele[1].name,
          });
        }
      });
    };
    requestFn(
      {
        url: getUserApi,
      },
      transformData
    );
  }, [requestFn, getUserApi, currentUser.id]);
  return (
    <Navbar collapseOnSelect="true" expand="lg" sticky="top">
      <Container className={`${styles.navContainer}`}>
        <Navbar.Brand className={`${styles.brand} order-0`}>
          <NavLink to={"/adminDashboard"}>
            <img src={logo} alt="logo" className={styles.logo} />
            Dashboard
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={styles.navCollapse}
        >
          <Nav className="me-auto">
            <NavLink
              to={"/adminDashboard/categories"}
              className={({ isActive }) =>
                isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
              }
            >
              Categories
            </NavLink>
            <NavLink
              to={"/adminDashboard/listings"}
              className={({ isActive }) =>
                isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
              }
            >
              Listings
            </NavLink>
            <NavLink
              to={"/adminDashboard/users"}
              className={({ isActive }) =>
                isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
              }
            >
              Users
            </NavLink>
            <NavLink
              to={"/adminDashboard/team"}
              className={({ isActive }) =>
                isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
              }
            >
              Team
            </NavLink>
            <NavLink
              to={`/`}
              className={`${styles.navlink} d-lg-none `}
              onClick={logoutHandler}
            >
              <FaSignOutAlt className="me-1" /> Sign Out
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <Nav className="text-end  d-none d-lg-block">
          <NavLink
            to={`/`}
            className={styles["dropdown-item"]}
            onClick={logoutHandler}
          >
            <FaSignOutAlt className="me-1" /> Sign Out
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminNav;
