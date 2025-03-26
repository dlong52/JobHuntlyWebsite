import React, { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { ROLE } from "../constants/enum";
import { NotFoundPage } from "../pages";

const ComponentWrapper = ({ children, permissionAllow = [] }) => {
  const { role } = useSelector((state) => state.user);
  const hasPermission = useMemo(() => {
    return permissionAllow.includes(ROLE.ALL) || permissionAllow.includes(role);
  }, [permissionAllow, role]);

  if (!hasPermission && !!role) {
    return (
      <div className="fixed inset-0 bg-white z-[9999999999999999]">
        <NotFoundPage />
      </div>
    );
  }

  return <Fragment>{children}</Fragment>;
};

ComponentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  permissionAllow: PropTypes.arrayOf(PropTypes.string),
};

const withPermission = (Component, permissionAllow = []) => {
  const WrappedComponent = (props) => {
    return (
      <ComponentWrapper permissionAllow={permissionAllow}>
        <Component {...props} />
      </ComponentWrapper>
    );
  };

  WrappedComponent.propTypes = {
    permissionAllow: PropTypes.arrayOf(PropTypes.string),
  };

  return WrappedComponent;
};

export default withPermission;
