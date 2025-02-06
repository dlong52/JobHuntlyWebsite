import React from "react";
import { mascot_empty } from "../../assets/images";
import { Typography } from "@mui/material";

const MascotEmpty = ({ message }) => {
  return (
    <div className="w-full h-fit flex justify-center items-center flex-col gap-2 py-10">
      <img src={mascot_empty} alt="" className="w-1/4" />
      <Typography className="text-neutrals-40 !text-sm" >{message}</Typography>
    </div>
  );
};

export default MascotEmpty;
