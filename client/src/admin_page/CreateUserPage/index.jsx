import { Form, Formik } from "formik";
import React from "react";
import { initialValues, validationSchema } from "./form";
import {
  CkEditerField,
  FormikField,
  InputField,
} from "../../components/CustomFieldsFormik";
import DatePickerField from "../../components/CustomFieldsFormik/DatePickerField";
import SelectRoleField from "../../components/SelectField/SelectRoleField";
import { Box, Button, Typography } from "@mui/material";
import SelectProvinceField from "../../components/SelectField/SelectProvinceField";
import SelectDistrictField from "../../components/SelectField/SelectDistrictField";
import SelectWardField from "../../components/SelectField/SelectWardField";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { createUser } from "../../services/UserServices";
import { useNotifications } from "../../utils/notifications";
import SelectCategoryField from "../../components/SelectField/SelectCategoryField";
import { useSelector } from "react-redux";

const CreateUserPage = () => {
  const { user_id } = useSelector((state) => state.user);
  const { showError, showSuccess } = useNotifications();
  const handleSubmit = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
      profile: {
        name: values.name,
        birthday: values.birthday,
        phone_number: values.phone_number,
      },
      role: values.role.value,
      companyName: values.companyName,
      website: values?.website,
      description: values?.description,
      categories: [values?.categories?.value],
      staff_quantity: {
        min: values.min_staff,
        max: values.max_staff,
      },
      created_by: user_id,
    };
    try {
      await createUser(payload);
      showSuccess("Thêm người dùng mới thành công!");
    } catch (error) {
      showError(error?.response?.data?.message);
    }
  };
  const breadcrumbs = [
    <Link
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Link
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Quản lí người dùng
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100 !text-sm">
      Thêm người dùng mới
    </Typography>,
  ];
  return (
    <Box>
      <BreadcrumbMui breadcrumbs={breadcrumbs} title={"Thêm người dùng mới"} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
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
              <SelectRoleField
                classNameContainer="col-span-4"
                labelTop={"Vai trò"}
                className="bg-[#f8fafc]"
              />
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
                        classNameContainer="col-span-12"
                        className="bg-[#f8fafc]"
                        classNameLabel="font-medium text-neutrals-100"
                        name="companyName"
                        required
                        component={InputField}
                        label="Tên công ty (*)"
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
                      <SelectCategoryField />
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
                    <Box className="col-span-12 flex flex-col gap-2">
                      <Typography
                        fontWeight={500}
                        fontSize={"14px"}
                        className="text-neutrals-100"
                      >
                        Số lượng nhân viên
                      </Typography>
                      <Box className="flex gap-4">
                        <FormikField
                          name="min_staff"
                          className="bg-[#f8fafc]"
                          component={InputField}
                          type="number"
                          label="Tối thiểu"
                        />
                        <FormikField
                          name="max_staff"
                          className="bg-[#f8fafc]"
                          component={InputField}
                          type="number"
                          label="Tối đa"
                        />
                      </Box>
                    </Box>
                    <FormikField
                      classNameContainer="col-span-12"
                      name="introduce"
                      className="bg-[#f8fafc]"
                      component={CkEditerField} // Sử dụng CKEditor làm component
                      label="Giới thiệu về công ty"
                      classNameLabel="font-medium text-sm text-neutrals-100"
                    />
                  </Box>
                </Box>
              )}
              <Button
                type="submit"
                size="large"
                className="col-span-12 !bg-primary !text-white"
              >
                Lưu lại
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CreateUserPage;
