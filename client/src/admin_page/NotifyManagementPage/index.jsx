import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Box, Typography } from "@mui/material";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Form, Formik } from "formik";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import Button from "../../ui/Button";
import { useConvertData, useFilters, useToggleDialog } from "../../hooks";
import { useGetNotifications } from "../../hooks/modules/notification/useGetNotifications";
import { NotificationService } from "../../services/NotificationServices";
import { useNotifications } from "../../utils/notifications";
import TableMui from "../../ui/TableMui";
import ChipMui from "../../ui/Chip";
import TooltipMui from "../../ui/TooltipMui";
import { CommonIcon } from "../../ui";
import { useSelector } from "react-redux";
import moment from "moment";
import DialogMUI from "../../components/Dialogs";

const NotifyManagementPage = () => {
  const { user_id } = useSelector((state) => state.user);
  const { open, shouldRender, toggle } = useToggleDialog();
  const { showSuccess, showError } = useNotifications();
  const breadcrumbs = [
    <Link
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100 !text-sm">
      Thông báo
    </Typography>,
  ];
  const initialFilters = useMemo(
    () => ({ page: 1, limit: 20, type: "system", user_id: user_id }),
    {}
  );
  const { filters } = useFilters(initialFilters);

  const { data, isLoading } = useGetNotifications(filters);
  const { dataConvert } = useConvertData(data);

  const handleSubmit = async (values) => {
    try {
      NotificationService.sendToAll(values);
      showSuccess("Gửi thông báo thành công!");
    } catch (error) {
      showError(error);
    }
  };
  const initialValues = {
    title: "",
    body: "",
    type: "system",
  };
  const columns = [
    {
      field: "name",
      headerName: "Tiêu đề",
      renderCell: (value) => {
        return <Box className="flex items-center gap-5">{value?.title}</Box>;
      },
    },
    {
      field: "name",
      headerName: "Nội dung",
      renderCell: (value) => {
        return (
          <Box className="flex items-center gap-5">
            <Typography>{value?.body}</Typography>
          </Box>
        );
      },
    },
    {
      field: "active",
      headerName: "Loại thông báo",
      renderCell: (value) => {
        return <ChipMui color={"info"} label={"Hệ thống"} />;
      },
    },
    {
      field: "_id",
      headerName: "Thời gian",
      renderCell: (value) => {
        return (
          <Box className="flex gap-2 items-center text-nowrap">
            {moment(value?.created_at).format("HH:mm DD/MM/YYYY")}
          </Box>
        );
      },
    },
  ];
  const toolbarActions = [
    {
      label: (
        <TooltipMui content={"Thêm chủ đề"}>
          <CommonIcon.Add />
        </TooltipMui>
      ),
      className: "!bg-primary !shadow-none",
      onClick: toggle,
    },
  ];
  return (
    <Box>
      <BreadcrumbMui title={"Thông báo hệ thống"} breadcrumbs={breadcrumbs} />
      <Box className="mt-5">
        <TableMui
          columns={columns}
          rows={dataConvert || []}
          total={data?.data?.pagination.totalPages}
          loading={isLoading}
          toolbarActions={toolbarActions}
          toolbarTitle="Danh sách thông báo hệ thống"
        />
      </Box>
      {shouldRender && (
        <DialogMUI
          body={
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {() => {
                return (
                  <Form className="grid grid-cols-12 gap-4 bg-white min-w-[450px] rounded-md">
                    <FormikField
                      classNameContainer="col-span-12"
                      className="bg-[#f8fafc]"
                      classNameLabel="font-medium text-neutrals-100"
                      name="title"
                      component={InputField}
                      labelTop="Tiêu đề"
                      required
                      placeholder="Nhập tiêu đề thông báo"
                    />
                    <FormikField
                      classNameContainer="col-span-12"
                      className="bg-[#f8fafc]"
                      classNameLabel="font-medium text-neutrals-100"
                      name="body"
                      rows={5}
                      multiline
                      component={InputField}
                      labelTop="Thông điệp"
                      placeholder="Nhập thông điệp thông báo"
                    />
                    <Button
                      type={"submit"}
                      size={"large"}
                      className={"col-span-12 !bg-primary !text-white"}
                    >
                      Gửi
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          }
          open={open}
          toggle={toggle}
          title={"Gửi thông báo hệ thống"}
        />
      )}
    </Box>
  );
};

export default NotifyManagementPage;
