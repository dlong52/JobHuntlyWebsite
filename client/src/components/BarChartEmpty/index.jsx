import { Box, Typography } from "@mui/material";
import React from "react";

const BarChartEmpty = () => {
  return (
    <Box className="w-full h-full flex flex-col items-center gap-5 p-4 bg-gray-100 rounded-lg">
      <Box className="w-full h-full flex items-end justify-center gap-4 ">
        {[20, 40, 60, 80, 50, 30, 50].map((height, index) => (
          <Box
            key={index}
            className="bg-gray-300 rounded-md w-8"
            style={{ height: `${height}%` }}
          />
        ))}
      </Box>
      <Typography fontSize={"14px"} className="text-neutrals-60">Chưa có dữ liệu để hiển thị</Typography>
    </Box>
  );
};

export default BarChartEmpty;
