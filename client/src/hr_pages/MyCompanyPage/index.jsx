import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import BreadcrumbMui from "../../ui/BreadcrumbMui";

const MyCompanyPage = () => {
  const breadcrumbs = [
    <Link
      key={1}
      to={RouteBase.HROverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography key={2} fontWeight={500} className="text-neutrals-100 !text-sm">
      Thông tin công ty
    </Typography>,
  ];
  return (
    <Box className="flex flex-col gap-y-5">
      <BreadcrumbMui breadcrumbs={breadcrumbs} title={"Thông tin công ty"} />
    </Box>
  );
};

export default MyCompanyPage;
