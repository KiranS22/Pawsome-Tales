import React, { useState, useEffect } from "react";

import { fetchUser } from "../../../utils/utills";
import {
  logInUser,
  selectIsLoggedIn,
} from "../../../Redux/features/Slices/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  console.log("useAuth Hook Running");
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectIsLoggedIn);
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    console.log("useEffect in usaeAutrh running");
    const handleUser = async () => {
      const response = await fetchUser();
      if (response.status === "Error") {
        setIsAuth(false);
      } else {
        dispatch(logInUser(response.data));
        setIsAuth(true);
      }
    };
    if (loggedIn) {
      setIsAuth(true);
    } else {
      handleUser(); //Fetch User from DB
    }
  }, []);
  console.log("before isAutrh returns", isAuth);
  return isAuth;
};
