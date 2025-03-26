import { Typography } from "@mui/material";
import React from "react";

const Address = ({ address, className }) => {
  const addressInfo = `${
    address?.additional_info ? `${address?.additional_info}, ` : ""
  }${address?.ward?.name ? `${address?.ward?.name}, ` : ""}${
    address?.district?.name ? `${address?.district?.name}, ` : ""
  }${address?.province?.name ? `${address?.province?.name}` : ""}`;
  return addressInfo;
};

export default Address;
