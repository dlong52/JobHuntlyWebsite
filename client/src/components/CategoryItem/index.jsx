import React from "react";
import { CommonIcon } from "../../ui";
import { Skeleton } from "@mui/material";
const CategoryItem = ({ data, loading }) => {
  if (loading) {
    return <Skeleton variant="rectangular" height="160px" width="100%" />;
  }
  return (
    <div className="p-5 flex flex-col gap-6 group hover:bg-primary transition-all duration-500">
      <div className="">
        <img
          src={data?.icon}
          alt=""
          className="size-[35px] group-hover:filter group-hover:brightness-0 group-hover:invert"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-semibold font-ClashDisplay text-lg text-neutrals-100 group-hover:text-white">
          {data?.name}
        </div>
        <div className="font-Epilogue text-[15px] text-neutrals-60 flex gap-4 group-hover:text-white">
          <span className="">{data?.job_count} công việc có sẵn </span>
          <CommonIcon.EastRounded />
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
