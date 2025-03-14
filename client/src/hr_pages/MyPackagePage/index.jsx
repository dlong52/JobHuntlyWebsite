import React from "react";
import { bgEmptyService } from "../../assets/images";
import { Box, Typography } from "@mui/material";
import { Button } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { useGetAllSubscriptions } from "../../hooks/modules/subscription/useGetAllSubscriptions";
import useFilters from "../../hooks/useFilters";
import useConvertData from "../../hooks/useConvertData";
import { useSelector } from "react-redux";
import CustomTable from "../../ui/Table";
import helpers from "../../utils/helpers";
import ChipMui from "../../ui/Chip";
import moment from "moment";
const MyPackagePage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { filters, handleChangePage } = useFilters({
    page: 1,
    limit: 10,
    employer_id: user?.user_id,
  });
  const { data, isLoading } = useGetAllSubscriptions(filters, {
    enabled: !!user?.user_id,
  });
  const { dataConvert } = useConvertData(data);
  const columns = [
    {
      field: "package_id",
      headerName: "Dịch vụ",
      renderCell: (value) => {
        return <Box>{value?.name}</Box>;
      },
    },
    {
      field: "start_date",
      headerName: "Ngày đăng kí",
      renderCell: (value) => {
        return <Box>{moment(value).format("DD/MM/YYYY")}</Box>;
      },
    },
    {
      field: "end_date",
      headerName: "Ngày hết hạn",
      renderCell: (value) => {
        return <Box>{moment(value).format("DD/MM/YYYY")}</Box>;
      },
    },
    {
      field: "job_post_remaining",
      headerName: "Số lượng tin còn lại",
      renderCell: (value) => {
        return <Box>{value}</Box>;
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      renderCell: (value) => {
        return <ChipMui color={value ? "primary" : "default"} label={value ? "Đang hoạt động" : "Không hoạt động"}  />;
      },
    },
  ];
  const breadcrumbs = [
    <Link
      to={RouteBase.HROverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100 !text-sm">
      Dịch vụ của tôi
    </Typography>,
  ];
  return (
    <Box className="">
      <BreadcrumbMui title={"Dịch vụ của tôi"} breadcrumbs={breadcrumbs} />
      {!!data?.data?.pagination?.total > 0 ? (
        <Box className="bg-white rounded-md mt-5">
          <CustomTable
            columns={columns}
            rows={dataConvert || []}
            total={data?.data?.pagination.totalPages}
            page={filters.page}
            rowsPerPage={filters.limit || 20}
            onPageChange={handleChangePage}
            loading={isLoading}
            toolbarTitle="Dịch vụ đang chạy"
          />
        </Box>
      ) : (
        <Box className="flex items-center justify-center">
          <Box className="flex flex-col items-center gap-1">
            <img src={bgEmptyService} alt="" className="max-w-60" />
            <Typography>Bạn chưa có dịch vụ nào trong tài khoản</Typography>
            <Button
              onClick={() => {
                navigate(RouteBase.HRPackage);
              }}
              className="!bg-primary !text-white !capitalize"
            >
              Thêm dịch vụ
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MyPackagePage;
