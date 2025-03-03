import { Link } from "react-router-dom";
import React from "react";
import useFilters from "../../hooks/useFilters";
import { useGetAllCompanies } from "../../hooks/modules/company/useGetCompanies";
import useConvertData from "../../hooks/useConvertData";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import CustomTable from "../../ui/Table";
import { RouteBase } from "../../constants/routeUrl";
import Address from "../../components/Address";
import ChipMui from "../../ui/Chip";
import helpers from "../../utils/helpers";
import { CommonIcon } from "../../ui";
import TooltipMui from "../../ui/TooltipMui";

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
      field: "logo",
      headerName: "Logo",
      renderCell: (value) => {
        return (
          <>
            {value ? (
              <img src={value} alt="" className="size-12" />
            ) : (
              <span className="text-xs">Chưa cập nhật</span>
            )}
          </>
        );
      },
    },
    {
      field: "name",
      headerName: "Công ty",
      renderCell: (value) => {
        return <Box className="flex items-center gap-2">{value}</Box>;
      },
    },
    {
      field: "staff_quantity",
      headerName: "Công ty",
      renderCell: (value) => {
        return (
          <Box className="flex items-center gap-2">
            {value
              ? `${helpers.convertStaffQuantity(
                  value?.min,
                  value?.max
                )} nhân viên`
              : "Chưa cập nhật"}
          </Box>
        );
      },
    },
    {
      field: "active",
      headerName: "Trạng thái",
      renderCell: (value) => {
        return (
          <ChipMui
            color={value ? "primary" : "error"}
            label={value ? "Hoạt động" : "Không hoạt động"}
          />
        );
      },
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      renderCell: (value) => {
        return (
          <Box className="flex items-center gap-2">
            <Address address={value} />
          </Box>
        );
      },
    },

    {
      field: "_id",
      headerName: "",
      renderCell: (value) => {
        return (
          <TooltipMui content={"Xem công ty"}>
            <Link
              className="text-sm text-accent-blue hover:underline font-[500]"
              to={`${RouteBase.Company}/${value}`}
            >
              <IconButton className="!text-primary hover:!bg-primary-light">
                <CommonIcon.RemoveRedEye />
              </IconButton>
            </Link>
          </TooltipMui>
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
      Quản lí doanh nghiệp
    </Typography>,
  ];
  const toolbarActions = [
    {
      label: <TextField size="small" placeholder="" />,
    },
  ];
  // Render
  return (
    <>
      <BreadcrumbMui title={"Quản lí doanh nghiệp"} breadcrumbs={breadcrumbs} />
      <Box className="bg-white rounded-md mt-5">
        <CustomTable
          columns={columns}
          filters={filters}
          loading={isLoading}
          isButton={false}
          toolbarActions={toolbarActions}
          rows={rows || []}
          total={data?.data?.pagination.totalPages}
          page={filters.page}
          rowsPerPage={filters.limit || 20}
          onPageChange={handleChangePage}
          toolbarTitle="Doanh nghiệp"
        />
      </Box>
    </>
  );
};

export default CompanyManagement;
