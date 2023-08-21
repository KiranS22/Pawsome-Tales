import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../../utils/utills";
import {
  logInUser,
  selectIsLoggedIn,
} from "../../../Redux/features/Slices/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  console.log("useAuth Hook Running");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector(selectIsLoggedIn);
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    console.log("useEffect in usaeAutrh running");
    const handleUser = async () => {
      const response = await fetchUser();
      console.log("isAuth fetch user response", response);
      if (response.status === "error") {
        setIsAuth(false);
      } else {
        const { user } = response.data.data;
        dispatch(logInUser(user));
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
