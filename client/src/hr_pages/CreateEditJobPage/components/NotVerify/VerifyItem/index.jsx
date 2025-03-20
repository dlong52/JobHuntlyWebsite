import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { CommonIcon } from "../../../../../ui";

const VerifyItem = ({ text, is_verified, path, disable }) => {
  return (
    <Link
      to={disable ? "" : path}
      className={`${disable ? "opacity-70 cursor-default" : "group hover:text-primary hover:border-primary"} px-5 flex-1 py-6 rounded-lg border relative flex gap-2 items-center`}
    >
      <Box
        className={`flex justify-center items-center rounded-full size-[23px] ${
          is_verified ? "bg-primary text-white" : "border"
        }`}
      >
        {is_verified && <CommonIcon.CheckRounded className="!text-[16px]" />}
      </Box>
      <Typography fontSize={"14px"} className="text-primary-dark">
        {text}
      </Typography>
      <Box className="flex justify-center items-center rounded-full size-6 bg-slate-100 text-primary absolute bottom-2 right-2 group-hover:text-white group-hover:bg-primary transition-all duration-300">
        <CommonIcon.ArrowOutwardRounded className="!text-[16px]" />
      </Box>
    </Link>
  );
};

export default VerifyItem;
