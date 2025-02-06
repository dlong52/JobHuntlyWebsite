import { Box, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useMemo } from "react";
import {
  AutocompleteField,
  FormikField,
  GenderField,
  InputField,
  RadioField,
} from "../../../../components/CustomFieldsFormik";
import { Button, CommonIcon } from "../../../../ui";
import { useAddress } from "../../../../hooks";
import { initialValues, validationSchema } from "../../forms";
import { genderOptions, ROLE } from "../../../../constants/enum";
import { useNotifications } from "../../../../utils/notifications";
import { signUp } from "@/services/AuthServices";
import { useNavigate } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";

const SignUpHrForm = () => {
  const { provinces, districts, fetchDistricts } = useAddress();
  const { showError, showSuccess } = useNotifications();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      companyName: values.companyName,
      gender: values.gender,
      province: {
        id: values?.province?.value,
        name: values?.province?.label,
      },
      district: { id: values?.district?.value, name: values?.district?.label },
      phoneNumber: values.phoneNumber,
      role: ROLE.EMPLOYER,
    };
    try {
      const res = await signUp(body);
      if (res?.status === "success") {
        showSuccess(res?.message);
        navigate(RouteBase.SignIn);
        return;
      }
      showError(res?.message);
    } catch (error) {
      showError(error?.message);
    }
  };
  const provinceOptions = useMemo(() => {
    if (provinces) {
      return provinces.map((item) => ({
        label: item.province_name,
        value: item.province_id,
      }));
    }
    return [];
  }, [provinces]);
  const districtOptions = useMemo(() => {
    if (districts) {
      return districts.map((item) => ({
        label: item.district_name,
        value: item.district_id,
      }));
    }
    return [];
  }, [districts]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(values) => {
        useEffect(() => {
          if (values.values.province?.value) {
            fetchDistricts(values.values.province.value);
          }
        }, [values.values.province?.value]);

        return (
          <Form className="flex flex-col gap-4 w-full">
            <Box className="flex flex-col gap-4">
              <FormikField
                required
                classNameLabel="text-neutrals-100 font-medium text-sm"
                name="email"
                leftIcon={
                  <CommonIcon.EmailOutlined className="text-primary !text-xl" />
                }
                component={InputField}
                size="small"
                labelTop="Email"
                placeholder="Nhập email của bạn"
              />
              <FormikField
                required
                classNameLabel="text-neutrals-100 font-medium text-sm"
                name="password"
                leftIcon={
                  <CommonIcon.LockOutlined className="text-primary !text-xl" />
                }
                component={InputField}
                size="small"
                type="password"
                labelTop="Mật khẩu"
                placeholder="Nhập mật khẩu"
              />
              <FormikField
                required
                classNameLabel="text-neutrals-100 font-medium text-sm"
                name="confirmPassword"
                leftIcon={
                  <CommonIcon.LockOutlined className="text-primary !text-xl" />
                }
                component={InputField}
                size="small"
                type="password"
                labelTop="Xác nhận mật khẩu"
                placeholder="Nhập lại mật khẩu"
              />
            </Box>
            <Box className="">
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  padding: "10px 0",
                }}
              >
                Thông tin nhà tuyển dụng
              </Typography>
              <Box className="grid grid-cols-12 gap-6">
                <FormikField
                  required
                  classNameLabel="text-neutrals-100 font-medium text-sm"
                  classNameContainer="col-span-6"
                  name="name"
                  leftIcon={
                    <CommonIcon.PersonOutline className="text-primary !text-xl" />
                  }
                  component={InputField}
                  size="small"
                  labelTop="Họ và tên"
                  placeholder="Họ và tên"
                />
                <GenderField classNameContainer={"col-span-6"} />
                <FormikField
                  required
                  classNameLabel="text-neutrals-100 font-medium text-sm"
                  classNameContainer="col-span-12"
                  name="phoneNumber"
                  leftIcon={
                    <CommonIcon.SmartphoneRounded className="text-primary !text-xl" />
                  }
                  component={InputField}
                  size="small"
                  labelTop="Số điện thoại cá nhân"
                  placeholder="Số điện thoại cá nhân"
                />
                <FormikField
                  required
                  classNameLabel="text-neutrals-100 font-medium text-sm"
                  classNameContainer="col-span-12"
                  name="companyName"
                  leftIcon={
                    <CommonIcon.BusinessOutlined className="text-primary !text-xl" />
                  }
                  component={InputField}
                  size="small"
                  labelTop="Công ty"
                  placeholder="Tên công ty"
                />
                <FormikField
                  required
                  classNameLabel="text-neutrals-100 font-medium text-sm"
                  classNameContainer="col-span-6"
                  name="province"
                  leftIcon={
                    <CommonIcon.LocationCityOutlined className="text-primary !text-xl" />
                  }
                  component={AutocompleteField}
                  options={provinceOptions}
                  size="small"
                  label="Địa điểm làm việc"
                  placeholder="Tỉnh thành phố"
                />
                <FormikField
                  required
                  classNameLabel="text-neutrals-100 font-medium text-sm"
                  classNameContainer="col-span-6"
                  name="district"
                  disabled={values.values.province ? false : true}
                  leftIcon={
                    <CommonIcon.HomeWorkOutlined className="text-primary !text-xl" />
                  }
                  component={AutocompleteField}
                  options={districtOptions}
                  size="small"
                  label="Quận/ huyện"
                  placeholder="Quận/ huyện"
                />
              </Box>
            </Box>
            <Button
              className="!bg-primary !text-white"
              size="large"
              type="submit"
            >
              Hoàn tất
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpHrForm;
