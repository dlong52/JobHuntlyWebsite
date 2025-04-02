import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, CommonAvatar, CommonIcon } from "../../ui";
import { useGetAllUsers } from "../../hooks/modules/user/useGetAllUsers";
import useFilters from "../../hooks/useFilters";
import RoleChip from "../../ui/Role";
import { useToggleDialog } from "../../hooks";
import Status from "./components/Status";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import TooltipMui from "../../ui/TooltipMui";
import DialogMUI from "../../components/Dialogs";
import CreateUserForm from "./components/CreateUserForm";
import DrawerMui from "../../ui/DrawerMui";
import UserInfo from "./components/UserInfo";
import {
  CheckboxField,
  FormikField,
  InputField,
} from "../../components/CustomFieldsFormik";
import { Form, Formik } from "formik";
import TableMui from "../../ui/TableMui";
import UpdateStatus from "./components/UpdateStatus";
import { ROLE } from "../../constants/enum";
import Unlock from "./components/Unlock";
import { Google, search } from "../../assets/images";
import SelectRoleField from "../../components/SelectField/SelectRoleField";
import SelectAccountTypeField from "../../components/SelectField/SelectAccountTypeField";

const UserManagementPage = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { open, toggle, shouldRender } = useToggleDialog();
  const {
    open: openUpdateStatus,
    toggle: toggleUpdateStatus,
    shouldRender: shouldRenderUpdateStatus,
  } = useToggleDialog();
  const {
    open: openUnlock,
    toggle: toggleUnlock,
    shouldRender: shouldRenderUnlock,
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
              char={
                !value?.profile?.avatar_url
                  ? value?.profile?.name?.charAt(0)
                  : null
              }
              // className={"border-2 border-accent-blue !bg-primary"}
              src={value?.profile?.avatar_url}
            />
            <Box>
              <Typography
                className="!text-neutrals-100"
                fontSize={"16px"}
                fontWeight={400}
              >
                {value?.profile?.name}
              </Typography>
              <Typography fontSize={"14px"} className="text-neutrals-60">
                {value?.email}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "address",
      headerName: "Phương thức",
      renderCell: (value) => {
        return (
          <Box>
            {value?.account_type === "default" ? (
              <TooltipMui content={"Đăng kí mặc định"}>
                <CommonIcon.AccountCircle className="!text-neutrals-80" />
              </TooltipMui>
            ) : (
              <TooltipMui content={"Đăng kí bằng google"}>
                <img src={Google} alt="" className="size-6" />
              </TooltipMui>
            )}
          </Box>
        );
      },
    },
    {
      field: "active",
      headerName: "Trạng thái",
      renderCell: (value) => {
        return <Status status={value.active} />;
      },
    },
    {
      field: "is_verified",
      headerName: "Xác thực",
      renderCell: (value) => {
        return (
          <>
            {!value?.is_verified ? (
              <TooltipMui content={"Chưa xác thực"}>
                <CommonIcon.Verified className="text-gray-500" />
              </TooltipMui>
            ) : (
              <TooltipMui content={"Đã xác thực"}>
                <CommonIcon.Verified className="text-green-700" />
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
        return <RoleChip role={value?.role?.name} />;
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
                  setUserId(value?._id);
                }}
              >
                <CommonIcon.RemoveRedEyeTwoTone className="text-primary" />
              </IconButton>
            </TooltipMui>
            {value?.active ? (
              <TooltipMui content={"Khóa tài khoản"}>
                <IconButton
                  onClick={() => {
                    if (value?.role?.name === ROLE.ADMIN) {
                      return;
                    }
                    toggleUpdateStatus();
                    setUserId(value?._id);
                  }}
                  disabled={value?.role?.name === ROLE.ADMIN ? true : false}
                >
                  <CommonIcon.LockPerson
                    className={`text-accent-red ${
                      value?.role?.name === ROLE.ADMIN ? "opacity-45" : ""
                    }`}
                  />
                </IconButton>
              </TooltipMui>
            ) : (
              <TooltipMui content={"Mở khóa tài khoản"}>
                <IconButton
                  onClick={() => {
                    if (value?.role?.name === ROLE.ADMIN) {
                      return;
                    }
                    toggleUnlock();
                    setUserId(value?._id);
                  }}
                  disabled={value?.role?.name === ROLE.ADMIN ? true : false}
                >
                  <CommonIcon.LockOpen
                    className={`text-accent-green ${
                      value?.role?.name === ROLE.ADMIN ? "opacity-45" : ""
                    }`}
                  />
                </IconButton>
              </TooltipMui>
            )}
          </Box>
        );
      },
    },
  ];
  const toolbarActions = [
    {
      label: <CommonIcon.PersonAdd />,
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
    if (!openInfo && !openUpdateStatus && !openUnlock) {
      setUserId(null);
    }
  }, [openInfo, openUpdateStatus, openUnlock]);
  // Render
  return (
    <Box>
      <BreadcrumbMui title={"Quản lí người dùng"} breadcrumbs={breadcrumbs} />
      <Box className="mt-5 p-3 bg-white rounded-md">
        <Formik
          initialValues={{ searchName: filters.searchName || "" }}
          enableReinitialize={true}
          onSubmit={(values) => {
            setFilters({
              ...filters,
              searchName: values.searchName,
              role: values?.role?.value,
              account_type: values?.account_type?.value,
              active: values?.active,
              is_verified: values?.is_verified,
            });
          }}
        >
          {({}) => (
            <Form className="grid grid-cols-12 gap-2">
              <FormikField
                classNameContainer="col-span-4"
                sx={{
                  fieldset: {
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "14px",
                    fontStyle: "italic",
                  },
                }}
                name="searchName"
                placeholder="Tìm theo tên, email người dùng..."
                component={InputField}
              />
              <SelectAccountTypeField
                classNameContainer="col-span-3"
                sx={{
                  fieldset: {
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "14px",
                    fontStyle: "italic",
                  },
                }}
              />
              <SelectRoleField
                classNameContainer="col-span-3"
                sx={{
                  fieldset: {
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "14px",
                    fontStyle: "italic",
                  },
                }}
              />
              <Button
                type={"submit"}
                className={
                  "!bg-primary !col-span-2  !text-white !normal-case !rounded-[10px]"
                }
              >
                <img src={search} className="size-6" alt="" />
              </Button>
              <Box className="col-span-4 flex items-center gap-2">
                <FormikField
                  classNameContainer="w-fit"
                  classNameLabel="text-sm font-medium"
                  name="active"
                  activeColor="var(--primary)"
                  labelTop="Trạng thái"
                  component={CheckboxField}
                />
                <FormikField
                  classNameContainer="w-fit"
                  classNameLabel="text-sm font-medium"
                  name="is_verified"
                  activeColor="var(--primary)"
                  labelTop="Xác thực"
                  component={CheckboxField}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Box className="bg-white rounded-md mt-5">
        <TableMui
          columns={columns}
          filters={filters}
          loading={isLoading}
          rows={data?.data?.data || []}
          total={data?.data?.pagination.totalPages}
          page={filters.page}
          rowsPerPage={filters.limit || 20}
          onPageChange={handleChangePage}
          toolbarTitle={"Danh sách người dùng"}
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
          title={"Khóa tài khoản"}
          body={<UpdateStatus id={userId} />}
        />
      )}
      {shouldRenderUnlock && (
        <DialogMUI
          toggle={toggleUnlock}
          open={openUnlock}
          title={"Mở khóa tài khoản"}
          body={<Unlock id={userId} />}
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
