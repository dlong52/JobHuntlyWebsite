import React from "react";
import { useGetRevenueByPackage } from "../../../../hooks/modules/payment/useGetRevenueByPackage";
import { useConvertData } from "../../../../hooks";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Typography } from "@mui/material";
import helpers from "../../../../utils/helpers";
import PieChartSkeleton from "../../../../ui/PieChartSkeleton";

const COLORS = ["#FF6361", "#0088FE", "#845EC2", "#FFB700"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const isDefaultData = payload[0].name === "Không có dữ liệu";
    return (
      <div
        className="text-white px-4 py-2 rounded-lg shadow-md"
        style={{ backgroundColor: payload[0].payload.fill }}
      >
        <div className="flex items-center gap-1 text-neutrals-100">
          <Typography fontSize={"14px"} fontWeight={500}>
            {payload[0].name}
          </Typography>
          {!isDefaultData && (
            <Typography fontSize={"14px"} fontWeight={500}>
              {helpers.numberFormat(Number(payload[0].value))}
            </Typography>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center mr-4">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm text-primary-dark font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};
const DEFAULT_DATA = [
  { _id: "Không có dữ liệu", totalRevenue: 1, fill: "#D3D3D3" },
];

const RevenueByPackageChart = () => {
  const { data, isLoading } = useGetRevenueByPackage();
  const { dataConvert } = useConvertData(data);
  const chartData = dataConvert?.length ? dataConvert : DEFAULT_DATA;

  return (
    <>
      {isLoading ? (
        <PieChartSkeleton />
      ) : (
        <div className="flex flex-col items-center">
          <PieChart width={320} height={320}>
            <Pie
              data={chartData}
              dataKey="totalRevenue"
              nameKey="_id"
              cx="50%"
              cy="50%"
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    dataConvert.length
                      ? COLORS[index % COLORS.length]
                      : "#D3D3D3"
                  }
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </div>
      )}
    </>
  );
};

export default RevenueByPackageChart;
