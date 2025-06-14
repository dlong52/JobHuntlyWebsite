import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetJobCount } from "../../../hooks/modules/post/useGetJobCount";
import { useConvertData } from "../../../hooks";
import { Skeleton, Box } from "@mui/material";

const EmploymentGrowthChart = () => {
  const { data, isLoading } = useGetJobCount();
  const { dataConvert } = useConvertData(data);

  return (
    <div>
      <h2 className="text-white font-bold mb-4">Tăng trưởng cơ hội việc làm</h2>

      {isLoading ? (
        // Hiển thị skeleton loading khi đang tải dữ liệu
        <Box sx={{ width: "100%", height: 250 }}>
          <Skeleton variant="rectangular" width="100%" height={250} />
        </Box>
      ) : (
        // Hiển thị biểu đồ khi đã có dữ liệu
        <ResponsiveContainer
          width="100%"
          height={250}
          style={{ marginLeft: "-30px" }}
        >
          <LineChart data={dataConvert}>
            <defs>
              <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a90e2" stopOpacity={1} />
                <stop offset="100%" stopColor="#4a90e2" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="10 3" stroke="#f0f8ff4f" />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#fff" }}
              axisLine={{ stroke: "#ccc" }}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#fff" }}
              axisLine={{ stroke: "#ccc" }}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                borderRadius: 10,
                borderColor: "#ccc",
                color: "#fff",
              }}
              labelStyle={{ color: "#888" }}
            />

            <Line
              type="monotone"
              dataKey="jobs"
              stroke="url(#colorLine)"
              strokeWidth={3}
              dot={{ r: 5, fill: "#4a90e2", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default EmploymentGrowthChart;
