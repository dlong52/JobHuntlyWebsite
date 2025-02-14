import React from "react";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Typography } from "@mui/material";

const RevenueManagementPage = () => {
  const breadcrumbs = [
    <Link
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100 !text-sm">
      Doanh thu
    </Typography>,
  ];
  return (
    <div>
      <BreadcrumbMui title={"Doanh thu"} breadcrumbs={breadcrumbs} />
    </div>
  );
};

export default RevenueManagementPage;
