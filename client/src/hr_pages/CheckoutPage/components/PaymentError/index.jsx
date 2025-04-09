import { Box, Typography } from "@mui/material";
import React from "react";
import { error } from "../../../../assets/images";
import { Button, CommonIcon } from "../../../../ui";
import { useNavigate } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";

const PaymentError = () => {
  const navigate = useNavigate();
  return (
    <Box className="grid grid-cols-12 bg-white p-8 rounded">
      <Box className="col-span-6 flex items-center justify-end">
        <img src={error} alt="" />
      </Box>
      <Box className="col-span-6 flex flex-col justify-center gap-5">
        <Box>
          <Typography
            className="text-primary flex items-center gap-2"
            fontSize={"30px"}
            fontWeight={600}
          >
            <CommonIcon.Error fontSize="30px" /> Thanh toán thất bại!
          </Typography>
          <Typography fontSize={"16px"} className="text-neutrals-80">
            Không thể xử lí đơn hàng. Vui lòng quay trở lại và thử lại!
          </Typography>
        </Box>
        <Box className="flex gap-4">
          <Button
            sx={{ textTransform: "none" }}
            endIcon={<CommonIcon.East />}
            className={"!bg-primary !text-white !px-5"}
            onClick={() => navigate(RouteBase.HROverview)}
          >
            Trang chủ
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            // variant={"outline"}
            className={"!border-2 !border-primary !text-primary"}
            onClick={() => navigate(RouteBase.HRPackage)}
          >
            Tìm dịch vụ
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentError;
