import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { CommonAvatar, CommonIcon } from "../../ui";
import CustomTable from "../../ui/Table";
import { useGetAllUsers } from "../../hooks/modules/user/useGetAllUsers";
import useFilters from "../../hooks/useFilters";
import RoleChip from "../../ui/Role";
import { useToggleDialog } from "../../hooks";
import Status from "./components/Status";
import ChipMui from "../../ui/Chip";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";

const UserManagementPage = () => {
  const { open, toggle, shouldRender } = useToggleDialog();
  const { filters, handleChangePage } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
  });
  const { data, isLoading } = useGetAllUsers();
  const columns = [
    {
      field: "profile",
      headerName: "Tài khoản",
      renderCell: (value) => {
        return (
          <Box className="flex items-center gap-2">
            <CommonAvatar src={value?.avatar_url} />
            <Box>
              <Typography
                className="!text-neutrals-80"
                fontSize={"16px"}
                fontWeight={500}
              >
                {value?.name}
              </Typography>
              <Typography>{value?.address?.district?.name}</Typography>
            </Box>
          </Box>
        );
      },
    },
    { field: "email", headerName: "Email" },
    {
      field: "active",
      headerName: "Trạng thái",
      renderCell: (value) => {
        return <Status status={value} />;
      },
    },
    {
      field: "is_verified",
      headerName: "Xác thực",
      renderCell: (value) => {
        return (
          <>
            {!value ? (
              <CommonIcon.DoNotDisturb className="text-red-700" />
            ) : (
              <CommonIcon.CheckCircle className="text-green-700" />
            )}
          </>
        );
      },
    },
    {
      field: "role",
      headerName: "Vai trò",
      renderCell: (value) => {
        return <RoleChip role={value?.name} />;
      },
    },
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
  const toolbarActions = [
    {
      label: <CommonIcon.Add />,
      className: "!bg-primary !shadow-none",
      onClick: toggle,
    },
  ];
  const breadcrumbs = [
    <Link to={RouteBase.AdminOverview} className="hover:underline font-[500]">Trang chủ</Link>,
    <Typography fontWeight={500} className="text-neutrals-100">Quản lí người dùng</Typography>,
  ];
  return (
    <div>
      <BreadcrumbMui title={"Quản lí người dùng"} breadcrumbs={breadcrumbs} />
      <Box className="bg-white rounded-md mt-5">
        <CustomTable
          columns={columns}
          filters={filters}
          loading={isLoading}
          rows={data?.data?.data || []}
          total={data?.data?.pagination.totalPages}
          page={filters.page}
          rowsPerPage={filters.limit || 20}
          onPageChange={handleChangePage}
          toolbarTitle="Danh sách người dùng"
          toolbarActions={toolbarActions}
        />
      </Box>
    </div>
  );
};

export default UserManagementPage;
