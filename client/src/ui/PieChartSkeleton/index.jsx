import React from "react";
import { Box, Skeleton } from "@mui/material";

const PieChartSkeleton = ({ size = 200 }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      {/* Biểu đồ tròn */}
      <Skeleton
        variant="circular"
        width={size}
        height={size}
        sx={{ borderRadius: "50%" }}
      />

      {/* Chú thích */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width={100} height={20} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PieChartSkeleton;
