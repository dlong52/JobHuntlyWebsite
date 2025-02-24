import { Typography } from "@mui/material";
import React from "react";
import { CommonIcon } from "../../../../ui";
import Address from "../../../../components/Address";
import { companyLogoDefault } from "../../../../assets/images";

const CompanySearchItem = ({ logo, name, quantity, address, description }) => {
  return (
    <div className="flex gap-5 rounded-md shadow overflow-hidden p-4">
      <img
        src={logo ? logo : companyLogoDefault}
        alt=""
        className="size-[80px] rounded-sm"
      />
      <div className="flex flex-col">
        <div className=" flex items-center gap-1">
          <Typography>{name}</Typography>
          <CommonIcon.FiberManualRecord className="!text-xs" />
          <Typography>Đang tuyển {0} vị trí</Typography>
        </div>
        <Typography className="flex gap-1 items-center text-gray-600 !text-sm">
          Trụ sở chính:{" "}
          <Address className={"text-gray-600 !text-sm"} address={address} />
        </Typography>
        <Typography>{description}</Typography>
      </div>
    </div>
  );
};

export default CompanySearchItem;
