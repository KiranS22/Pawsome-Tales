import React, { useEffect } from "react";
import ApplicationRoutes from "./Routing/Routing";
import "./../../Resources/CSS/globals.css";
import { fetchUser } from "../../utils/utills";
import { useAuth } from "./CustomHooks/customHooks";
import { useDispatch, useSelector } from "react-redux";
import {
  logInUser,
  selectIsLoggedIn,
} from "../../Redux/features/Slices/Auth/Auth";

const App = () => {
  const isAuuth = useAuth();
  const loggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const keepUserLoggedIn = async () => {
    try {
      const response = await fetchUser();
      console.log("App useEffect response ", response);
      if (response.status === 200) {
        const { user } = response.data; // Access user data from response.data
        dispatch(logInUser({ user, token: response.data.token }));
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e.message, e.stack);
    }
  };
  // Call the function

  useEffect(() => {
    keepUserLoggedIn();
  }, [isAuuth, loggedIn]);

  return (
    <>
      <ApplicationRoutes />
    </>
  );
};

export default App;
