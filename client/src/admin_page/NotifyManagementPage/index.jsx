import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Typography } from "@mui/material";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Form, Formik } from "formik";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import Button from "../../ui/Button";
import { useFilters } from "../../hooks";
import { useGetNotifications } from "../../hooks/modules/notification/useGetNotifications";
import { NotificationService } from "../../services/NotificationServices";
import { useNotifications } from "../../utils/notifications";

const NotifyManagementPage = () => {
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
    () => ({ page: 1, limit: 20, sort: "desc", type: "system" }),
    []
  );
  const { filters } = useFilters(initialFilters);

  const { data, isLoading, refetch } = useGetNotifications(filters);

  const notifications = useMemo(() => data?.data?.data || [], [data]);
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
  return (
    <div>
      <BreadcrumbMui title={"Thông báo hệ thống"} breadcrumbs={breadcrumbs} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => {
          return (
            <Form className="grid grid-cols-12 gap-4 bg-white p-5 rounded-md mt-5">
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
    </div>
  );
};

export default NotifyManagementPage;
