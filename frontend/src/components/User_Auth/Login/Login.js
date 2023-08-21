import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../../../Resources/CSS/user-auth.css";
import { logInUserCall } from "../../../utils/utills";
import { useDispatch, useSelector } from "react-redux";
import {
  logInUser,
  selectIsLoggedIn,
} from "./../../../Redux/features/Slices/Auth/Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector(selectIsLoggedIn);

  const userAlreadyLoggedIn = () => {
    if (loggedIn) {
      navigate("/feed");
    }
  };

  useEffect(() => {
    userAlreadyLoggedIn();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await logInUserCall(user);
      console.log("login comp response", response);

      const status = response.status;
      const person = response.data.data;

      console.log("In login comp", "Status:", status, "Person:", person);
      if (status == 200) {
        dispatch(logInUser(person));
        navigate("/feed");
      }
    } catch (err) {
      console.log({ status: "Error", message: err.message, stack: err.stack });
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-8 col-lg-6 col-xl-4">
        <div className="form-header container d-flex justify-content-between  mt-4">
          <h1 className="font-weight-bold">LOGIN</h1>
          <i className="fa-solid fa-paw font-weight-bold mt-2"></i>
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="mt-2 border rounded p-4"
        >
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
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
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
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
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
