import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { CommonIcon } from "../../../ui";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../../constants/routeUrl";
import { PACKAGE_CODE } from "../../../constants/enum";
import { useNotifications } from "../../../utils/notifications";
import { useSelector } from "react-redux";

const PackageItem = ({ id, title, price, features, code, subscriptions }) => {
  const { is_verified } = useSelector((state) => state?.user)
  const navigate = useNavigate();
  const { showInfo } = useNotifications();
  const checkAlreadyPackage = subscriptions?.some(
    (item) => item.package_id._id === id
  );
  return (
    <div className="flex flex-col gap-2 rounded-md transition-all min-h-[400px] duration-500 bg-white overflow-hidden">
      <Link
        to={`${RouteBase.HRPackage}/${id}`}
        className={`bg-gradient-to-tr ${code === PACKAGE_CODE.ECO
          ? "bg-accent-green"
          : code === PACKAGE_CODE.PRO
            ? "bg-accent-yellow"
            : code === PACKAGE_CODE.MAX
              ? "bg-blue-800"
              : "from-primary-dark via-primary to-primary-light"
          } pt-[6px]`}
      >
        <Box className="bg-neutrals-100 relative shadow-inner text-white flex items-center justify-center py-3 rounded-t-lg">
          <Typography
            textTransform={"uppercase"}
            fontSize={"17px"}
            fontWeight={500}
            className={`${title === "Huntly Max Plus"
              ? "!font-bold uppercase text-transparent bg-clip-text bg-gradient-to-tr from-primary-light via-accent-blue to-primary"
              : ""
              }`}
          >
            {title}
          </Typography>
          {code === PACKAGE_CODE.MAX_PLUS && (
            <div className="absolute right-0 from-primary-dark bg-gradient-to-tr via-primary to-primary-light text-[10px] py-[3px] px-3 rounded-l-sm font-medium">
              VIP
            </div>
          )}
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
          {price?.toLocaleString("vi-VN")}
          <span className="text-sm ml-1 font-extrabold">VNĐ</span>
        </Typography>
        <Button
          onClick={() => {
            if (checkAlreadyPackage) {
              showInfo(
                "Bạn đang sử dụng gói dịch vụ này vui lòng chọn gói khác!"
              );
              return;
            }
            if (!is_verified) {
              showInfo(
                "Bạn cần xác thực tài khoản để sử dụng dịch vụ của JobHuntly!"
              );
              return;
            }
            navigate(`${RouteBase.HRCheckout}?package=${id}`);
          }}
          variant="outlined"
          className="!text-primary !border-primary"
          size="large"
        >
          Mua ngay
        </Button>
        <Box className="flex flex-col gap-y-4">
          {features?.map((item, index) => {
            return (
              <Box key={index} className="flex items-start gap-3">
                <CommonIcon.CheckRounded
                  fontSize="small"
                  className="rounded-full bg-primary-light p-[2px] mt-[2px] text-primary"
                />
                <Typography fontSize={"14px"} color="var(--neutrals-80)" className="!line-clamp-1">
                  {item}
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
