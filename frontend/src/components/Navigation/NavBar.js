import React from "react";
import { Link } from "react-router-dom";
import logowhite from "./../../Resources/Images/png/logo-white.png";
import "../../Resources/CSS/navigation.css";
import { selectIsLoggedIn } from "../../Redux/features/Slices/Auth/Auth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-bg shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logowhite} className="logo-img" alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        <div
          className="collapse navbar-collapse d-flex justify-content-evenly"
          id="navbarSupportedContent"
        >
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <Link className="nav-link" to="/profile">
            <i className="far fa-user"></i>
          </Link>
          {loggedIn ? (
            // Rendered when loggedIn is true
            <button className="nav-link btn btn-outline-dark">Logout</button>
          ) : (
            <button className="nav-link btn btn-outline-dark">Login</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
