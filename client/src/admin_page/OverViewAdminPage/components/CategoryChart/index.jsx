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
import { Box } from "@mui/material";
import { useFilters } from "../../../../hooks";
import { useGetAllCategories } from "../../../../hooks/modules/category/useGetAllCategories";

const COLORS = [
  "#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6",
  "#6366F1", "#EC4899", "#F43F5E", "#22D3EE", "#14B8A6",
  "#F97316", "#A855F7", "#4ADE80", "#EAB308", "#BE185D"
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box className="bg-white border p-2 rounded shadow-lg">
        <h4 className="text-lg font-semibold text-gray-800">{payload[0].payload.name}</h4>
        <p className="text-gray-600">
          {payload[0].value.toLocaleString("vi-VN")} việc làm
        </p>
      </Box>
    );
  }
  return null;
};

const CategoryChart = () => {
  const { filters } = useFilters({
    page: 1,
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
    <Box className="w-full bg-white rounded-md p-5 shadow-md">
      <h2 className="text-primary font-bold mb-4">
        Nhu cầu tuyển dụng theo ngành nghề
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={categories} barSize={30} margin={{ left: -25 }}>
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
          <CartesianGrid vertical={false} strokeDasharray="5 5" stroke="#E5E7EB" />
          <XAxis dataKey="name" fontSize={12} stroke="#6B7280" />
          <YAxis allowDecimals={false} fontSize={12} stroke="#6B7280" />
          <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
          <Bar dataKey="jobs" animationDuration={500} fillOpacity={1} cursor="default">
            {categories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Box className="flex justify-center mt-4 flex-wrap gap-4">
        {categories.map((entry, index) => (
          <Box key={index} className="flex items-center mx-4">
            <Box className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-700 text-nowrap text-sm">{entry.name}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryChart;
