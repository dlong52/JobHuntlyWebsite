import React from "react";
import { Box, Skeleton } from "@mui/material";

const LoadingJob = () => {
  return (
    <Box className="border p-6 rounded-lg shadow">
      <Box className="flex items-start gap-3 w-full">
        <Skeleton
          variant="rectangular"
          width={98}
          height={98}
          className="rounded-md"
        />
        <Box className="flex flex-col gap-5 w-full">
          <Box className="flex justify-between w-full">
            <Box>
              <Skeleton variant="text" width={200} height={24} />
              <Skeleton variant="text" width={150} height={20} />
            </Box>
            <Skeleton variant="text" width={100} height={24} />
          </Box>
          <Box className="w-full flex justify-end gap-2">
            <Skeleton
              variant="rectangular"
              width={90}
              height={32}
              className="rounded"
            />
            <Skeleton
              variant="rectangular"
              width={40}
              height={32}
              className="rounded"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingJob;
