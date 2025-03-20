import {
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
const BorderLinearProgress = styled(LinearProgress)(
  ({ theme, colorPrimary, barColor }) => ({
    width: "100%",
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: colorPrimary || theme.palette.grey[200], // Truyền màu nền từ props
      ...theme.applyStyles?.("dark", {
        backgroundColor: colorPrimary || theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: barColor || "var(--accent-green)", // Truyền màu thanh tiến trình từ props
      ...theme.applyStyles?.("dark", {
        backgroundColor: barColor || "#308fe8",
      }),
    },
  })
);
const ProgressChartItem = ({ text, value, color }) => {
  return (
    <div className="flex items-center w-full gap-5">
      <div className="min-w-[180px] flex items-center justify-between">
        <Typography className="text-nowrap" fontWeight={500} fontSize={"14px"}>
          {text}
        </Typography>
        <Typography fontSize={"14px"}>{value}</Typography>
      </div>
      <BorderLinearProgress
        variant="determinate"
        value={value}
        colorPrimary="#eee"
        barColor={color}
      />
    </div>
  );
};

export default ProgressChartItem;
