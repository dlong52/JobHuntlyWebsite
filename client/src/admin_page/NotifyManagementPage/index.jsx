import React from "react";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Typography } from "@mui/material";
import BreadcrumbMui from "../../ui/BreadcrumbMui";

const NotifyManagementPage = () => {
  const breadcrumbs = [
    <Link
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100 !text-sm">
      Thông báo
    </Typography>,
  ];
  return (
    <div>
      <BreadcrumbMui title={"Thông báo"} breadcrumbs={breadcrumbs} />
    </div>
  );
};

export default NotifyManagementPage;
