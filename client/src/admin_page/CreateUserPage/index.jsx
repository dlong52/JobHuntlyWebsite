import { Form, Formik } from "formik";
import React from "react";
import { initialValues } from "./form";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import DatePickerField from "../../components/CustomFieldsFormik/DatePickerField";
import SelectRoleField from "../../components/SelectField/SelectRoleField";
import { Box, Typography } from "@mui/material";
import SelectProvinceField from "../../components/SelectField/SelectProvinceField";
import SelectDistrictField from "../../components/SelectField/SelectDistrictField";
import SelectWardField from "../../components/SelectField/SelectWardField";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { CommonIcon } from "../../ui";

const CreateUserPage = () => {
  const handleSubmit = async () => {};
  const breadcrumbs = [
    <Link
      key="1"
      color="inherit"
      to={RouteBase.AdminOverview}
      className="text-primary"
    >
      <CommonIcon.Home fontSize="small" />
    </Link>,
    <Link
      key="1"
      color="text.primary"
      to={RouteBase.AdminUserManagement}
      sx={{ fontWeight: 500, fontSize: "14px", color: "text.primary" }}
    >
      Quản lí người dùng
    </Link>,
    <Typography
      key="3"
      color="inherit"
      sx={{ fontWeight: 500, fontSize: "14px" }}
    >
      Tuyển dụng
    </Typography>,
  ];
  return (
    <Box>
      <BreadcrumbMui breadcrumbs={breadcrumbs} title={"Thêm người dùng mới"} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => {
          const checkRole = values?.role?.label === "Nhà tuyển dụng";
          return (
            <Form className="grid grid-cols-12 gap-4 bg-white p-10 rounded-md shadow mt-5">
              <FormikField
                classNameContainer="col-span-4"
                className="bg-[#f8fafc]"
                classNameLabel="font-medium text-neutrals-100"
                name="name"
                component={InputField}
                labelTop="Họ tên"
                required
                placeholder="Nhập họ và tên"
              />
              <FormikField
                classNameContainer="col-span-4"
                className="bg-[#f8fafc]"
                classNameLabel="font-medium text-neutrals-100"
                name="email"
                required
                component={InputField}
                labelTop="Email"
                placeholder="Nhập email"
              />
              <FormikField
                classNameContainer="col-span-4"
                className="bg-[#f8fafc]"
                classNameLabel="font-medium text-neutrals-100"
                name="password"
                required
                component={InputField}
                labelTop="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
              />
              <SelectRoleField classNameContainer="col-span-4" labelTop={"Vai trò"} className="bg-[#f8fafc]" />
              <FormikField
                classNameContainer="col-span-4"
                className="bg-[#f8fafc]"
                classNameLabel="font-medium text-neutrals-100"
                name="phone_number"
                component={InputField}
                labelTop="Số điện thoại"
                placeholder="Nhập số điện thoại"
              />
              <FormikField
                classNameContainer="col-span-4"
                className="bg-[#f8fafc]"
                classNameLabel="font-medium text-neutrals-100"
                name="birthday"
                component={DatePickerField}
                labelTop="Ngày sinh"
              />
              {checkRole && (
                <Box className="col-span-12 mt-5">
                  <Typography fontSize={"20px"} fontWeight={500} n>
                    Thông tin doanh nghiệp
                  </Typography>
                  <Box className="grid grid-cols-12 gap-5 mt-4">
                    <Box className="border-b border-neutrals-40 pb-5 col-span-12 grid grid-cols-12 gap-5">
                      <FormikField
                        classNameContainer="col-span-6"
                        className="bg-[#f8fafc]"
                        classNameLabel="font-medium text-neutrals-100"
                        name="companyName"
                        component={InputField}
                        label="Tên công ty"
                        placeholder="Nhập email"
                      />
                      <FormikField
                        classNameContainer="col-span-6"
                        className="bg-[#f8fafc]"
                        classNameLabel="font-medium text-neutrals-100"
                        name="website"
                        component={InputField}
                        label="Website"
                        placeholder="Nhập website"
                      />
                    </Box>
                    <Box className="col-span-12">
                      <Box className="grid grid-cols-12 gap-5 pb-5 border-b border-neutrals-40">
                        <SelectProvinceField
                          className="bg-[#f8fafc]"
                          classNameContainer="col-span-6"
                        />
                        <SelectDistrictField
                          className="bg-[#f8fafc]"
                          classNameContainer="col-span-6"
                          provinceId={
                            values?.province?.value
                              ? values?.province.value
                              : undefined
                          }
                        />
                        <SelectWardField
                          className="bg-[#f8fafc]"
                          classNameContainer="col-span-4"
                          districtId={
                            values?.district?.value
                              ? values?.district.value
                              : undefined
                          }
                        />
                        <FormikField
                          classNameContainer="col-span-8"
                          className="bg-[#f8fafc]"
                          classNameLabel="font-medium text-neutrals-80"
                          name="additional_info"
                          disabled={values?.ward?.value ? false : true}
                          component={InputField}
                          label="Địa chỉ cụ thể"
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CreateUserPage;
