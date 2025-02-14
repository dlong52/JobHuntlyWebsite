import React from "react";
import useFilters from "../../hooks/useFilters";
import { useGetAllCompanies } from "../../hooks/modules/company/useGetCompanies";
import useConvertData from "../../hooks/useConvertData";
import { Box, Typography } from "@mui/material";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import CustomTable from "../../ui/Table";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { CommonAvatar } from "../../ui";

const CompanyManagement = () => {
  const { filters, handleChangePage } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
  });
  const { data, isLoading } = useGetAllCompanies(filters);
  const { dataConvert: rows } = useConvertData(data);
  const columns = [
    {
      field: "profile",
      headerName: "Tài khoản",
      renderCell: (value) => {
        return (
          <Box className="flex items-center gap-2">
            <CommonAvatar
              char={!value?.avatar_url ? value?.name?.charAt(0) : null}
              className={"border-2 border-accent-blue !bg-primary"}
              src={value?.avatar_url}
            />
            <Box>
              <Typography
                className="!text-neutrals-80"
                fontSize={"16px"}
                fontWeight={500}
              >
                {value?.name}
              </Typography>
              <Typography fontSize={"14px"} className="text-neutrals-60">
                {value?.address?.province?.name}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    { field: "email", headerName: "Email" },
    
  ];
  const breadcrumbs = [
    <Link
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100 !text-sm">
      Quản lí doanh nghiệp
    </Typography>,
  ];

  // Render
  return (
    <Box>
      <BreadcrumbMui title={"Quản lí doanh nghiệp"} breadcrumbs={breadcrumbs} />
      <Box className="bg-white rounded-md mt-5">
        <CustomTable
          columns={columns}
          filters={filters}
          loading={isLoading}
          rows={rows || []}
          total={data?.data?.pagination.totalPages}
          page={filters.page}
          rowsPerPage={filters.limit || 20}
          onPageChange={handleChangePage}
          toolbarTitle="Danh sách người dùng"
        //   toolbarActions={toolbarActions}
        />
      </Box>
    </Box>
  );
};

export default CompanyManagement;
