import React from "react";
import { Box, Skeleton, Paper, Stack, Divider } from "@mui/material";

const PieChartSkeleton = () => {
  // Configuration for different regions
  const legendItems = 4;
  
  return (
    <Box className="flex flex-col items-center">
      {/* Main content container */}
      <Box className="w-full">
        {/* Chart region */}
        <Box 
          className="flex justify-center"
          sx={{ position: "relative" }}
        >
          {/* Chart circle skeleton */}
          <Skeleton
            variant="circular"
            width={200}
            height={200}
            sx={{ 
              position: "relative",
              zIndex: 1
            }}
          />
          
          {/* Center dot */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2
            }}
          >
            <Skeleton 
              variant="circular" 
              width={60} 
              height={60} 
              sx={{ bgcolor: "rgba(0,0,0,0.08)" }} 
            />
          </Box>
          
          {/* Chart segments - overlaid on the circle */}
          {Array.from({ length: 4 }).map((_, index) => (
            <Box
              key={`segment-${index}`}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                height: "180px",
                width: "2px",
                bgcolor: "white",
                transform: `translate(-50%, -50%) rotate(${index * 45}deg)`,
                transformOrigin: "center",
                zIndex: 2
              }}
            />
          ))}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Legend region */}
        <Box className="flex flex-wrap justify-center mt-2">
          {Array.from({ length: legendItems }).map((_, index) => (
            <Box 
              key={`legend-${index}`} 
              className="flex items-center mx-3 my-1"
            >
              <Skeleton 
                variant="circular" 
                width={12} 
                height={12} 
                className="mr-2" 
                sx={{ 
                  bgcolor: index === 0 ? "rgba(216, 67, 21, 0.2)" : 
                          index === 1 ? "rgba(38, 164, 255, 0.2)" :
                          index === 2 ? "rgba(123, 97, 255, 0.2)" : 
                                      "rgba(255, 184, 54, 0.2)" 
                }}
              />
              <Skeleton 
                variant="text" 
                width={80} 
                height={18} 
              />
            </Box>
          ))}
        </Box>
        
        {/* Data summary region - optional */}
        <Box className="mt-4 px-4">
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            sx={{ mb: 1 }}
          >
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(PieChartSkeleton);