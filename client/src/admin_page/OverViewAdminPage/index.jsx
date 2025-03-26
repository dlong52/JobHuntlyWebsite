import React from "react";
import { Box, Typography } from "@mui/material";
import CommonIcon from "../../ui/CommonIcon";
import CategoryChart from "./components/CategoryChart";
import RevenueByPackageChart from "../RevenueManagementPage/components/RevenueByPackageChart";
const OverViewAdminPage = () => {
  return (
    <>
      <Box className="flex gap-5">
        <Box className="bg-primary rounded-md p-4 flex-1 flex justify-between items-center">
          <Box className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Việc làm trong ngày
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              100
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </Box>
          <CommonIcon.PaidTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
        <Box className="bg-accent-blue rounded-md p-4 flex-1 flex justify-between items-center">
          <Box className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Người dùng mới
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              100
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </Box>
          <CommonIcon.GroupsTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
        <Box className="bg-accent-red rounded-md p-4 flex-1 flex justify-between items-center">
          <Box className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Doanh nghiệp mới
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              100
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </Box>
          <CommonIcon.BusinessTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
      </Box>
      <Box className="grid grid-cols-12 gap-5 mt-5">
        <Box className="col-span-8">
          <CategoryChart />
        </Box>
        <Box className="col-span-4 p-5 bg-white rounded-md shadow">
          <Box className="">
            <RevenueByPackageChart/>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OverViewAdminPage;
