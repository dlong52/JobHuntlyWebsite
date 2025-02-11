import { Form, Formik } from "formik";
import React from "react";
import { initialValues } from "./form";
import {
  FormikField,
  InputField,
} from "../../../../components/CustomFieldsFormik";
import DatePickerField from "../../../../components/CustomFieldsFormik/DatePickerField";
import SelectRoleField from "../../../../components/SelectField/SelectRoleField";
import { Box, Typography } from "@mui/material";
import SelectProvinceField from "../../../../components/SelectField/SelectProvinceField";
import SelectDistrictField from "../../../../components/SelectField/SelectDistrictField";
import SelectWardField from "../../../../components/SelectField/SelectWardField";

const CreateUserForm = () => {
  const handleSubmit = async () => {};
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => {
        return (
          <Form className="grid grid-cols-12 gap-4 w-[900px]">
            <FormikField
              classNameContainer="col-span-6"
              className="bg-[#f8fafc]"
              classNameLabel="font-medium text-neutrals-100"
              name="name"
              component={InputField}
              labelTop="Họ tên"
              required
              placeholder="Nhập họ và tên"
            />
            <FormikField
              classNameContainer="col-span-6"
              className="bg-[#f8fafc]"
              classNameLabel="font-medium text-neutrals-100"
              name="email"
              required
              component={InputField}
              labelTop="Email"
              placeholder="Nhập email"
            />
            <FormikField
              classNameContainer="col-span-6"
              className="bg-[#f8fafc]"
              classNameLabel="font-medium text-neutrals-100"
              name="password"
              required
              component={InputField}
              labelTop="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
            />
            <SelectRoleField labelTop={"Vai trò"} className="bg-[#f8fafc]" />
            <FormikField
              classNameContainer="col-span-6"
              className="bg-[#f8fafc]"
              classNameLabel="font-medium text-neutrals-100"
              name="phone_number"
              component={InputField}
              labelTop="Số điện thoại"
              placeholder="Nhập số điện thoại"
            />
            <FormikField
              classNameContainer="col-span-6"
              className="bg-[#f8fafc]"
              classNameLabel="font-medium text-neutrals-100"
              name="birthday"
              component={DatePickerField}
              labelTop="Ngày sinh"
            />
            <Box className="col-span-12 mt-5">
              <Typography fontSize={"20px"} fontWeight={500} n>
                Thông tin doanh nghiệp
              </Typography>
              <Box className="grid grid-cols-12 gap-5 mt-4">
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
                  name="email"
                  component={InputField}
                  label="Email"
                  placeholder="Nhập email"
                />
                <SelectProvinceField classNameContainer="col-span-4" />
                <SelectDistrictField
                  classNameContainer="col-span-4"
                  provinceId={
                    values?.province?.value ? values?.province.value : undefined
                  }
                />
                <SelectWardField
                  classNameContainer="col-span-4"
                  districtId={
                    values?.district?.value ? values?.district.value : undefined
                  }
                />
                <FormikField
                  classNameContainer="col-span-12"
                  classNameLabel="font-medium text-neutrals-80"
                  name="additional_info"
                  disabled={values?.ward?.value ? false : true}
                  component={InputField}
                  label="Địa chỉ cụ thể"
                />
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateUserForm;
