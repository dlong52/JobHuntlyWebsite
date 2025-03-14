import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, CommonAvatar, CommonIcon } from "../../ui";
import CustomTable from "../../ui/Table";
import { useGetAllUsers } from "../../hooks/modules/user/useGetAllUsers";
import useFilters from "../../hooks/useFilters";
import RoleChip from "../../ui/Role";
import { useToggleDialog } from "../../hooks";
import Status from "./components/Status";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import TooltipMui from "../../ui/TooltipMui";
import DialogMUI from "../../components/Dialogs";
import CreateUserForm from "./components/CreateUserForm";
import DrawerMui from "../../ui/DrawerMui";
import UserInfo from "./components/UserInfo";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import { Form, Formik } from "formik";

const UserManagementPage = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { open, toggle, shouldRender } = useToggleDialog();
  const {
    open: openUpdateStatus,
    toggle: toggleUpdateStatus,
    shouldRender: shouldRenderUpdateStatus,
  } = useToggleDialog();
  const { open: openInfo, toggle: toggleInfo } = useToggleDialog();
  const { filters, handleChangePage, setFilters } = useFilters({
    page: 1,
    limit: 10,
    order: "desc",
    searchName: "",
  });
  const { data, isLoading } = useGetAllUsers(filters);
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
                className="!text-neutrals-100"
                fontSize={"16px"}
                fontWeight={400}
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
              <TooltipMui content={"Chưa xác thực"}>
                <CommonIcon.DoNotDisturb className="text-red-700" />
              </TooltipMui>
            ) : (
              <TooltipMui content={"Đã xác thực"}>
                <CommonIcon.CheckCircle className="text-green-700" />
              </TooltipMui>
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
            <TooltipMui content={"Thông tin người dùng"}>
              <IconButton
                onClick={() => {
                  toggleInfo();
                  setUserId(value);
                }}
              >
                <CommonIcon.RemoveRedEyeTwoTone className="text-primary" />
              </IconButton>
            </TooltipMui>
            <TooltipMui content={"Cập nhật trạng thái tài khoản"}>
              <IconButton
              // onClick={() => {
              //   toggleDelete(), setIdDelete(value);
              // }}
              >
                <CommonIcon.DriveFileRenameOutline className="text-red-700" />
              </IconButton>
            </TooltipMui>
          </Box>
        );
      },
    },
  ];
  const toolbarActions = [
    {
      label: <CommonIcon.Add />,
      className: "!bg-primary !shadow-none",
      onClick: () => {
        navigate(RouteBase.AdminCreateUser);
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
      Quản lí người dùng
    </Typography>,
  ];
  useEffect(() => {
    if (!openInfo) {
      setUserId(null);
    }
  }, [openInfo]);
  const handleSubmit = (values) => {
    const search = {
      searchName: values.searchName,
    };
    setFilters((prev) => {
      return { ...prev, ...search };
    });
  };
  // Render
  return (
    <Box>
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
          toolbarTitle={
            <Formik
              initialValues={{}}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {() => {
                return (
                  <Form className="flex gap-4">
                    <FormikField
                      classNameContainer="max-w-[300px]"
                      className="bg-[#fff] "
                      sx={{
                        fieldset: {
                          borderRadius: "9999px",
                        },
                      }}
                      classNameLabel="font-medium text-neutrals-100"
                      name="searchName"
                      component={InputField}
                      size="small"
                      required
                      placeholder="Tìm theo tên, email người dùng"
                    />
                    <Button
                      type={"submit"}
                      className={
                        "col-span-12 !bg-primary !text-white !rounded-full"
                      }
                    >
                      <CommonIcon.Search />
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          }
          toolbarActions={toolbarActions}
        />
      </Box>
      {shouldRender && (
        <DialogMUI
          toggle={toggle}
          open={open}
          title={"Thêm người dùng mới"}
          body={<CreateUserForm />}
        />
      )}
      {shouldRenderUpdateStatus && (
        <DialogMUI
          toggle={toggleUpdateStatus}
          open={openUpdateStatus}
          title={"Cập nhật trạng thái tài khoản"}
          body={<CreateUserForm />}
        />
      )}
      <DrawerMui
        content={<UserInfo userId={userId} onClose={toggleInfo} />}
        onClose={toggleInfo}
        anchor={"right"}
        open={openInfo}
      />
    </Box>
  );
};

export default UserManagementPage;
