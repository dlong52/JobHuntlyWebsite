import { Box } from "@mui/material";
import React from "react";
import { cpLogo } from "../../assets/images";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import helpers from "../../utils/helpers";

const JobItemCard = ({ data }) => {
  return (
    <Box className="p-5 flex flex-col gap-5 border rounded-lg bg-white shadow-sm hover:shadow-lg hover:border-primary transition-all duration-200 overflow-hidden">
      <Box className="flex justify-between items-center">
        <Link to={`${RouteBase.Job}/${data?._id}`}>
          <img src={data?.company?.logo || cpLogo} alt="" className="w-8" />
        </Link>
        <span className="px-4 py-1 rounded-full text-sm border font-medium bg-[#4540de11] text-primary">
          {helpers.convertSalary(data?.salary?.min, data?.salary?.max)}
        </span>
      </Box>
      <Box className="flex flex-col gap-1">
        <Link
          to={`${RouteBase.Job}/${data?._id}`}
          className="font-semibold hover:underline"
        >
          {data?.title}
        </Link>
        <Link
          to={`${RouteBase.Company}/${data?.company?._id}`}
          className="text-neutrals-80 hover:text-primary-dark"
        >
          {data?.company?.name}
        </Link>
        <span className="font-medium text-neutrals-100">
          {data?.location?.province?.name}
        </span>
      </Box>
    </Box>
  );
};

export default JobItemCard;
