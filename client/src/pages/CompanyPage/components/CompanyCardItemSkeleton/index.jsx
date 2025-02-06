import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

const CompanyCardItemSkeleton = () => {
  return (
    <div className="bg-white w-full rounded-sm">
      {/* Cover Image Skeleton */}
      <Skeleton variant="rectangular" height={150} width="100%" />

      {/* Avatar Skeleton */}
      <Skeleton
        variant="circular"
        width={64}
        height={64}
        className="translate-x-5 -translate-y-1/2 border"
      />

      <div className="px-5 pb-5">
        {/* Name Skeleton */}
        <Skeleton width="60%" height={20} />

        {/* Description Skeleton */}
        <Typography>
          <Skeleton width="80%" />
          <Skeleton width="70%" />
        </Typography>
      </div>
    </div>
  );
};

export default CompanyCardItemSkeleton;
