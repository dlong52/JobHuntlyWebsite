import React, { useEffect, useState } from "react";
import useFilters from "../../hooks/useFilters";
import { useGetAllPackages } from "../../hooks/modules/package/useGetAllPackages";
import { Box, IconButton, Typography } from "@mui/material";
import CustomTable from "../../ui/Table";
import { CommonIcon } from "../../ui";
import { useToggleDialog } from "../../hooks";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import CreateEditPackage from "./components/CreateEditPackage";
import DialogMUI from "../../components/Dialogs";
import helpers from "../../utils/helpers";
import ChipMui from "../../ui/Chip";

const PackageManagementPage = () => {
  const [idPackage, setIdPackage] = useState();
  const { open, shouldRender, toggle } = useToggleDialog();
  const { filters, handleChangePage } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
  });
  const { data, isLoading, refetch } = useGetAllPackages(filters);
  const toolbarActions = [
    {
      label: <CommonIcon.Add />,
      className: "!bg-primary !shadow-none",
      onClick: toggle,
    },
  ];
  const handleSetId = (id) => {
    setIdPackage(id);
    toggle();
  };
  const columns = [
    {
      field: "name",
      headerName: "Tên dịch vụ",
      renderCell: (value) => {
        return <Typography>{value}</Typography>;
      },
    },
    {
      field: "price",
      headerName: "Giá",
      renderCell: (value) => {
        return <Typography>{helpers.numberFormat(value)} đồng</Typography>;
      },
    },
    {
      field: "active",
      headerName: "Trạng thái",
      renderCell: (value) => {
        return (
          <ChipMui
            color={value ? "success" : "error"}
            label={value ? "Đang hoạt động" : "Không hoạt động"}
            variant={"outlined"}
          />
        );
      },
    },
    {
      field: "job_post_limit",
      headerName: "Giới hạn tin",
      renderCell: (value) => {
        return <Typography>{value} tin</Typography>;
      },
    },
    {
      field: "duration_in_days",
      headerName: "Thời gian hiệu lực",
      renderCell: (value) => {
        return <Typography>{value} ngày</Typography>;
      },
    },
    {
      field: "_id",
      headerName: "",
      renderCell: (value) => {
        return (
          <Box className="flex gap-2 items-center">
            <IconButton>
              <CommonIcon.RemoveRedEyeTwoTone className="text-primary" />
            </IconButton>
            <IconButton
              onClick={() => {
                handleSetId(value);
              }}
            >
              <CommonIcon.DriveFileRenameOutline className="text-primary-dark" />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  const breadcrumbs = [
    <Link to={RouteBase.AdminOverview} className="hover:underline font-[500]">
      Trang chủ
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100">
      Quản lí gói dịch vụ
    </Typography>,
  ];
  useEffect(() => {
    if (!open) {
      setIdPackage(null);
    }
  }, [open]);
  return (
    <div>
      <BreadcrumbMui title={"Dịch vụ"} breadcrumbs={breadcrumbs} />
      <Box className="bg-white rounded-md mt-5">
        <CustomTable
          columns={columns}
          rows={data?.data?.data || []}
          total={data?.data?.pagination.totalPages}
          page={filters.page}
          rowsPerPage={filters.limit || 20}
          onPageChange={handleChangePage}
          loading={isLoading}
          toolbarActions={toolbarActions}
          toolbarTitle="Danh sách dịch vụ"
          filters={filters}
        />
      </Box>
      {shouldRender && (
        <DialogMUI
          isPadding={false}
          title={"Thêm gói dịch vụ mới"}
          disableScrollLock={true}
          className="w-fit"
          open={open}
          toggle={toggle}
          body={
            <CreateEditPackage
              id={idPackage}
              toggle={toggle}
              refetch={refetch}
            />
          }
        />
      )}
    </div>
  );
};

export default PackageManagementPage;
