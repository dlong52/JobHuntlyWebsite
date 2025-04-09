import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import { useConvertData, useFilters } from "../../hooks";
import { useGetAllPackages } from "../../hooks/modules/package/useGetAllPackages";
import PackageItem from "../../hr_pages/PackagePage/components/PackageItem";
import PackageItemSkeleton from "../../hr_pages/PackagePage/components/PackageItemSkeleton";

const ServicesRequire = () => {
  const { filters } = useFilters({
    sort: "desc",
    sortBy: "price",
    active: true,
  });
  const { data, isLoading } = useGetAllPackages(filters);
  const { dataConvert: packages } = useConvertData(data);
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center">
      <Box className="size-fit flex flex-col items-center">
        <Typography
          fontWeight={600}
          fontSize={"30px"}
          className="text-center text-[24px] font-bold"
        >
          Tính năng cao cấp
        </Typography>
        <Typography fontSize={"14px"} className="text-center !text-neutrals-80 w-4/5">
          Để sử dụng tính năng này, bạn cần nâng cấp gói dịch vụ của mình. Hãy
          đăng kí dịch vụ để có trải nghiệm tuyển dụng hiệu quả nhất trên
          JobHuntly.
        </Typography>
      </Box>
      <Container className="mt-10">
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
                        code={item?.package_code}
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
                ?.map((_, index) => {
                  return (
                    <Grid2 key={index} size={3}>
                      <PackageItemSkeleton />
                    </Grid2>
                  );
                })}
            </Grid2>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default ServicesRequire;
