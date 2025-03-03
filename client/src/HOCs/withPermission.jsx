import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouteBase } from "../constants/routeUrl";
import { ROLE } from "../constants/enum";
import { useAuthentication } from "../providers/AuthenticationProvider";

const ComponentWrapper = ({ children, permissionAllow = [] }) => {
  const { isLogged } = useAuthentication();
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (permissionAllow.includes(ROLE.ALL) || permissionAllow.includes(role)) {
    return <Fragment>{children}</Fragment>;
  }
// console.log(!isLogged &&
//   (permissionAllow.includes(ROLE.EMPLOYER) ||
//     permissionAllow.includes(ROLE.ADMIN)));
// console.log(isLogged);

  // if (
  //   !isLogged &&
  //   (permissionAllow.includes(ROLE.EMPLOYER) ||
  //     permissionAllow.includes(ROLE.ADMIN))
  // ) {
  //   console.log("vlsjddk");

  //   window.location.href = RouteBase.SignIn;
  //   navigate(RouteBase.SignIn);
  //   return null;
  // }
  navigate(RouteBase.SignIn);
  return null;
};

const withPermission = (Component, permissionAllow = []) => {
  return function WrappedComponent(props) {
    return (
      <ComponentWrapper permissionAllow={permissionAllow}>
        <Component {...props} />
      </ComponentWrapper>
    );
  };
};

export default withPermission;
