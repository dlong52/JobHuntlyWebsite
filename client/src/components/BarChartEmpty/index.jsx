import { Typography } from "@mui/material";
import React from "react";

const BarChartEmpty = () => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-5 p-4 bg-gray-100 rounded-lg">
      <div className="w-full h-full flex items-end justify-center gap-4 ">
        {[20, 40, 60, 80, 50, 30, 50].map((height, index) => (
          <div
            key={index}
            className="bg-gray-300 rounded-md w-8"
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
      <Typography className="text-neutrals-80">Không có dữ liệu</Typography>
    </div>
  );
};

export default BarChartEmpty;
