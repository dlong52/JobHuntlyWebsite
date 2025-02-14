import { Box, Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import CommonIcon from "../CommonIcon";

const BreadcrumbMui = ({ title, breadcrumbs }) => {
  return (
    <Box className="flex items-center justify-between p-5 bg-white rounded-md shadow-sm">
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 500,
          color: "var(--neutrals-100)",
        }}
      >
        {title}
      </Typography>
      <Breadcrumbs
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        separator={<Typography fontWeight={500}>/</Typography>}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbMui;
