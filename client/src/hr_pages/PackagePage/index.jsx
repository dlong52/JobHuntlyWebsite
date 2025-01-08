import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import BreadcrumbPk from "./components/Breadcrumbs";
import PackageItem from "./components/PackageItem";

const PackagePage = () => {
  return (
    <Box className="flex flex-col gap-y-10">
      <BreadcrumbPk />
      <Box className="flex flex-col">
        <Box className="flex flex-col gap-5">
          {/* <Typography variant="h5" fontWeight={500} color="var(--neutrals-100)"><span className="text-primary">Huntly Trial</span> | Đăng tin tuyển dụng</Typography> */}
          <Grid2 container spacing={3}>
            <Grid2 size={3}>
              <PackageItem title={"Huntly Max Plus"} price={9000000} description={[null,null, null, null]} />
            </Grid2>
            <Grid2 size={3}>
              <PackageItem title={"Huntly Max"} price={7000000} description={[null,null, null, null]} />
            </Grid2>
            <Grid2 size={3}>
              <PackageItem title={"Huntly Pro"} price={5000000} description={[null,null, null, null]} />
            </Grid2>
            <Grid2 size={3}>
              <PackageItem title={"Huntly Plus"} price={3000000} description={[null,null, null, null]} />
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
};

export default PackagePage;
