import React from "react";
import { bgEmptyService } from "../../assets/images";
import { Box, Typography } from "@mui/material";
import { Button } from "../../ui";
import {useNavigate} from "react-router-dom"
import {RouteBase} from "../../constants/routeUrl"

const MyPackagePage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center">
      <Box className="flex flex-col items-center gap-1">
        <img src={bgEmptyService} alt="" className="max-w-60" />
        <Typography>Bạn chưa có dịch vụ nào trong tài khoản</Typography>
        <Button onClick={navigate(RouteBase.HRPackage)} className="!bg-primary !text-white !capitalize">Thêm dịch vụ</Button>
      </Box>
    </div>
  );
};

export default MyPackagePage;
