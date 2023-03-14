import React, { useEffect, useState } from "react";
import styles from "./Nav.module.css";
import { NavLink, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/homeImages/logo.png";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { MdAdd, MdFavorite } from "react-icons/md";
import { BsGearFill, BsListUl } from "react-icons/bs";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import useHttp from "../../hook/use-http";
import { checkIsLogin } from "../../components/Auth/auth";
//
import Collapse from "react-bootstrap/Collapse";
//
const NavComponent = () => {
  const [open, setOpen] = useState(false);
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
          setUserInfo(ele[1]);
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
  const favoritesLength = useSelector((state) => {
    return state.manageFavorites.totalAmount;
  });
  /////////
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top">
      <Container className={`${styles.navContainer}`}>
        <Navbar.Brand className={`${styles.brand} order-1 order-lg-0`}>
          <NavLink to={"/"}>
            <img src={logo} alt="logo" className={styles.logo} />
            <span>Y</span>ourCar
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={`${styles.navCollapse}`}
        >
          <Nav className="me-auto">
            <NavLink
              to={"/cars/carsForSale?type=allCars"}
              className={({ isActive }) =>
                isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
              }
              end
            >
              Cars for Sale
            </NavLink>
            <NavLink
              to={"/cars/carsForRent"}
              className={({ isActive }) =>
                isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
              }
              end
            >
              Cars for Rent
            </NavLink>
            <NavLink
              to={"/sellYourCar"}
              className={({ isActive }) =>
                isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
              }
              end
            >
              Sell Your Car
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
              }
              end
            >
              About us
            </NavLink>
            <NavLink
              to={"/contactUs"}
              className={({ isActive }) =>
                isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
              }
              end
            >
              Contact
            </NavLink>
            {login && (
              <NavLink
                to={`/`}
                className={`${styles.navlink} d-lg-none`}
                onClick={logoutHandler}
              >
                <FaSignOutAlt className="me-1" /> Sign Out
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
        <Nav className="text-end order-2">
          {login && (
            <NavDropdown
              // collapseOnSelect
              title="Dashboard"
              id="collasible-nav-dropdown"
              className={`${styles.dropdown} d-none d-lg-block`}
              // className={({ isActive }) =>
              //   isActive
              //     ? `${styles.dropdown} d-none d-lg-block ${styles.active}`
              //     : `${styles.dropdown} d-none d-lg-block`
              // }
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              <Collapse in={open} timeout={9000}>
                <div id="example-collapse-text">
                  <NavLink
                    to={`/profile/${currentUser.id}?type=Account`}
                    className={styles["dropdown-item"]}
                  >
                    <div className={`${styles.dropDownImage}`}>
                      {userInfo.name?.slice(0, 1).toUpperCase()}
                    </div>{" "}
                    {userInfo.name}
                  </NavLink>
                  <NavLink
                    to={`/profile/${currentUser.id}?type=addListing`}
                    className={styles["dropdown-item"]}
                  >
                    <MdAdd className="me-1" /> Add Listing
                  </NavLink>
                  <NavLink
                    to={`/profile/${currentUser.id}?type=myListings`}
                    className={styles["dropdown-item"]}
                  >
                    <BsListUl className="me-1" /> My Listings
                  </NavLink>
                  <NavLink
                    to={`/profile/${currentUser.id}?type=favorites`}
                    className={styles["dropdown-item"]}
                  >
                    <MdFavorite className="me-1" /> My Favorites{" "}
                    <span className="position-absolute">
                      {favoritesLength}
                    </span>
                  </NavLink>
                  <NavLink
                    to={`/profile/${currentUser.id}?type=Account`}
                    className={styles["dropdown-item"]}
                  >
                    <BsGearFill className="me-1" /> Settings
                  </NavLink>
                  <NavDropdown.Divider />
                  <NavLink
                    to={`/`}
                    className={styles["dropdown-item"]}
                    onClick={logoutHandler}
                  >
                    <FaSignOutAlt className="me-1" /> Sign Out
                  </NavLink>
                </div>
              </Collapse>
            </NavDropdown>
          )}
          {login && (
            <NavLink
              to={`/profile/${currentUser.id}?type=Account`}
              className={`${styles.navlink} d-lg-none text-white`}
            >
              <div className={`${styles.image}`}>
                {userInfo?.name?.slice(0, 1).toUpperCase()}
              </div>{" "}
            </NavLink>
          )}
          {!login && (
            <NavLink
              to={"/auth?mode=login"}
              className={({ isActive }) =>
                isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
              }
            >
              <FaRegUser className={styles.loginIcon} />{" "}
              <span
                className="d-none d-lg-inline"
                // className={({ isActive }) =>
                //   isActive
                //     ? `d-none d-lg-inline ${styles.active}`
                //     : "d-none d-lg-inline"
                // }
              >
                Log in
              </span>
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavComponent;
