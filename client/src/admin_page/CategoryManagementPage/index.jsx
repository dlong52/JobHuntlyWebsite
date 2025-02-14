import React from "react";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Box, IconButton, Typography } from "@mui/material";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { useGetAllCategories } from "../../hooks/modules/category/useGetAllCategories";
import useFilters from "../../hooks/useFilters";
import useConvertData from "../../hooks/useConvertData";
import { CommonIcon } from "../../ui";
import CustomTable from "../../ui/Table";
import useGetAllLevels from "../../hooks/modules/level/useGetAllLevels";

const CategoryManagementPage = () => {
  const { filters, handleChangePage } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
  });
  const { filters: filtersLevel, handleChangePage: handleChangePageLevel } =
    useFilters({
      page: 1,
      limit: 10,
      sort: "desc",
    });
  const { data, isLoading } = useGetAllCategories(filters);
  const { levels } = useGetAllLevels();
  const levelRows = levels?.data;
  const { dataConvert: categories } = useConvertData();
  const columns = [
    {
      field: "name",
      renderCell: (value) => {
        return <Typography>{value}</Typography>;
      },
    },

    {
      field: "_id",
      renderCell: (value) => {
        return (
          <Box className="flex gap-2 items-center">
            <IconButton>
              <CommonIcon.RemoveRedEyeTwoTone className="text-primary" />
            </IconButton>
            <IconButton onClick={() => {}}>
              <CommonIcon.DriveFileRenameOutline className="text-primary-dark" />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  const breadcrumbs = [
    <Link
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100 !text-sm">
      Danh mục
    </Typography>,
  ];
  console.log(data);

  return (
    <div>
      <BreadcrumbMui title={"Danh mục"} breadcrumbs={breadcrumbs} />
      <Box className="grid grid-cols-12 gap-5 mt-5">
        <Box className="col-span-8">
          <CustomTable
            columns={columns}
            rows={data?.data || []}
            total={data?.pagination.totalPages}
            page={filters.page}
            rowsPerPage={filters.limit || 20}
            onPageChange={handleChangePage}
            loading={isLoading}
            // toolbarActions={toolbarActions}
            toolbarTitle="Danh sách dịch vụ"
            filters={filters}
          />
        </Box>
        <Box className="col-span-4">
          <CustomTable
            columns={columns}
            rows={levels?.data || []}
            isHeader={false}
            // total={levels?.pagination.totalPages}
            // page={filtersLevel.page}
            // rowsPerPage={filtersLevel.limit || 20}
            // onPageChange={handleChangePageLevel}
            loading={isLoading}
            // toolbarActions={toolbarActions}
            toolbarTitle="Danh sách các cấp bậc"
            filters={filtersLevel}
          />
        </Box>
      </Box>
    </div>
  );
};

export default CategoryManagementPage;
