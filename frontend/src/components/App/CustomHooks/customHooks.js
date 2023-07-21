import React, { useState, useEffect } from "react";

import { fetchUser } from "../../../utils/utills";
import { logInUser } from "../../../Redux/features/Slices/Auth/Auth";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(null);
  const handleUser = async () => {
    const response = await fetchUser();
    if (response.status && response.status === 200) {
      const { user } = response.data.data;
      dispatch(logInUser(user));
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    handleUser(); //Fetch User from DB
  }, []);

  return isAuth;
};
