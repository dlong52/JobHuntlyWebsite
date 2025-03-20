import React from "react";
import { HeaderAdmin, SidebarAdmin } from "../partials";
import { Container, Box } from "@mui/material";

const HRLayout = ({ children }) => {
  return (
    <Box className="relative flex bg-[#eef2f6] min-h-screen ">
      <SidebarAdmin />
      <Box className="ml-content-admin w-full bg-white">
        <HeaderAdmin />
        <Box className="mt-header-hr min-h-full rounded-t-lg bg-[#eef2f6] overflow-y-auto ">
          <Container className="py-5">{children}</Container>
        </Box>
      </Box>
    </Box>
  );
};

export default HRLayout;
