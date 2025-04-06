import React from "react";
import { CommonIcon } from "../../ui";
import { Box, Skeleton } from "@mui/material";
const CategoryItem = ({ data, loading }) => {
  if (loading) {
    return <Skeleton variant="rectangular" height="160px" width="100%" />;
  }
  return (
    <Box className="transition-all duration-1000 p-6 flex flex-col items-center gap-6 bg-white group hover:bg-gradient-to-br from-primary-dark to-primary border rounded-md overflow-hidden">
      <Box className="p-2 rounded-lg bg-[#ffffff6e] w-fit">
        <img
          src={data?.icon}
          alt=""
          className="size-[55px] "
        />
      </Box>
      <Box className="flex flex-col items-center gap-2">
        <Box className="font-semibold font-ClashDisplay text-lg text-neutrals-100 group-hover:text-white">
          {data?.name}
        </Box>
        <Box className="font-Epilogue text-[15px] text-primary flex gap-4 group-hover:text-white">
          <span className="">{data?.job_count} việc làm có sẵn </span>
          <CommonIcon.EastRounded />
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryItem;
