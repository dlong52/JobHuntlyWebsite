import React from "react";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Box, IconButton, Typography } from "@mui/material";
import { useConvertData, useFilters } from "../../hooks";
import { useGetAllPayments } from "../../hooks/modules/payment/useGetAllPayments";
import CustomTable from "../../ui/Table";
import TooltipMui from "../../ui/TooltipMui";
import { CommonIcon } from "../../ui";
import { excel } from "../../assets/images";
import helpers from "../../utils/helpers";
import RevenueChart from "./components/RevenueChart";
import { useGetAllPaymentSummary } from "../../hooks/modules/payment/useGetAllPaymentSummary";
import RevenueByPackageChart from "./components/RevenueByPackageChart";
import BarChartSkeleton from "../../ui/BarChartSkeleton";

const RevenueManagementPage = () => {
  const { filters } = useFilters({
    page: 1,
    limit: 10,
    // sort: "desc",
  });
  const { data, isLoading } = useGetAllPayments(filters);
  const { data: dataSummary } = useGetAllPaymentSummary();
  const { dataConvert } = useConvertData(data);
  const { dataConvert: summary } = useConvertData(dataSummary);
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
      classNameHeader: "!text-neutrals-60 !text-sm !py-3 !font-normal",
      renderCell: (value) => {
        return (
          <Box>
            <Typography className="text-neutrals-100">
              {value?.profile?.name}
            </Typography>
            <Typography fontSize={"14px"} className="text-neutrals-60">
              {value?.company?.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "amount",
      headerName: "Số tiền phải trả",
      classNameHeader: "!text-neutrals-60 !text-sm !py-3 !font-normal",
      renderCell: (value) => {
        return (
          <Typography>{Number(value).toLocaleString("vi-vn")}đ</Typography>
        );
      },
    },
    {
      field: "subscription_id",
      headerName: "Gói dịch vụ",
      classNameHeader: "!text-neutrals-60 !text-sm !py-3 !font-normal",
      renderCell: (value) => {
        return <Typography>{value?.package_id?.name}</Typography>;
      },
    },
    {
      field: "subscription_id",
      headerName: "Giá dịch vụ",
      classNameHeader: "!text-neutrals-60 !text-sm !py-3 !font-normal",
      renderCell: (value) => {
        return (
          <Typography>
            {Number(value?.package_id?.price).toLocaleString("vi-vn")}đ
          </Typography>
        );
      },
    },
    {
      field: "_id",
      headerName: "In hóa đơn",
      classNameHeader: "!text-neutrals-60 !text-sm !py-3 !font-normal",
      renderCell: (value) => {
        return (
          <IconButton>
            <CommonIcon.FileDownloadOutlined className="!text-primary" />
          </IconButton>
        );
      },
    },
  ];
  const toolbarActionLevel = [
    {
      label: (
        <TooltipMui content={"Xuất file Excel"}>
          <Box>
            <img src={excel} alt="" className="size-8" />
          </Box>
        </TooltipMui>
      ),
      className: "!bg-transparent !shadow-none !normal-case !p-0",
      onClick: () => {
        helpers.exportToExcel(dataConvert, "Invoice.xlsx");
      },
    },
  ];

  return (
    <div>
      <BreadcrumbMui title={"Doanh thu"} breadcrumbs={breadcrumbs} />
      <Box className="mt-5 grid grid-cols-12 gap-4 bg-transparent">
        <Box className="col-span-8 p-5 rounded-md bg-white ">
          {isLoading ? <BarChartSkeleton /> : <RevenueChart data={summary} />}
        </Box>
        <Box className="col-span-4 p-5 rounded-md bg-white">
          <RevenueByPackageChart />
        </Box>
        <Box className="col-span-8 px-4 bg-white rounded-md">
          <CustomTable
            classNameTitle="!text-base !font-medium"
            columns={columns}
            rows={dataConvert || []}
            loading={isLoading}
            toolbarActions={toolbarActionLevel}
            toolbarTitle="Hoá đơn"
            filters={filters}
          />
        </Box>
        <Box className="col-span-4 p-5 rounded-md bg-white">
          <Typography
            fontSize={"16px"}
            fontWeight={500}
            className="text-neutrals-100"
          >
            Đăng kí gần đây
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default RevenueManagementPage;
