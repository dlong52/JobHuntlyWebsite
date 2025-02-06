import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useLocation } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Box } from "@mui/material";

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <Box className="">
      <Header />
      <Box
        className={`bg-neutrals-0 text-neutrals-100 min-h-screen ${
          (location.pathname === RouteBase.Home || location.pathname === RouteBase.Job) ? "" : "mt-header"
        }`}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
