import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const CustomCircularProgress = ({ value }) => {
  return (
    <Box className="relative flex items-center justify-center">
      {/* Vòng tròn nền */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={50}
        thickness={5}
        sx={{ color: "#a6a3fa54" }} // Màu nền nhạt hơn
      />
      {/* Vòng tròn tiến trình */}
      <CircularProgress
        variant="determinate"
        value={value}
        size={50}
        thickness={5}
        sx={{ color: "#4527a0" }} // Màu xanh lá
        style={{ position: "absolute" }}
      />
      {/* Hiển thị phần trăm */}
      <Typography
        variant="caption"
        component="div"
        sx={{ color: "#4527a0", fontWeight: "bold", position: "absolute" }}
      >
        {`${value}%`}
      </Typography>
    </Box>
  );
};

export default CustomCircularProgress;
