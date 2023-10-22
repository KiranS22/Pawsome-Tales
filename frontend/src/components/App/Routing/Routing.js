import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../../Navigation/NavBar";
import Login from "../../User_Auth/Login/Login";
import Register from "../../User_Auth/Register/Register";
import Feed from "../../Feed/Feed";
import EditProfile from "../../Profile/EditProfile";
import ViewProfile from "../../Profile/ViewProfile/ViewProfile";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFoundPage from "../../PageNotFound/NotFoundPage";

const Routing = () => {
  return (
    <>
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<ViewProfile />} />{" "}
            {/*Going to change this to use dynamic data user id */}
            <Route path="/profile/edit" element={<EditProfile />} />{" "}
            {/*Going to change this to use dynamic data user id */}
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default Routing;
