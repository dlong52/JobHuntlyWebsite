import React from "react";
import { HeaderAdmin, SidebarAdmin } from "../partials";
import { Container } from "@mui/material";

const HRLayout = ({ children }) => {
  return (
    <div className="relative flex bg-[#eef2f6] min-h-screen">
      <SidebarAdmin />
      <div className="ml-content-admin w-full">
        <HeaderAdmin />
        <div className="mt-header-hr rounded-t-md overflow-y-auto">
          <Container className="py-5">{children}</Container>
        </div>
      </div>
    </div>
  );
};

export default HRLayout;
