import React, { useMemo } from "react";
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

const CustomTooltip = ({ active, payload }) => {
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
};

const JobBarChart = () => {
  const { filters } = useFilters({
    page: 1,
    limit: 5,
    sortBy: "job_count",
    sort: "desc",
  });

  const { data } = useGetAllCategories(filters);

  const categories = useMemo(() => {
    if (data) {
      return data?.data?.map((category, index) => ({
        name: category?.sort_name,
        jobs: category?.job_count,
        color: COLORS[index % COLORS.length],
      }));
    }
    return [];
  }, [data]);

  return (
    <Box>
      <h2 className="text-white font-bold mb-4">
        Nhu cầu tuyển dụng theo ngành nghề
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={categories} barSize={35} margin={{ left: -40 }}>
          <defs>
            {categories.map((entry, index) => (
              <linearGradient
                key={index}
                id={`gradient-${index}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                <stop offset="100%" stopColor={entry.color} stopOpacity={0.3} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            vertical={false}
            strokeDasharray="10 3"
            stroke="#f0f8ff4f"
          />
          <XAxis dataKey="name" fontSize={12} stroke="#fff" />
          <YAxis fontSize={12} stroke="#fff" />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<CustomTooltip />}
          />
          <Bar
            dataKey="jobs"
            animationDuration={500}
            fillOpacity={1}
            cursor="default"
          >
            {categories.map((entry, index) => (
              <Cell
                radius={[3, 3, 0, 0]}
                key={`cell-${index}`}
                fill={`url(#gradient-${index})`}
                style={{ transition: "all 0.5s ease-in-out" }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Box className="flex justify-center mt-4">
        {categories.map((entry, index) => (
          <Box key={index} className="flex items-center mx-4">
            <Box
              className="w-4 h-4 mr-2 rounded"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-white text-nowrap">{entry.name}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default JobBarChart;
