import React, { useState } from "react";
import "./../../Resources/CSS/edit-profile.css";
import "./../../Resources/CSS/user-auth.css";
import noProfile from "./../../Resources/Images/no-profile.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/features/Slices/Auth/Auth";

const EditProfile = () => {
  const userInfo = useSelector(selectUser)
  const [user, setUser] = useState({
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    email: userInfo.email,
    tel: userInfo.phone_number,
    address: userInfo.address,
    city: userInfo.city,
    postcode: userInfo.postcode,
    username: userInfo.username
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/auth/update-profile`,
      user,

    );
  }

  return (
    <section className="profile">
      <div className="container py-5">
        <div className="form-header container d-flex justify-content-between  mt-4">
          <h1 className="font-weight-bold">EDIT PROFILE</h1>
          <i className="fa-solid fa-paw font-weight-bold mt-2"></i>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={noProfile}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h5 className="my-3">John Smith</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
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
                      name="lastName"
                      required
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="email">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                      value={user.email}
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
                      name="password"
                      required
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="form-control form-control-lg"
                      placeholder="Address"
                      value={user.address}
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
                      placeholder="City"
                      value={user.city}
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
                      placeholder="Postcode"
                      value={user.postcode}
                      required
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={user.username}
                      required
                    />
                  </div>


                  <button type="submit" className="btn btn-outline-dark mt-3">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
