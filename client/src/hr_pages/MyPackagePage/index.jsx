import React from "react";
import { bgEmptyService } from "../../assets/images";
import { Box, Typography } from "@mui/material";
import { Button } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import BreadcrumbMui from "../../ui/BreadcrumbMui";

const MyPackagePage = () => {
  const navigate = useNavigate();
  const breadcrumbs = [
    <Link
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100 !text-sm">
      Dịch vụ của tôi
    </Typography>,
  ];
  return (
    <Box className="">
      <BreadcrumbMui title={"Dịch vụ của tôi"} breadcrumbs={breadcrumbs} />
      <Box className="flex items-center justify-center">
        <Box className="flex flex-col items-center gap-1">
          <img src={bgEmptyService} alt="" className="max-w-60" />
          <Typography>Bạn chưa có dịch vụ nào trong tài khoản</Typography>
          <Button
            onClick={navigate(RouteBase.HRPackage)}
            className="!bg-primary !text-white !capitalize"
          >
            Thêm dịch vụ
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MyPackagePage;
