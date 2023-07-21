import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../CustomHooks/customHooks";

//Custom Hook (React Component)

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  console.log("isAuth", isAuth);

  if (isAuth === null) {
    return null;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
