import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../../../Resources/CSS/user-auth.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-8 col-lg-6 col-xl-4">
        <div className="form-header container d-flex justify-content-between  mt-4">
          <h1 className="font-weight-bold">LOGIN</h1>
          <i className="fa-solid fa-paw font-weight-bold mt-2"></i>
        </div>

        <form className="mt-2 border rounded p-4">
          <div className="divider d-flex align-items-center my-4"></div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control form-control-lg"
              placeholder="Enter a valid email address"
              value=""
              name="email"
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value=""
              name="password"
            />
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-outline-dark btn-lg">
              Login
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-0">
              Don't have an account?{" "}
              <Link to="/register" className="link-danger">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
