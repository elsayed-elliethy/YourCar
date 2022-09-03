import React from "react";
import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store";
const Nav = () => {
  const login = useSelector((state) => {
    return state.auth.isloggedIn;
  });

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink to={"/"} className="navbar-brand">
            Your Car
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li> */}
              <li className="nav-item">
                <NavLink to={"/carsForSale"} className="nav-link">
                  Cars for Sale
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/carsForRent"} className="nav-link">
                  Cars for Rent
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={login ? "/sellYourCar" : "/auth?type=login"}
                  className="nav-link"
                >
                  Sell Your Car
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link">
                  Contact Us
                </NavLink>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Menu
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Saved Cars
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign In /
                    </a>
                    <a className="dropdown-item" href="#">
                      Sign Up
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
          <div className=" dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Menu
            </a>
            <ul
              className={`dropdown-menu ${styles["dropdown-menu-right"]}`}
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <NavLink to={"/"} className="dropdown-item">
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to={"/"} className="dropdown-item">
                  Saved Cars
                </NavLink>
              </li>
              <li>
                {login ? (
                  <NavLink
                    to={"/"}
                    className="dropdown-item"
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavLink>
                ) : (
                  <NavLink to="/auth?type=login" className="dropdown-item">
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
