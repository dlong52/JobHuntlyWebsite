import React from "react";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Box, IconButton, Typography } from "@mui/material";
import { useConvertData, useFilters } from "../../hooks";
import { useGetAllPayments } from "../../hooks/modules/payment/useGetAllPayments";
import TooltipMui from "../../ui/TooltipMui";
import { CommonIcon } from "../../ui";
import RevenueChart from "./components/RevenueChart";
import { useGetAllPaymentSummary } from "../../hooks/modules/payment/useGetAllPaymentSummary";
import RevenueByPackageChart from "./components/RevenueByPackageChart";
import BarChartSkeleton from "../../ui/BarChartSkeleton";
import { useGetAllSubscriptions } from "../../hooks/modules/subscription/useGetAllSubscriptions";
import TableMui from "../../ui/TableMui";

const RevenueManagementPage = () => {
  const { filters, handleChangePage } = useFilters({
    page: 1,
    limit: 5,
    order: "desc",
  });
  const navigate = useNavigate();
  const { filters: filtersSubscription } = useFilters({
    page: 1,
    limit: 5,
  });
  const { data: dataSubscription, isLoading: loadingSubscription } =
    useGetAllSubscriptions(filtersSubscription);
  const { dataConvert: subscriptions } = useConvertData(dataSubscription);
  const { data: dataSummary } = useGetAllPaymentSummary();
  const { data, isLoading } = useGetAllPayments(filters);
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
              {value?.user_id?.profile?.name}
            </Typography>
            <Link
              to={`${RouteBase.Company}/${value?.user_id?.company?._id}`}
              fontSize={"14px"}
              className="text-neutrals-60"
            >
              {value?.user_id?.company?.name}
            </Link>
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
          <Typography>
            {Number(value?.amount).toLocaleString("vi-vn")}đ
          </Typography>
        );
      },
    },
    {
      field: "subscription_id",
      headerName: "Gói dịch vụ",
      classNameHeader: "!text-neutrals-60 !text-sm !py-3 !font-normal",
      renderCell: (value) => {
        return (
          <Typography>{value?.subscription_id?.package_id?.name}</Typography>
        );
      },
    },

    {
      field: "_id",
      headerName: "Chi tiết",
      classNameHeader: "!text-neutrals-60 !text-sm !py-3 !font-normal",
      renderCell: (value) => {
        return (
          <IconButton
            onClick={() =>
              navigate(
                `${RouteBase.AdminRevenueManagement}/details/${value?._id}`
              )
            }
          >
            <CommonIcon.Info className="!text-primary" />
          </IconButton>
        );
      },
    },
  ];
  const toolbarActionLevel = [
    {
      label: (
        <TooltipMui content={"Xem tất cả"}>
          <CommonIcon.ArrowForwardRounded />
        </TooltipMui>
      ),
      className: "!bg-primary-light !text-primary !shadow-none !normal-case",
      onClick: () => {
        navigate(`${RouteBase.AdminRevenueManagement}/details`);
      },
    },
  ];

  return (
    <Box>
      <BreadcrumbMui title={"Doanh thu"} breadcrumbs={breadcrumbs} />
      <Box className="mt-5 grid grid-cols-12 gap-4 bg-transparent">
        <Box className="col-span-8 p-5 rounded-md bg-white ">
          {isLoading ? <BarChartSkeleton /> : <RevenueChart data={summary} />}
        </Box>
        <Box className="col-span-4 p-5 rounded-md bg-white">
          <RevenueByPackageChart />
        </Box>
        <Box className="col-span-8 bg-white rounded-md">
          <TableMui
            classNameTitle="!text-base !font-medium"
            columns={columns}
            rows={dataConvert || []}
            loading={isLoading}
            toolbarActions={toolbarActionLevel}
            toolbarTitle="Hoá đơn"
            filters={filters}
            total={data?.data?.pagination?.totalPages}
            page={filters?.page}
            rowsPerPage={filters.limit || 5}
            onPageChange={handleChangePage}
          />
        </Box>
        <Box className="col-span-4 p-5 h-fit rounded-md bg-white">
          <Typography
            fontSize={"16px"}
            fontWeight={500}
            className="text-neutrals-100"
          >
            Đăng kí gần đây
          </Typography>
          <Box className="flex flex-col gap-3 mt-5">
            {subscriptions?.map((item) => {
              return (
                <Box
                  key={item?._id}
                  className="flex items-center justify-between py-4 border-b"
                >
                  <Typography>{item?.employer_id?.profile?.name}</Typography>
                  <Typography>{item?.package_id?.name}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RevenueManagementPage;
