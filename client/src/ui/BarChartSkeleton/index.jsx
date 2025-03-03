import React from "react";
import { Box, Skeleton } from "@mui/material";

const BarChartSkeleton = ({ height = 300, bars = 5 }) => {
  return (
    <Box
      sx={{
        height,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {/* Tiêu đề */}
      <Skeleton variant="text" width="50%" height={30} />

      {/* Biểu đồ dạng thanh */}
      <Box sx={{ display: "flex", alignItems: "flex-end", height: "80%", gap: 1 }}>
        {Array.from({ length: bars }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{ flex: 1 }} // Tự động giãn đều các cột
            height={`${Math.random() * 60 + 20}%`}
          />
        ))}
      </Box>

      {/* Nhãn trục X */}
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        {Array.from({ length: bars }).map((_, index) => (
          <Skeleton key={index} variant="text" width="15%" height={20} />
        ))}
      </Box>
    </Box>
  );
};

export default BarChartSkeleton;
