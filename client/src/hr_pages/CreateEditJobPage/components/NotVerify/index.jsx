import { Typography } from "@mui/material";
import React from "react";
import CustomCircularProgress from "../../../../components/CustomCircularProgress";
import VerifyItem from "./VerifyItem";
import { RouteBase } from "../../../../constants/routeUrl";

const NotVerify = ({ user }) => {
  return (
    <div className="text-neutrals-100">
      <div className="p-4 bg-white rounded-md">
        <div className="flex items-center gap-5">
          <CustomCircularProgress
            value={
              user?.is_verified ? 66 : user?.is_verified_phone ? 100 : 33
            }
          />
          <div className="flex flex-col gap-">
            <Typography fontSize={"18px"} fontWeight={600}>
              Xin chào, <span className="text-primary">{user?.username}</span>
            </Typography>
            <Typography fontSize={"14px"} className="text-neutrals-80">
              {user?.is_verified
                ? "Hiện tại bạn đã có thể đăng những tin tuyển dụng cho doanh nghiệp của mình"
                : "Vui lòng thực hiện các bước xác thực dưới đây để bắt đầu đăng tin và nhận hồ sơ ứng tuyển cho tin tuyển dụng của bạn."}
            </Typography>
          </div>
          <div className=""></div>
        </div>
        <div className="flex items-center gap-5 mt-5">
          <VerifyItem
            is_verified={true}
            text={"Cập nhật thông tin công ty"}
            path={`${RouteBase.HRProfile}?type=1`}
          />
          <VerifyItem
            is_verified={user?.is_verified}
            disable={user?.is_verified}
            text={"Xác thực Email"}
            path={RouteBase.HRVerify}
          />
          <VerifyItem
            is_verified={user?.is_verified_phone}
            text={"Xác thực số điện thoại"}
            path={RouteBase.HRVerifyPhone}
          />
        </div>
      </div>
    </div>
  );
};

export default NotVerify;
