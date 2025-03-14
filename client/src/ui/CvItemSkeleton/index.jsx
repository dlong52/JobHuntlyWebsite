import { IconButton, Typography, Skeleton } from "@mui/material";
import React from "react";
import Button from "../Button";
import CommonIcon from "../CommonIcon";

const CvItemSkeleton = () => {
  return (
    <div className="w-full flex justify-center relative min-h-[350px]">
      <Skeleton variant="rectangular" width="80%" height={250} />
      <div className="absolute text-white flex flex-col justify-end p-4 z-[1] bg-gradient-to-t from-neutrals-80 to-transparent w-full h-full">
        <div className="flex items-center flex-nowrap gap-2">
          <Skeleton variant="text" width={150} height={30} />
          <Skeleton variant="circular" width={24} height={24} />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="text" width={100} />{" "}
          <Skeleton variant="text" width={100} />
        </div>
        <div className="flex items-center gap-1">
          <Button
            startIcon={<CommonIcon.Reply />}
            className={
              "!bg-[#ffffff24] !text-white !text-xs !rounded-full flex-1"
            }
            disabled
          >
            <Skeleton variant="text" width={50} />
          </Button>
          <Button
            startIcon={<CommonIcon.VerticalAlignBottom />}
            className={
              "!bg-[#ffffff24] !text-white !text-xs !rounded-full flex-1"
            }
            disabled
          >
            <Skeleton variant="text" width={50} />
          </Button>
          <IconButton disabled>
            <Skeleton variant="circular" width={24} height={24} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CvItemSkeleton;
