import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouteBase } from "../constants/routeUrl";
import { ROLE } from "../constants/enum";

const ComponentWrapper = ({ children, permissionAllow = [] }) => {
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate()

  if (permissionAllow.includes(ROLE.ALL) || permissionAllow.includes(role)) {
    return <Fragment>{children}</Fragment>;
  }

  navigate(RouteBase.SignIn);
};

const withPermission = (Component, permissionAllow = []) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <ComponentWrapper permissionAllow={permissionAllow}>
          <Component {...this.props} />
        </ComponentWrapper>
      );
    }
  };
};

export default withPermission;
