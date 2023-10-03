import React, { useEffect } from "react";
import ApplicationRoutes from "./Routing/Routing";
import "./../../Resources/CSS/globals.css";
import { selectIsLoggedIn } from "../../Redux/features/Slices/Auth/Auth";
import { useSelector } from "react-redux";

const App = () => {

  return (
    <>
      <ApplicationRoutes />
    </>
  );
};

export default App;
