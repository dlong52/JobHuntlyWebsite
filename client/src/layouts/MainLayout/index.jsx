import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useLocation } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="">
      <Header />
      <div
        className={`bg-neutrals-0 text-neutrals-100 min-h-screen ${
          (location.pathname === RouteBase.Home || location.pathname === RouteBase.Job) ? "" : "mt-header"
        }`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
