import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../../Navigation/NavBar";
import Login from "../../User_Auth/Login/Login";
import Register from "../../User_Auth/Register/Register";
import Feed from "../../Feed/Feed";



const Routing = () => {
  return (
    <>
      <Router>
        <NavBar />


        <Routes>
          <Route path="/" exact element={<Feed/>} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />

          {/* <Route path="/*" element={<NotFound />} /> */}
        </Routes>

      </Router>
    </>
  );
};

export default Routing;
