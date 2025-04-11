import React from "react";
import { companyLogoDefault } from "../../../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";
import { Box } from "@mui/material";
import { Button } from "../../../../ui";

const JobSuggestItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-start gap-3 cursor-pointer">
      <Box
        className="w-[60px] aspect-square shadow overflow-hidden rounded-md"
        onClick={() => {
          navigate(`${RouteBase.Job}/${id}`);
        }}
      >
        <img
          className="size-full hover:scale-105 transition-all duration-300 object-cover object-center"
          src={data?.company?.logo || companyLogoDefault}
          alt="Logo"
        />
      </Box>
      <Box className="flex flex-col w-full">
        <Box className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="">
              <Link
                to={`${RouteBase.Job}/${data?._id}`}
                className="hover:underline font-semibold text-lg flex items-center gap-2"
              >
                {data?.title}{" "}
              </Link>
              <Link
                className="hover:text-primary"
                to={`${RouteBase.Company}/${data?.company?._id}`}
              >
                {data?.company?.name}
              </Link>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default JobSuggestItem;
