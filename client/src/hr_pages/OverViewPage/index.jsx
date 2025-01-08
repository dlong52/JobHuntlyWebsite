import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import { CommonIcon } from "../../ui";
import EmploymentGrowthChart from "./Chart";

const OverViewPage = () => {
  const jobGrowthData = [
    { date: "10-01", jobs: 120 },
    { date: "10-02", jobs: 130 },
    { date: "10-03", jobs: 125 },
    { date: "10-04", jobs: 140 },
    { date: "10-05", jobs: 145 },
    { date: "10-06", jobs: 150 },
    { date: "10-07", jobs: 160 },
    { date: "10-08", jobs: 170 },
    { date: "10-09", jobs: 175 },
    { date: "10-10", jobs: 180 },
  ];
  return (
    <Box className="flex flex-col gap-y-5">
      <div className="flex gap-5">
        <Box className="bg-primary rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              CV Tiếp nhận
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              100
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.PaidTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
        <Box className="bg-accent-blue rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              CV Tiếp nhận
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              100
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.AccountCircleTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
        <Box className="bg-accent-red rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              CV Tiếp nhận
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              100
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.LocalMallTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
      </div>
      <Grid2 container spacing={3}>
        <Grid2 size={8} className="bg-white rounded-md p-5">
          <EmploymentGrowthChart data={jobGrowthData} />
        </Grid2>
        <Grid2 size={4} className="bg-white rounded-md p-5"></Grid2>
      </Grid2>
    </Box>
  );
};

export default OverViewPage;
