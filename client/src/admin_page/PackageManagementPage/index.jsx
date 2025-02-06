import React from "react";
import useFilters from "../../hooks/useFilters";
import { useGetAllPackages } from "../../hooks/modules/package/useGetAllPackages";
import { Box, Typography } from "@mui/material";
import CustomTable from "../../ui/Table";
import { CommonIcon } from "../../ui";
import { useToggleDialog } from "../../hooks";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import CreateEditPackage from "./components/CreateEditPackage";
import DialogMUI from "../../components/Dialogs";

const PackageManagementPage = () => {
  const { open, shouldRender, toggle } = useToggleDialog();
  const { filters, handleChangePage } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
  });
  const { data, isLoading, refetch } = useGetAllPackages();
  const toolbarActions = [
    {
      label: <CommonIcon.Add />,
      className: "!bg-primary !shadow-none",
      onClick: toggle,
    },
  ];
  const columns = [
    {
      field: "profile",
      headerName: "Tài khoản",
      renderCell: (value) => {
        return <Typography>{value?.name}</Typography>;
      },
    },
    { field: "email", headerName: "email" },
    { field: "active", headerName: "Trạng thái" },
    {
      field: "_id",
      headerName: "",
      renderCell: (value) => {
        return (
          <Box className="flex gap-2 items-center">
            <IconButton
            // onClick={() => {
            //   navigate(`${RouteBase.HRJobs}/${value}`);
            // }}
            >
              <CommonIcon.RemoveRedEyeTwoTone className="text-primary" />
            </IconButton>
            <IconButton
            // onClick={() => {
            //   handleSetId(value);
            // }}
            >
              <CommonIcon.DriveFileRenameOutline className="text-primary-dark" />
            </IconButton>
            <IconButton
            // onClick={() => {
            //   toggleDelete(), setIdDelete(value);
            // }}
            >
              <CommonIcon.DeleteSweep className="text-red-700" />
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
          body={<CreateEditPackage toggle={toggle} refetch={refetch} />}
        />
      )}
    </div>
  );
};

export default PackageManagementPage;
