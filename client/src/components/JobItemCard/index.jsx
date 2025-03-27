import { Box } from "@mui/material";
import React from "react";
import { cpLogo, hotjob } from "../../assets/images";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import helpers from "../../utils/helpers";
import { PACKAGE_CODE } from "../../constants/enum";

const JobItemCard = ({ data }) => {
  const isHotJob =
    data?.subscription_id?.package_id?.package_code === PACKAGE_CODE.MAX_PLUS;
  return (
    <Box className="p-5 relative flex flex-col gap-5 border rounded-lg bg-white shadow-sm hover:shadow-lg hover:border-primary transition-all duration-200">
      {isHotJob && (
        <img
          src={hotjob}
          className="absolute top-[-30px] left-[-20px] size-14"
          alt=""
        />
      )}
      <Box className="flex justify-between items-center">
        <Link to={`${RouteBase.Job}/${data?._id}`}>
          <img src={data?.company?.logo || cpLogo} alt="" className="w-12 rounded-md" />
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
