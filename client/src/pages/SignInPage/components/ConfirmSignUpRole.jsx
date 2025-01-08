import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Candidate, Employer } from "../../../assets/images";
import { RouteBase } from "../../../constants/routeUrl";

const ConfirmSignUpRole = () => {
  return (
    <Box>
      <Box className="flex flex-col gap-3 items-center py-5">
        <Typography sx={{fontWeight: "bold", fontSize: "25px"}}>Chào bạn,</Typography>
        <Typography sx={{fontSize: "16px", color: "#212f3f"}}>
          Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!{" "}
        </Typography>
      </Box>
      <Box className="py-5">
        <Box className="flex max-w-[830px] py-5">
          <Box className="flex-1 mr-4 flex flex-col items-center">
            <img className="w-full" src={Employer} alt="" />
            <Link to={RouteBase.SignUpHr} className="rounded-full px-8 py-3 bg-primary text-white">Tôi là nhà tuyển dụng</Link>
          </Box>
          <Box className="flex-1 mr-4 flex flex-col items-center">
            <img className="w-full" src={Candidate} alt="" />
            <Link to={RouteBase.SignUp} className="rounded-full px-8 py-3 bg-primary text-white">Tôi là nhà ứng viên tìm việc</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmSignUpRole;
