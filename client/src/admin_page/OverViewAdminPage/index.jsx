import React, { useMemo } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import CommonIcon from "../../ui/CommonIcon";
import CategoryChart from "./components/CategoryChart";
import RevenueByPackageChart from "../RevenueManagementPage/components/RevenueByPackageChart";
import { useGetOverviewAdmin } from "../../hooks/modules/overview/useGetOverviewAdmin";
import { useConvertData } from "../../hooks";

// Extracted reusable stat card component
const StatCard = ({ title, count, isIncrease, growthPercentage, icon, bgColor }) => (
  <Box className={`${bgColor} rounded-md p-4 flex-1 flex justify-between items-center`}>
    <Box className="text-white">
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "900" }}>
        {count}
      </Typography>
      <Typography variant="caption">
        {isIncrease ? "Tăng" : "Giảm"} {Math.abs(growthPercentage || 0)}%
      </Typography>
    </Box>
    {React.cloneElement(icon, { className: "!text-[#ffffff82] !size-20" })}
  </Box>
);

// Skeleton loader for StatCard
const StatCardSkeleton = ({ bgColor }) => (
  <Box className={`${bgColor} rounded-md p-4 flex-1 flex justify-between items-center`}>
    <Box className="text-white w-full">
      <Skeleton
        variant="text"
        width="60%"
        height={24}
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
      />
      <Skeleton
        variant="text"
        width="40%"
        height={32}
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
      />
      <Skeleton
        variant="text"
        width="30%"
        height={16}
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
      />
    </Box>
    <Skeleton
      variant="circular"
      width={48}
      height={48}
      sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
    />
  </Box>
);

const OverViewAdminPage = () => {
  const { data, isLoading } = useGetOverviewAdmin();
  const { dataConvert } = useConvertData(data);

  // Use memoization to prevent unnecessary re-renders
  const statsData = useMemo(() => [
    {
      title: "Việc làm trong ngày",
      count: dataConvert?.jobs?.count,
      isIncrease: dataConvert?.jobs?.isIncrease,
      growthPercentage: dataConvert?.jobs?.growthPercentage || 0,
      icon: <CommonIcon.PaidTwoTone />,
      bgColor: "bg-primary"
    },
    {
      title: "Người dùng mới",
      count: dataConvert?.users?.count,
      isIncrease: dataConvert?.users?.isIncrease,
      growthPercentage: dataConvert?.users?.growthPercentage || 0,
      icon: <CommonIcon.GroupsTwoTone />,
      bgColor: "bg-accent-blue"
    },
    {
      title: "Doanh nghiệp mới",
      count: dataConvert?.companies?.count,
      isIncrease: dataConvert?.companies?.isIncrease,
      growthPercentage: dataConvert?.companies?.growthPercentage || 0,
      icon: <CommonIcon.BusinessTwoTone />,
      bgColor: "bg-accent-red"
    }
  ], [dataConvert]);

  // Background colors for skeletons
  const bgColors = ["bg-primary", "bg-accent-blue", "bg-accent-red"];

  return (
    <>
      <Box className="flex gap-5">
        {isLoading ? (
          // Show skeletons when loading
          bgColors.map((bgColor, index) => (
            <StatCardSkeleton key={`skeleton-${index}`} bgColor={bgColor} />
          ))
        ) : (
          // Show actual data when loaded
          statsData.map((stat, index) => (
            <StatCard key={`stat-${index}`} {...stat} />
          ))
        )}
      </Box>
      <Box className="grid grid-cols-12 gap-5 mt-5">
        <Box className="col-span-8">
          <CategoryChart />
        </Box>
        <Box className="col-span-4 p-5 bg-white rounded-md shadow">
          <RevenueByPackageChart />
        </Box>
      </Box>
    </>
  );
};

export default React.memo(OverViewAdminPage);