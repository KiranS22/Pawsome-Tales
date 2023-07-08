import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    address: "",
    city: "",
    postcode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <section>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit} method="POST">
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
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUser({ ...user, postcode: e.target.value })
                  }
                  required
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn  btn-outline-dark btn-lg">
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="link-danger">
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
