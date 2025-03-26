import React from "react";
import { logo } from "../../assets/images";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";

const Logo = ({ path = RouteBase.Home }) => {
  return (
    <Link to={path} className="flex items-center gap-x-2">
      <img src={logo} alt="Logo" className="h-[36px]" />
      <span className="font-MonumentExtended text-[24px] font-semibold text-neutrals-100">
        JobHuntly
      </span>
    </Link>
  );
};

export default Logo;
