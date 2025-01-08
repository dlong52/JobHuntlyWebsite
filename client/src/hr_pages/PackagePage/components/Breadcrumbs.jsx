import { Box, Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { CommonIcon } from "../../../ui";
import { RouteBase } from "../../../constants/routeUrl";

const BreadcrumbPk = () => {
  return (
    <Box className="flex justify-between p-5 bg-white rounded-md">
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 500,
          color: "var(--neutrals-100)",
        }}
      >
        Mua dịch vụ
      </Typography>
      <Breadcrumbs
        separator={<CommonIcon.NavigateNext />}
        aria-label="breadcrumb"
        className="flex items-center"
      >
        <Link
          underline="hover"
          key="1"
          color="inherit"
          to={RouteBase.HROverview}
          className="text-primary"
        >
          <CommonIcon.HomeRounded fontSize="small" />
        </Link>
        <Typography
          key="3"
          sx={{ fontWeight: 500, fontSize: "14px", color: "text.primary" }}
        >
          Mua dịch vụ
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbPk;
