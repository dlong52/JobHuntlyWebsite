import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useGetRevenueByPackage } from "../../../../hooks/modules/payment/useGetRevenueByPackage";
import { useConvertData } from "../../../../hooks";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box, Typography } from "@mui/material";
import helpers from "../../../../utils/helpers";
import PieChartSkeleton from "../../../../ui/PieChartSkeleton";

// Move constants outside component to prevent recreation on each render
const COLORS = ["#d84315", "#26A4FF", "#7B61FF", "#FFB836"];
const DEFAULT_DATA = [
  { _id: "Không có dữ liệu", totalRevenue: 1, fill: "#D3D3D3" },
];

// Extracted as separate memoized component to prevent re-renders
const CustomTooltip = React.memo(({ active, payload }) => {
  if (active && payload && payload.length) {
    const isDefaultData = payload[0].name === "Không có dữ liệu";
    return (
      <Box
        className="text-white px-4 py-2 rounded-lg shadow-md"
        style={{ backgroundColor: payload[0].payload.fill }}
      >
        <Box className="flex items-center gap-1 text-white">
          <Typography fontSize={"14px"} fontWeight={500}>
            {payload[0].name}:
          </Typography> 
          {!isDefaultData && (
            <Typography fontSize={"14px"} fontWeight={500}>
              {helpers.numberFormat(Number(payload[0].value))}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }
  return null;
});

// Extracted as separate memoized component
const CustomLegend = React.memo(({ payload }) => {
  return (
    <Box className="flex flex-wrap justify-center mt-4">
      {payload.map((entry, index) => (
        <Box key={`legend-${index}`} className="flex items-center mr-4">
          <Box
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          ></Box>
          <span className="text-sm text-primary-dark font-medium">
            {entry.value}
          </span>
        </Box>
      ))}
    </Box>
  );
});

const RevenueByPackageChart = () => {
  const { data, isLoading } = useGetRevenueByPackage();
  const { dataConvert } = useConvertData(data);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [key, setKey] = useState(0); // Restore key state for animation triggering
  
  // Process data with useMemo to prevent unnecessary calculations
  const chartData = useMemo(() => {
    if (!dataConvert?.length) return DEFAULT_DATA;
    
    return dataConvert.map((item, index) => ({
      ...item,
      fill: COLORS[index % COLORS.length]
    }));
  }, [dataConvert]);
  
  // Trigger animation when data changes
  useEffect(() => {
    if (!isLoading && dataConvert) {
      // Force re-render of the chart with animation
      setIsAnimationActive(true);
      setKey(prevKey => prevKey + 1);
    }
  }, [dataConvert, isLoading]);

  // Use callback to prevent recreation on each render
  const handleAnimationEnd = useCallback(() => {
    setIsAnimationActive(false);
  }, []);

  return (
    <Box>
      <h2 className="text-primary text-center font-bold mb-4">
        Doanh thu theo gói dịch vụ
      </h2>
      {isLoading ? (
        <PieChartSkeleton />
      ) : (
        <Box className="flex flex-col items-center">
          <PieChart 
            width={320} 
            height={320} 
            key={`pie-chart-${key}`} // Use explicit key to force remount
          >
            <Pie
              data={chartData}
              dataKey="totalRevenue"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-in-out" // Changed to ease-in-out for smoother animation
              isAnimationActive={true} // Always keep animation active to ensure it works
              onAnimationEnd={handleAnimationEnd}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(RevenueByPackageChart);