import React, { useMemo, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useGetAllCategories } from "../../../hooks/modules/category/useGetAllCategories";
import useFilters from "../../../hooks/useFilters";
import { Box } from "@mui/material";

const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#FF5722"];

// Moved outside component to prevent recreation on each render
const CustomTooltip = React.memo(({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box className="bg-white border p-2 rounded shadow-lg">
        <h4 className="text-lg font-semibold">{payload[0].payload.name}</h4>
        <p className="text-gray-700">
          {payload[0].value.toLocaleString("vi-VN")} việc làm
        </p>
      </Box>
    );
  }
  return null;
});

// Define static configs outside the component
const CHART_MARGIN = { left: -40 };
const BAR_SIZE = 35;
const CARTESIAN_GRID_PROPS = {
  vertical: false,
  strokeDasharray: "10 3",
  stroke: "#f0f8ff4f"
};
const AXIS_PROPS = {
  fontSize: 12,
  stroke: "#fff"
};
const TOOLTIP_PROPS = {
  cursor: { fill: "transparent" }
};
const BAR_PROPS = {
  dataKey: "jobs",
  animationDuration: 500,
  fillOpacity: 1,
  cursor: "default"
};

const JobBarChart = () => {
  // Fixed filter params to avoid recreation
  const filterParams = useMemo(() => ({
    page: 1,
    limit: 5,
    sortBy: "job_count",
    sort: "desc",
  }), []);

  const { filters } = useFilters(filterParams);
  const { data } = useGetAllCategories(filters);

  // Process categories data
  const categories = useMemo(() => {
    if (!data?.data) return [];
    
    return data.data.map((category, index) => ({
      name: category?.sort_name,
      jobs: category?.job_count,
      color: COLORS[index % COLORS.length],
    }));
  }, [data]);

  // Create gradient definitions once
  const renderGradients = useCallback(() => {
    return categories.map((entry, index) => (
      <linearGradient
        key={`gradient-${index}`}
        id={`gradient-${index}`}
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
      >
        <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
        <stop offset="100%" stopColor={entry.color} stopOpacity={0.3} />
      </linearGradient>
    ));
  }, [categories]);

  // Create cells once
  const renderCells = useCallback(() => {
    return categories.map((entry, index) => (
      <Cell
        radius={[3, 3, 0, 0]}
        key={`cell-${index}`}
        fill={`url(#gradient-${index})`}
        style={{ transition: "all 0.5s ease-in-out" }}
      />
    ));
  }, [categories]);

  // Create legend items once
  const renderLegend = useCallback(() => {
    return categories.map((entry, index) => (
      <Box key={index} className="flex items-center mx-4">
        <Box
          className="w-4 h-4 mr-2 rounded"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-white text-nowrap">{entry.name}</span>
      </Box>
    ));
  }, [categories]);

  return (
    <Box>
      <h2 className="text-white font-bold mb-4">
        Nhu cầu tuyển dụng theo ngành nghề
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={categories} barSize={BAR_SIZE} margin={CHART_MARGIN}>
          <defs>{renderGradients()}</defs>
          <CartesianGrid {...CARTESIAN_GRID_PROPS} />
          <XAxis dataKey="name" {...AXIS_PROPS} />
          <YAxis {...AXIS_PROPS} />
          <Tooltip
            {...TOOLTIP_PROPS}
            content={<CustomTooltip />}
          />
          <Bar {...BAR_PROPS}>
            {renderCells()}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Box className="flex justify-center mt-4">
        {renderLegend()}
      </Box>
    </Box>
  );
};

export default React.memo(JobBarChart);