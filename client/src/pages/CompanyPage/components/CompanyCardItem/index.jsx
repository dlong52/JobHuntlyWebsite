import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";

const CompanyCardItem = ({ id, avatar, cover, name, description }) => {
  return (
    <div className="bg-white w-full rounded-sm">
      {cover ? (
        <img src={cover} alt="" className="h-[150px] w-full object-cover" />
      ) : (
        <Box className="bg-slate-200 h-[150px]" />
      )}
      <img src={avatar} alt="" className="size-16 rounded-md border translate-x-5 -translate-y-1/2" />
      <div className="px-5 pb-5">
        {name && <Link className="text-lg font-semibold " to={`${RouteBase.Company}/${id}`}>{name}</Link>}
        {description && <Typography>{description}</Typography>}
      </div>
    </div>
  );
};

export default CompanyCardItem;
