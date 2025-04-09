import React, { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { ROLE } from "../constants/enum";
import { NotFoundPage } from "../pages";
import { useGetActivePackage } from "../hooks/modules/subscription/useGetActivePackage";
import { useConvertData } from "../hooks";
import ServicesRequire from "../components/ServiceRequire";

const ComponentWrapper = ({
  children,
  permissionAllow = [],
  packages = [],
}) => {
  const { role, user_id } = useSelector((state) => state.user);
  const { data, isLoading } = useGetActivePackage(user_id, role);
  const { dataConvert: activePackage } = useConvertData(data);
  const hasMatch = activePackage?.some((pkg) =>
    packages?.includes(pkg.package_code)
  );

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
  if (packages?.length > 0 && !hasMatch && !isLoading) {
    setTimeout(() => {
      return <ServicesRequire />;
    }
    , 3000);
  }
  return <Fragment>{children}</Fragment>;
};

ComponentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  permissionAllow: PropTypes.arrayOf(PropTypes.string),
};

const withPermission = (Component, permissionAllow = [], packages = []) => {
  const WrappedComponent = (props) => {
    return (
      <ComponentWrapper permissionAllow={permissionAllow} packages={packages}>
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
