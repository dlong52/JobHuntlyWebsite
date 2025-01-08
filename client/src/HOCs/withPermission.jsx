import React, { Fragment } from "react";
import { roles } from "../constants";
import { useAuthentication } from "../providers/AuthenticationProvider";

const ComponentWrapper = ({ children, permissionAllow = [] }) => {
  const { isLogged, userInfo } = useAuthentication();
  // const role = userInfo?.userRoleDetail?.key || '';

  if (
    !isLogged &&
    (permissionAllow.includes(roles.ADMIN) ||
      permissionAllow.includes(roles.EMPLOYER))
  ) {
    return (
      <div className="">
        <h1>Bạn cần đăng nhập để truy cập vào mục này</h1>
      </div>
    );
  }

  if (permissionAllow.includes(roles.ALL)) {
    return <Fragment>{children}</Fragment>;
  }

  return <div className="">You re not allow access to this</div>;
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
