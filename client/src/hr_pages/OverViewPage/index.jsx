import { Avatar, Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import React from "react";
import { Button, CommonAvatar, CommonIcon } from "../../ui";
import EmploymentGrowthChart from "./Chart";
import { useGetOverviewHr } from "../../hooks/modules/overview/useGetOverviewHr";
import { useSelector } from "react-redux";
import { useConvertData } from "../../hooks";
import { BorderLinearProgress } from "../ProfileHrPage/components/Account";
import BarChartSkeleton from "../../ui/BarChartSkeleton";
import BarChartEmpty from "../../components/BarChartEmpty";
import CustomCircularProgress from "../../components/CustomCircularProgress";
import VerifyItem from "../PostJobPage/components/NotVerify/VerifyItem";
import { RouteBase } from "../../constants/routeUrl";
import { useNavigate } from "react-router-dom";

const OverViewPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
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
          <CommonIcon.FeedTwoTone className="!text-[#ffffff82] !size-20" />
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
          <CommonIcon.NewspaperTwoTone className="!text-[#ffffff82] !size-20" />
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
        <Grid2 size={4} className="bg-white rounded-md overflow-hidden p-5">
          <div className="flex items-center gap-3">
            <Avatar src={user?.avatar_url} className="!size-14" />
            <div className="flex flex-col gap-">
              <Typography className="text-neutrals-100" fontSize={"18px"} fontWeight={600}>
                Xin chào, <span className="text-primary">{user?.username}</span>
              </Typography>
              <Typography fontSize={"14px"} className="text-neutrals-80">
                Quản lý tuyển dụng
              </Typography>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <Typography fontSize={"14px"} fontWeight={500} className="text-primary-dark">Hoàn thành hồ sơ</Typography>
                <Typography fontSize={"14px"} fontWeight={500} className="text-primary">{
                  user?.is_verified
                    ? 66.66
                    : user?.is_verified_phone && user?.is_verified
                      ? 100
                      : 33.33
                }%</Typography>
              </div>
              <BorderLinearProgress
                variant="determinate"
                value={
                  user?.is_verified
                    ? 66.66
                    : user?.is_verified_phone && user?.is_verified
                      ? 100
                      : 33.33
                }
              />
            </div>
            <Typography fontSize={"14px"} className="text-neutrals-80">
              {user?.is_verified
                ? "Hiện tại bạn đã có thể đăng những tin tuyển dụng cho doanh nghiệp của mình"
                : "Vui lòng thực hiện các bước xác thực dưới đây để bắt đầu đăng tin và nhận hồ sơ ứng tuyển cho tin tuyển dụng của bạn."}
            </Typography>
          </div>
          <div className="flex flex-col gap-5 mt-5">
            <VerifyItem
              is_verified={!!user?.company_name}
              text={"Cập nhật thông tin công ty"}
              path={`${RouteBase.HRProfile}?type=1`}
            />
            {!user?.is_verified && <VerifyItem
              is_verified={user?.is_verified}
              disable={user?.is_verified}
              text={"Xác thực Email"}
              path={RouteBase.HRVerify}
            />}
            {user?.is_verified && <Button onClick={()=>{navigate(RouteBase.HRJobs)}} startIcon={<CommonIcon.AddBoxTwoTone/>} className={"!bg-primary !text-white"}>Đăng tin ngay</Button>}
          </div>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default OverViewPage;
