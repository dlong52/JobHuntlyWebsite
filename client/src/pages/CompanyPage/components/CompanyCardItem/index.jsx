import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";
import {
  companyCoverDefault,
  companyLogoDefault,
} from "../../../../assets/images";

const CompanyCardItem = ({ id, avatar, cover, name, description }) => {
  return (
    <div className="bg-white w-full rounded-sm">
      <img
        src={cover ? cover : companyCoverDefault}
        alt=""
        className="h-[150px] w-full object-cover"
      />
      <img
        src={avatar ? avatar : companyLogoDefault}
        alt=""
        className="size-16 rounded-md border translate-x-5 -translate-y-1/2"
      />
      <div className="px-5 pb-5">
        {name && (
          <Link
            className="text-lg font-semibold hover:underline"
            to={`${RouteBase.Company}/${id}`}
          >
            {name}
          </Link>
        )}
        {description && (
          <Typography fontSize={"14px"} className="!line-clamp-2 text-neutrals-80">
            {description}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default CompanyCardItem;
