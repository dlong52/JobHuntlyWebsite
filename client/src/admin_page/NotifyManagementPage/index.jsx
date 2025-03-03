import React from "react";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Typography } from "@mui/material";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Form, Formik } from "formik";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import Button from "../../ui/Button";

const NotifyManagementPage = () => {
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
  const handleSubmit = async () => {
    try {
    } catch (error) {}
  };
  const initialValues = {

  }
  return (
    <div>
      <BreadcrumbMui title={"Thông báo"} breadcrumbs={breadcrumbs} />
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
