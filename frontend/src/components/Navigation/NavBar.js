import React from "react";
import { Link } from "react-router-dom";
import logowhite from "./../../Resources/Images/png/logo-white.png";
import "../../Resources/CSS/navigation.css";

const Navbar = () => {
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
        >
          {/* Add Toggler Content Here */}
        </button>
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
          <Link className="nav-link" to="/user">
            <i className="far fa-user"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
