import React, { useState } from "react";
import moment from "moment";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { CommonIcon } from "../../ui";

const CVChart = ({ data }) => {
  const formattedData = data?.map((item) => ({
    ...item,
    _id: moment(item._id).format("DD/MM"),
    count: Math.round(item.count),
  }));

  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <div className="w-full bg-white rounded-lg">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={formattedData}
          barCategoryGap="40%"
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            strokeOpacity={0.3}
          />
          <XAxis
            dataKey="_id"
            tick={{ fontSize: 12, fill: "#666" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#666" }}
            tickLine={false}
            axisLine={false}
          />
          {/* Tooltip chỉ hiển thị khi hover */}
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              border: "none",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
            formatter={(value) => [`${value}`, "CV tiếp nhận"]}
            itemStyle={{ color: "var(--primary)", fontWeight: "bold" }}
            active={activeTooltip !== null}
          />
          <Bar
            dataKey="count"
            fill="var(--primary)"
            barSize={20}
            radius={[5, 5, 0, 0]}
            onMouseEnter={(data, index) => setActiveTooltip(index)}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Chú thích */}
      <div className="flex items-center justify-center text-gray-600 mt-2 text-sm">
        <CommonIcon.BarChart className="text-gray-500 mr-2" />
        Kết quả CV tiếp nhận 28 ngày qua
      </div>
    </div>
  );
};

export default CVChart;
