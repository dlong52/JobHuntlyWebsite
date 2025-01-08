import { Box, Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { logo } from "@/assets/images";

const NotFoundPage = () => {
  return (
    <Box className="w-full min-h-screen flex justify-center items-center font-Epilogue">
      <Box className="flex items-center gap-8">
        <Box className="flex items-center gap-x-2 h-[75px]">
          <img src={logo} alt="Logo" className="h-[50px]" />
          <span className="font-MonumentExtended text-3xl font-semibold text-neutrals-100">
            JobHuntly
          </span>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box className="flex flex-col gap-6">
          <span className="text-5xl font-semibold">404 ! Oops</span>
          <span className="text-2xl font-medium">
            Rất tiếc trang này không tồn tại
          </span>
          <Link className="text-primary font-medium underline" to={"/"}>
            Quay lại trang chủ
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
