import React from "react";
import { HeaderHr, Sidebar } from "../partials";
import { Box, Container } from "@mui/material";
import VerifyButton from "../../components/VerifyButton";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/enum";
import { RouteBase } from "../../constants/routeUrl";

const HRLayout = ({ children }) => {
  const { role } = useSelector((state) => state.user);
  return (
    <Box className="relative flex min-h-screen">
      <Sidebar />
      <Box className="ml-content-admin w-full">
        <HeaderHr />
        <Box className="mt-header-hr rounded-t-md bg-[#eef2f6] min-h-screen overflow-y-auto">
          <Container className="py-5 pb-20">{children}</Container>
        </Box>
      </Box>
      {role === ROLE.EMPLOYER && <VerifyButton url={RouteBase.HRVerify} />}
    </Box>
  );
};

export default HRLayout;
