import { Box, Typography } from "@mui/material";
import React from "react";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";

const RecruitmentReportPage = () => {
  const breadcrumbs = [
    <Link
      key={1}
      to={RouteBase.HROverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography key={2} fontWeight={500} className="text-neutrals-100 !text-sm">
      Báo cáo tuyển dụng
    </Typography>,
  ];
  return (
    <Box className="flex flex-col gap-y-5">
      <BreadcrumbMui breadcrumbs={breadcrumbs} title={"Báo cáo tuyển dụng"} />
    </Box>
  );
};

export default RecruitmentReportPage;
