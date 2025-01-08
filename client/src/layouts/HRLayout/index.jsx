import React from "react";
import { HeaderHr, Sidebar } from "../partials";
import { Container } from "@mui/material";

const HRLayout = ({ children }) => {
  return (
    <div className="relative flex bg-[#eef2f6] min-h-screen">
      <Sidebar />
      <div className="ml-content-admin w-full">
        <HeaderHr />
        <div className="mt-header-hr rounded-t-md">
          <Container className="py-5">{children}</Container>
        </div>
      </div>
    </div>
  );
};

export default HRLayout;
