import { Box, Typography, Skeleton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PackageItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 rounded-md transition-all duration-500 bg-white overflow-hidden">
      {/* Link container */}
      <Link
        to="#"
        className="bg-gradient-to-tr from-primary-dark via-primary to-primary-light pt-[6px]"
      >
        <Box className="bg-neutrals-100 shadow-inner text-white flex items-center justify-center py-3 rounded-t-lg">
          <Skeleton
            variant="text"
            width="50%"
            height={30}
            sx={{
              fontSize: "1.2rem",
              backgroundColor: "var(--neutrals-200)",
            }}
          />
        </Box>
      </Link>

      {/* Content container */}
      <Box className="p-4 w-full flex flex-col gap-5">
        {/* Price */}
        <Typography
          className=""
          color="var(--primary)"
          variant="h5"
          fontSize={"30px"}
          fontWeight={600}
        >
          <Skeleton
            variant="text"
            width="80px"
            height={30}
            sx={{ backgroundColor: "var(--neutrals-200)" }}
          />
          <span className="text-sm ml-1 font-extrabold">
            <Skeleton variant="text" width="50px" height={20} />
          </span>
        </Typography>

        {/* Button */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={40}
          sx={{ borderRadius: "8px", backgroundColor: "var(--neutrals-200)" }}
        />

        {/* Description */}
        <Box className="flex flex-col gap-y-4">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <Box className="flex items-start gap-3" key={index}>
                <Skeleton
                  variant="circular"
                  width={20}
                  height={20}
                  sx={{ backgroundColor: "var(--primary-light)" }}
                />
                <Skeleton variant="text" width="80%" height={20} />
              </Box>
            ))}
        </Box>
      </Box>
    </div>
  );
};

export default PackageItemSkeleton;
