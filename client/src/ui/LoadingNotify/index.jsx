import { MenuItem, Skeleton } from "@mui/material";
import React from "react";

const LoadingNotify = () => {
  return (
    <MenuItem className="flex flex-col">
      <Skeleton variant="text" width="100%" height={30} />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={30}
      />
      <Skeleton variant="text" width="50%" height={30} />
    </MenuItem>
  );
};

export default LoadingNotify;
