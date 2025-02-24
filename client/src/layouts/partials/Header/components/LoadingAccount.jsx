import { Box, Skeleton } from "@mui/material";
import React from "react";

const LoadingAccount = () => {
  return (
    <Box className="flex items-center gap-6">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
    </Box>
  );
};

export default LoadingAccount;
