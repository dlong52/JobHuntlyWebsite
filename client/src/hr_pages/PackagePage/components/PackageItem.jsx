import { Box, Button, Typography } from "@mui/material";
import React from "react";
import helpers from "../../../utils/helpers";
import { CommonIcon } from "../../../ui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../../constants/routeUrl";

const PackageItem = ({ title, price, description }) => {
  return (
    <div className="flex flex-col gap-2 rounded-md transition-all duration-500 bg-white overflow-hidden">
      <Link to={`${RouteBase.HRPackage}/1`} className="bg-gradient-to-tr from-primary-dark via-primary to-primary-light pt-[6px]">
        <Box className="bg-neutrals-100 shadow-inner text-white flex items-center justify-center py-3 rounded-t-lg">
          <Typography
            textTransform={"uppercase"}
            fontSize={"17px"}
            fontWeight={500}
            className={`${
              title === "Huntly Max Plus"
                ? "!font-bold uppercase text-transparent bg-clip-text bg-gradient-to-tr from-primary-light via-accent-blue to-primary"
                : ""
            }`}
          >
            {title}
          </Typography>
        </Box>
      </Link>
      <Box className="p-4 w-full flex flex-col gap-5">
        <Typography
          className=""
          color="var(--primary)"
          variant="h5"
          fontSize={"30px"}
          fontWeight={600}
        >
          {helpers.numberFormat(price)}
          <span className="text-sm ml-1 font-extrabold">VNĐ</span>
        </Typography>
        <Button
          variant="outlined"
          className="!text-primary !border-primary"
          size="large"
        >
          Mua ngay
        </Button>
        <Box className="flex flex-col gap-y-4">
          {description.map((item, index) => {
            return (
              <Box className="flex items-start gap-3">
                <CommonIcon.CheckRounded
                  fontSize="small"
                  className="rounded-full bg-primary-light p-[3px] text-primary"
                />
                <Typography fontSize={"15px"} color="var(--neutrals-80)">
                  Hiển thị trong Box Việc làm tốt nhất
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </div>
  );
};

export default PackageItem;
