import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CommonIcon } from "../../ui";
import { RouteBase } from "../../constants/routeUrl";

const VerifyButton = ({ url = RouteBase.VerifyAccount }) => {
  const { is_verified, username } = useSelector((state) => state.user);
  return (
    <>
      {!is_verified && !!username && (
        <div className="fixed z-[999999] bottom-[26px] right-28">
          <Typography
            fontSize={"14px"}
            className="!bg-primary-dark !rounded-full py-2 px-4 !text-white !flex !items-center gap-1"
          >
            <span>Tiếp theo:</span>
            <Link className="flex items-center gap-2" to={url}>
              <span className="text-accent-green">Xác thực tài khoản</span>{" "}
              <Box className="bg-accent-green text-white p-1 rounded-full">
                <CommonIcon.ArrowForward className="!text-[20px]" />
              </Box>
            </Link>
          </Typography>
        </div>
      )}
    </>
  );
};

export default VerifyButton;
