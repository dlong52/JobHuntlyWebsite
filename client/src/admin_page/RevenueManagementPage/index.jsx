import React from "react";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Box, IconButton, Typography } from "@mui/material";
import { useConvertData, useFilters } from "../../hooks";
import { useGetAllPayments } from "../../hooks/modules/payment/useGetAllPayments";
import CustomTable from "../../ui/Table";
import ChipMui from "../../ui/Chip";
import TooltipMui from "../../ui/TooltipMui";
import { CommonIcon } from "../../ui";

const RevenueManagementPage = () => {
  const { filters } = useFilters({
    page: 1,
    limit: 10,
    // sort: "desc",
  });
  const { data, isLoading } = useGetAllPayments(filters);
  const { dataConvert } = useConvertData(data);
  const breadcrumbs = [
    <Link
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100 !text-sm">
      Doanh thu
    </Typography>,
  ];
  const columns = [
    {
      field: "user_id",
      headerName: "Khách hàng",
      renderCell: (value) => {
        return (
          <Box>
            <Typography>{value?.profile?.name}</Typography>
            <Typography>{value?.company?.name}</Typography>
          </Box>
        );
      },
    },
    {
      field: "amount",
      headerName: "Giá",
      renderCell: (value) => {
        return (
          <ChipMui
            color={value ? "primary" : "error"}
            label={value ? "Đang hoạt động" : "Không hoạt động"}
          />
        );
      },
    },
    {
      field: "_id",
      renderCell: (value) => {
        return (
          <Box className="flex gap-2 items-center">
            <TooltipMui content={"Cập nhật cấp bậc"}>
              <IconButton
                onClick={() => {
                  // handleSetIdLevel(value);
                }}
              >
                <CommonIcon.DriveFileRenameOutline className="text-primary-dark" />
              </IconButton>
            </TooltipMui>
          </Box>
        );
      },
    },
  ];
  const toolbarActionLevel = [
    {
      label: (
        <TooltipMui content={"Thêm cấp bậc mới"}>
          <CommonIcon.Add />
        </TooltipMui>
      ),
      className: "!bg-primary !shadow-none",
      onClick: () => {
        // toggleLevel();
      },
    },
  ];
  return (
    <div>
      <BreadcrumbMui title={"Doanh thu"} breadcrumbs={breadcrumbs} />
      <Box className="mt-5">
        <CustomTable
          columns={columns}
          rows={dataConvert || []}
          loading={isLoading}
          toolbarActions={toolbarActionLevel}
          toolbarTitle="Hoá đơn"
          filters={filters}
        />
      </Box>
    </div>
  );
};

export default RevenueManagementPage;
