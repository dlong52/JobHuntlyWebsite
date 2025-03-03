import React from "react";
import { Skeleton } from "@mui/material";

const CategoryLoading = ({ data, loading }) => {
  return (
    <div className="p-5 flex flex-col gap-3 group transition-all duration-500">
      {/* Skeleton cho Icon */}
      <Skeleton variant="rectangular" width={40} height={40} />

      {/* Skeleton cho Tên danh mục */}
      <Skeleton variant="text" height={30} width="60%" />

      {/* Skeleton cho thông tin job_count */}
      <Skeleton variant="text" height={20} width="40%" />

      {/* Skeleton cho biểu tượng EastRounded */}
      <Skeleton variant="circular" width={24} height={24} />
    </div>
  );
};

export default CategoryLoading;
