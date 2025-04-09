import { Box, Typography } from "@mui/material";
import React from "react";
import { Button, CommonIcon } from "../../../../ui";
import { payment_success } from "../../../../assets/images";
import { useNavigate } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <Box className="grid grid-cols-12 bg-white p-8 rounded gap-5">
      <Box className="col-span-6 flex items-center justify-center">
        <img src={payment_success} alt="" className="w-11/12" />
      </Box>
      <Box className="col-span-6 flex flex-col justify-center gap-5">
        <Box>
          <Typography
            className="text-primary flex items-center gap-2"
            fontSize={"30px"}
            fontWeight={600}
          >
            <CommonIcon.CheckCircle fontSize="30px" /> Thanh toán thành công
          </Typography>
          <Typography fontSize={"16px"} className="text-neutrals-80">
            Cảm ơn bạn đã lựa chọn dịch vụ của Jobhuntly
          </Typography>
        </Box>
        <Box className="flex gap-4">
          <Button
            sx={{ textTransform: "none" }}
            className={"!bg-primary !text-white !px-5"}
            onClick={() => navigate(RouteBase.HROverview)}
          >
            Trang chủ
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            // variant={"outline"}
            className={"!border-2 !border-primary !text-primary"}
            onClick={() => navigate(RouteBase.HRMyPackage)}
          >
            Xem dịch vụ
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentSuccess;
