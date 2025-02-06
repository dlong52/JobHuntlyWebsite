import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import CommonIcon from "../CommonIcon";

const BreadcrumbMui = ({ title, breadcrumbs }) => {
  return (
    <div className="flex justify-between p-5 bg-white rounded-md shadow-sm">
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
        separator={<CommonIcon.NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbMui;
