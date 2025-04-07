import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import React from "react";
import { Button, CommonAvatar, CommonIcon } from "../../ui";
import EmploymentGrowthChart from "./Chart";
import { useGetOverviewHr } from "../../hooks/modules/overview/useGetOverviewHr";
import { useSelector } from "react-redux";
import { useConvertData } from "../../hooks";
import { BorderLinearProgress } from "../ProfileHrPage/components/Account";
import BarChartSkeleton from "../../ui/BarChartSkeleton";
import BarChartEmpty from "../../components/BarChartEmpty";

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
            <>
              {!!dataConvert?.applications_per_day?.length ?
                <EmploymentGrowthChart data={dataConvert?.applications_per_day} />
                :
                <div className="h-[350px] w-full">
                  <BarChartEmpty />
                </div>}
            </>
          )}
        </Grid2>
        <Grid2 size={4} className="bg-white rounded-md overflow-hidden">

        </Grid2>
      </Grid2>
    </Box>
  );
};

export default OverViewPage;
