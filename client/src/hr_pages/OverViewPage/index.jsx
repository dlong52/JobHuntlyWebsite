import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import React from "react";
import { Button, CommonAvatar, CommonIcon } from "../../ui";
import EmploymentGrowthChart from "./Chart";
import { useGetOverviewHr } from "../../hooks/modules/overview/useGetOverviewHr";
import { useSelector } from "react-redux";
import { useConvertData } from "../../hooks";
import { BorderLinearProgress } from "../ProfileHrPage/components/Account";
import BarChartSkeleton from "../../ui/BarChartSkeleton";

const OverViewPage = () => {
  const user = useSelector((state) => state.user);
  const { data, isLoading } = useGetOverviewHr(user?.company_id, {
    enabled: !!user?.company_id,
  });
  const { dataConvert } = useConvertData(data);
  return (
    <Box className="flex flex-col gap-y-5">
      <div className="flex gap-5">
        <Box className="bg-primary rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              CV tiếp nhận
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              {dataConvert?.accepted_count || 0}
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.PaidTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
        <Box className="bg-accent-blue rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              CV ứng tuyển mới
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              {dataConvert?.recent_applications_count || 0}
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.AccountCircleTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
        <Box className="bg-accent-red rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Tin tuyển dụng hiển thị
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              {dataConvert?.job_viewing_count || 0}
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.LocalMallTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
      </div>
      <Grid2 container spacing={3}>
        <Grid2 size={8} className="bg-white rounded-md p-5">
          {isLoading ? (
            <BarChartSkeleton />
          ) : (
            <EmploymentGrowthChart data={dataConvert?.applications_per_day} />
          )}
        </Grid2>
        <Grid2 size={4} className="bg-white rounded-md overflow-hidden">
          {/* <Box className="w-full bg-gradient-to-br from-blue-50  to-white p-4 flex items-center">
            <CommonAvatar sx={{ width: 60, height: 60 }} className="mr-4" />

            <Box className="p-0 flex-1 text-neutrals-100">
              <Typography variant="h6" className="font-semibold">
               {user?.username}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Mã NTD:{" "}
                <span className="text-gray-800 font-medium">689552</span>
              </Typography>
              <Box className="flex items-center gap-3 mt-1">
                <Box className="flex items-center text-gray-700">
                  <CommonIcon.Mail
                    fontSize="small"
                    className="mr-1 text-gray-500"
                  />
                  <Typography variant="body2">{user?.email}</Typography>
                </Box>
                <Box className="flex items-center text-gray-700">
                  <CommonIcon.Phone
                    fontSize="small"
                    className="mr-1 text-gray-500"
                  />
                  <Typography variant="body2">{user?.phone_number}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="p-5">
            <BorderLinearProgress variant="determinate" value={33.33} />
            <Box className="flex flex-col gap-6 mt-8">
              <Box className="flex justify-between">
                <Box className="flex items-center gap-4">
                  <Box className="size-6 rounded-full border flex items-center justify-center" />
                  <Typography fontSize={"15px"} fontWeight={500}>
                    Xác thực Email
                  </Typography>
                </Box>
                <Box className="text-accent-green aspect-square size-8 flex items-center justify-center bg-neutrals-0 !rounded-full">
                  <CommonIcon.EastRounded fontSize="small" />
                </Box>
              </Box>
              <Box className="flex justify-between">
                <Box className="flex items-center gap-4">
                  <Box className="size-6 rounded-full border flex items-center justify-center" />
                  <Typography fontSize={"15px"} fontWeight={500}>
                    Xác thực số điện thoại
                  </Typography>
                </Box>
                <Box className="text-accent-green aspect-square size-8 flex items-center justify-center bg-neutrals-0 !rounded-full">
                  <CommonIcon.EastRounded fontSize="small" />
                </Box>
              </Box>
              <Box className="flex justify-between">
                <Box className="flex items-center gap-4">
                  <Box className="size-6 rounded-full border flex items-center justify-center bg-accent-green text-white">
                    <CommonIcon.CheckRounded fontSize="small" />
                  </Box>
                  <Typography fontSize={"15px"} fontWeight={500}>
                    Cập nhật thông tin công ty
                  </Typography>
                </Box>
                <Box className="text-accent-green aspect-square size-8 flex items-center justify-center bg-neutrals-0 !rounded-full">
                  <CommonIcon.EastRounded fontSize="small" />
                </Box>
              </Box>
            </Box>
          </Box> */}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default OverViewPage;
