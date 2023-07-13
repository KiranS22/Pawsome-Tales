import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../../../Resources/CSS/user-auth.css";
import { RegisterUserCall } from "../../../utils/utills";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    address: "",
    city: "",
    postcode: "",
    tel: "",
  });
  const [value, setValue] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.verifyPassword) {
      alert("Passwords Must Match");
    } else {
      const response = await RegisterUserCall(user, value);
      console.log("Response from Registeration Submit form ", response);

      const status = response.data.state;
      if (status === "Success") {
        navigate("/login");
      } else if (status === "Invalid") {
        console.log("Invalid");
      }
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-8 col-lg-6 col-xl-4">
        <div className="form-header container d-flex justify-content-between  mt-4">
          <h1 className="font-weight-bold">REGISTER</h1>
          <i className="fa-solid fa-paw font-weight-bold mt-2"></i>
        </div>
        <form
          className="border rounded p-4"
          onSubmit={(e) => handleSubmit(e)}
          method="POST"
        >
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="firstName">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              className="form-control form-control-lg"
              placeholder="Enter your First Name"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              name="firstName"
              required
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="lastName">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              className="form-control form-control-lg"
              placeholder="Enter your Last Name"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              name="lastName"
              required
            />
          </div>
          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="lname">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="form-control form-control-lg"
              placeholder="Enter a valid email address"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              name="email"
              required
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
              required
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="verify-password">
              Re-Enter Password
            </label>
            <input
              type="password"
              id="verify-password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              minLength="6"
              value={user.verifyPassword}
              onChange={(e) =>
                setUser({ ...user, verifyPassword: e.target.value })
              }
              name="verify-password"
              required
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="tel">
              Mobile Number
            </label>
            <PhoneInput
              placeholder="Enter phone number"
              value={user.tel}
              onChange={setValue}
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="country">
              Address
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="form-control form-control-lg"
              placeholder="Address"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              required
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-control form-control-lg"
              placeholder="city"
              value={user.city}
              onChange={(e) => setUser({ ...user, city: e.target.value })}
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="postcode">
              Postcode
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              className="form-control form-control-lg"
              placeholder="postcode"
              value={user.postcode}
              onChange={(e) => setUser({ ...user, postcode: e.target.value })}
              required
            />
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-outline-dark btn-lg">
              Register
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-0">
              Already have an account?{" "}
              <Link to="/login" className="link-danger">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
