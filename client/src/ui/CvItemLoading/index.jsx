import { Skeleton } from "@mui/material";
import React from "react";

const CvItemLoading = () => {
  return (
    <div className="p-5 bg-white shadow rounded-md w-full">
      <Skeleton variant="rectangular" height={"460px"} />
      <Skeleton variant="text" width={"100px"} />
    </div>
  );
};

export default CvItemLoading;
