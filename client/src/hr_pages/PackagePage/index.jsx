import { Box, Grid2, Typography } from "@mui/material";
import React, { useMemo } from "react";
import PackageItem from "./components/PackageItem";
import useFilters from "../../hooks/useFilters";
import { useGetAllPackages } from "../../hooks/modules/package/useGetAllPackages";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";

const PackagePage = () => {
  const { filters } = useFilters({
    sort: "desc",
    sortBy: "price",
    active: true,
  });
  const { data, isLoading } = useGetAllPackages(filters);
  const packages = useMemo(() => {
    if (data) {
      return data?.data?.data;
    }
    return [];
  }, [data]);
  const breadcrumbs = [
    <Link
      to={RouteBase.AdminOverview}
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
          <Grid2 container spacing={3}>
            {packages?.map((item) => {
              return (
                <Grid2 key={item?._id} size={3}>
                  <PackageItem
                    id={item?._id}
                    title={item?.name}
                    price={item?.price}
                    description={[null, null, null, null]}
                  />
                </Grid2>
              );
            })}
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
};

export default PackagePage;
