import React from "react";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { Navigate, Outlet } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const { isLogged } = useSelector((state) => state.user);

  if (isLogged) {
    return <Outlet {...props} />;
  }

  return <Navigate to={RouteBase.SignIn} />;
};

export default PrivateRoute;
