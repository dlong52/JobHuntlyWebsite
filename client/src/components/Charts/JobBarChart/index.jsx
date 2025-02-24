import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import helpers from "../../../utils/helpers";
import { useGetAllCategories } from "../../../hooks/modules/category/useGetAllCategories";
import useFilters from "../../../hooks/useFilters";

// Dữ liệu mẫu

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border p-2 rounded shadow-lg">
        <h4 className="text-lg font-semibold">{payload[0].payload.name}</h4>
        <p className="text-gray-700">
          {payload[0].value.toLocaleString("vi-VN")} việc làm
        </p>
      </div>
    );
  }
  return null;
};

const JobBarChart = () => {
  const { filters } = useFilters({
    page: 1,
    limit: 4,
    sort: "desc",
  });
  const { data, isLoading } = useGetAllCategories(filters);
  const categories = useMemo(() => {
    if (data) {
      return data?.data?.map((category) => {
        return {
          name: category?.name,
          jobs: category?.job_count,
          color: "#4CAF50",
        };
      });
    }
    return [];
  }, [data]);

  return (
    <div className="">
      <h2 className=" text-white font-bold mb-4">
        Nhu cầu tuyển dụng theo ngành nghề
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={categories}>
          <defs>
            {categories?.map((entry, index) => (
              <linearGradient
                key={index}
                id={`gradient-${index}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                <stop offset="100%" stopColor={entry.color} stopOpacity={0} />
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
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
          <Bar dataKey="jobs" animationDuration={500}>
            {categories?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4">
        {categories?.map((entry, index) => (
          <div key={index} className="flex items-center mx-4">
            <div
              className="w-4 h-4 mr-2 rounded"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-white text-nowrap">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBarChart;
