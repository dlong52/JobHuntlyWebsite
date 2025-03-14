import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import PackageItem from "./components/PackageItem";
import useFilters from "../../hooks/useFilters";
import { useGetAllPackages } from "../../hooks/modules/package/useGetAllPackages";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import PackageItemSkeleton from "./components/PackageItemSkeleton";
import useConvertData from "../../hooks/useConvertData";

const PackagePage = () => {
  const { filters } = useFilters({
    sort: "desc",
    sortBy: "price",
    active: true,
  });
  const { data, isLoading } = useGetAllPackages(filters);
  const { dataConvert: packages } = useConvertData(data);

  const breadcrumbs = [
    <Link
      to={RouteBase.HROverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100 !text-sm">
      Mua dịch vụ
    </Typography>,
  ];

  return (
    <Box className="flex flex-col gap-y-10">
      <BreadcrumbMui title={"Mua dịch vụ"} breadcrumbs={breadcrumbs} />
      <Box className="flex flex-col">
        <Box className="flex flex-col gap-5">
          {!isLoading ? (
            packages?.length > 0 ? (
              <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {packages?.map((item) => {
                  return (
                    <Box key={item?._id} size={3}>
                      <PackageItem
                        id={item?._id}
                        title={item?.name}
                        price={item?.price}
                        features={item?.features}
                      />
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Typography variant="h6" color="textSecondary">
                Không có gói dịch vụ nào.
              </Typography>
            )
          ) : (
            <Grid2 container spacing={3}>
              {Array(4)
                .fill(null)
                ?.map((item, index) => {
                  return (
                    <Grid2 key={index} size={3}>
                      <PackageItemSkeleton />
                    </Grid2>
                  );
                })}
            </Grid2>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PackagePage;
