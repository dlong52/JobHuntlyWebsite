import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useLocation } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/enum";
import VerifyButton from "../../components/VerifyButton";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const { role } = useSelector((state) => state.user);
  return (
    <Box className="">
      <Header />
      <Box
        className={`bg-neutrals-0 text-neutrals-100 pb-20 ${
          location.pathname === RouteBase.Home ||
          location.pathname === RouteBase.Job
            ? ""
            : "mt-header"
        }`}
      >
        {children}
      </Box>
      <Footer />
      {role === ROLE.CANDIDATE && <VerifyButton />}
    </Box>
  );
};

export default MainLayout;
