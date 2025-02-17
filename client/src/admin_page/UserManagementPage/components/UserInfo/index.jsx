import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { CommonIcon, CommonStyles } from "../../../../ui";
import { useGetUser } from "../../../../hooks/modules/user/userGetUser";
import useConvertData from "../../../../hooks/useConvertData";
import helpers from "../../../../utils/helpers";
import TooltipMui from "../../../../ui/TooltipMui";
import { ROLE } from "../../../../constants/enum";
import { Link } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";
import Address from "../../../../components/Address";

const UserInfo = ({ userId, onClose }) => {
  const { data, isLoading } = useGetUser(userId, { enabled: !!userId });
  const { dataConvert } = useConvertData(data);

  return (
    <>
      {!isLoading ? (
        <Box className="min-w-[400px] min-h-full flex flex-col gap-5 text-neutrals-100">
          <Box className="flex justify-between items-center px-4 py-2 border-b w-full">
            <Typography fontWeight={500} fontSize={"18px"}>
              Thông tin tài khoản
            </Typography>
            <IconButton>
              <CommonIcon.ClearRounded className="" />
            </IconButton>
          </Box>
          <Box className="w-full">
            <Box className="flex justify-center">
              <CommonStyles.CommonAvatar
                className={"!size-24 !bg-accent-blue"}
                src={dataConvert?.profile?.avatar_url}
                char={
                  !dataConvert?.profile?.avatar_url &&
                  dataConvert?.profile?.name.charAt(0)
                }
                variant={"rounded"}
              />
            </Box>
            <Box className="w-full flex justify-between mt-10 px-4">
              <Box className="flex items-center gap-1">
                <Typography fontSize={"18px"} fontWeight={"500px"}>
                  {dataConvert?.profile?.name} (
                  <span>{helpers.convertRole(dataConvert?.role?.name)}</span>)
                </Typography>
                <TooltipMui
                  content={`${
                    dataConvert?.is_verified ? "Đã xác thực" : "Chưa xác thực"
                  }`}
                >
                  <CommonIcon.CheckCircle
                    fontSize="small"
                    className={`${
                      dataConvert?.is_verified
                        ? "!text-green-600"
                        : "!text-gray-600"
                    }`}
                  />
                </TooltipMui>
              </Box>
            </Box>
            <Box className="p-4 border-y flex flex-col gap-4 mt-10">
              <Typography fontWeight={500}>Thông tin liên lạc</Typography>
              <Box className="flex flex-col gap-4">
                <Box className="flex gap-2">
                  <CommonIcon.MailOutlineRounded fontSize="small" />
                  <Box className="flex flex-col">
                    <Typography fontSize={"14px"} fontWeight={500}>
                      Địa chỉ email
                    </Typography>
                    <Typography fontSize={"12px"} className="text-accent-blue">
                      {dataConvert?.email}
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex gap-2">
                  <CommonIcon.PhoneOutlined fontSize="small" />
                  <Box className="flex flex-col">
                    <Typography fontSize={"14px"} fontWeight={500}>
                      Số điện thoại
                    </Typography>
                    <Typography fontSize={"12px"} className="text-accent-blue">
                      {dataConvert?.profile?.phone_number
                        ? dataConvert?.profile?.phone_number
                        : "Chưa cập nhật"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            {dataConvert?.role?.name === ROLE.EMPLOYER && (
              <Box className="p-4 border-b flex flex-col gap-4">
                <Typography fontWeight={500}>Thông tin công ty</Typography>
                <Box className="flex items-start gap-5">
                  <img
                    src={dataConvert?.company?.logo}
                    className="size-20"
                    alt=""
                  />
                  <Box className="flex flex-col">
                    <Link
                      to={`${RouteBase.Company}/${dataConvert?.company?._id}`}
                      className="font-semibold hover:underline"
                    >
                      {dataConvert?.company?.name}
                    </Link>
                    <Typography className="flex gap-1 items-center text-gray-600 !text-sm">
                      Trụ sở chính:{" "}
                      <Address
                        className={"text-gray-600 !text-sm"}
                        address={dataConvert?.company?.address}
                      />
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserInfo;
