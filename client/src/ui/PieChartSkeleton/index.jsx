import React from "react";
import { Box, Skeleton } from "@mui/material";

const PieChartSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Chart circle skeleton */}
      <Box
        sx={{
          width: 320,
          height: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <Skeleton
          variant="circular"
          width={200}
          height={200}
          sx={{ 
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        />
      </Box>

      {/* Legend skeleton */}
      <div className="flex flex-wrap justify-center mt-4 w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={`legend-${index}`} className="flex items-center mr-4 mb-2">
            <Skeleton variant="circular" width={12} height={12} className="mr-2" />
            <Skeleton variant="text" width={80} height={20} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartSkeleton;