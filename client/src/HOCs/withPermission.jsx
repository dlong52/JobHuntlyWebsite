import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RouteBase } from "../constants/routeUrl";
import { ROLE } from "../constants/enum";

const ComponentWrapper = ({ children, permissionAllow = [] }) => {
  const { role } = useSelector((state) => state.user);

  if (permissionAllow.includes(ROLE.ALL) || permissionAllow.includes(role)) {
    return <Fragment>{children}</Fragment>;
  }
  // window.location.href = RouteBase.SignIn;
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
