import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import { Form, Formik } from "formik";

import { Logo } from "@/components";
import { Button } from "@/ui";
import FormikField from "@/components/CustomFieldsFormik/FormikField";
import InputField from "@/components/CustomFieldsFormik/InputField";

import {signUp } from "@/services/AuthServices";
import { useNotifications } from "@/utils/notifications";
import * as Yup from "yup";
import { RouteBase } from "../../constants/routeUrl";
import CommonIcon from "../../ui/CommonIcon";
import { bgLogin } from "../../assets/images";
import { useAuthentication } from "../../providers/AuthenticationProvider";

const SignUpPage = () => {
  const { showSuccess, showError } = useNotifications();
  const {signInGoogle} = useAuthentication()
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Họ tên là bắt buộc"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .min(6, "Mật khẩu phải ít nhất 6 ký tự")
      .required("Mật khẩu là bắt buộc"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
      .required("Mật khẩu xác nhận là bắt buộc"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
  };

  const handleSubmit = async (values) => {
    try {
      const res = await signUp(values);
      if (res?.status === "success") {
        showSuccess(res?.message);
        navigate(`/sign-in`);
        return;
      }
      showError(res?.message);
    } catch (error) {
      showError(error?.message);
    }
  };

  return (
    <Box className="w-full min-h-screen relative grid grid-cols-1 gap-10 md:grid-cols-12 bg-blue-950 p-10 bg-grid bg-no-repeat bg-contain bg-bottom">
      <Box className="col-span-6 flex flex-col items-center justify-center gap-y-4 px-4 md:px-0">
        <Box className="size-full bg-white flex flex-col items-center p-5 justify-center gap-y-4 px-4 md:px-0 rounded-xl">
          <Link to={RouteBase.Home}>
            <Logo />
          </Link>
          <Box className="w-[450px] flex flex-col gap-4">
            <Box className="text-center">
              <h2 className="font-bold font-RedHatDisplay text-2xl text-neutrals-100 mb-2">
                Tạo tài khoản mới
              </h2>
            </Box>
            <Button
              onClick={signInGoogle}
              className="!bg-primary !text-white"
              startIcon={<CommonIcon.Google />}
            >
              Đăng ký với Google
            </Button>
            <Box className="flex items-center w-full">
              <Divider className="flex-grow" />
              <Typography variant="body2" className="px-4 text-gray-500">
                hoặc
              </Typography>
              <Divider className="flex-grow" />
            </Box>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="flex flex-col gap-4 w-[450px]">
                  <FormikField
                    classNameLabel="font-medium text-neutrals-100"
                    name="name"
                    component={InputField}
                    size="small"
                    labelTop="Họ tên"
                    placeholder="Họ tên của bạn"
                  />
                  <FormikField
                    classNameLabel="font-medium text-neutrals-100"
                    name="email"
                    component={InputField}
                    size="small"
                    labelTop="Email"
                    placeholder="Email của bạn"
                  />
                  <FormikField
                    classNameLabel="font-medium text-neutrals-100"
                    name="password"
                    component={InputField}
                    size="small"
                    type="password"
                    labelTop="Mật khẩu"
                    placeholder="Mật khẩu của bạn"
                  />
                  <FormikField
                    classNameLabel="font-medium text-neutrals-100"
                    name="confirmPassword"
                    component={InputField}
                    size="small"
                    type="password"
                    labelTop="Xác nhận mật khẩu"
                    placeholder="Nhập lại mật khẩu của bạn"
                  />
                  <Button
                    className="!bg-primary !text-white"
                    size="large"
                    type="submit"
                  >
                    Đăng ký
                  </Button>
                </Form>
              )}
            </Formik>
            <Box className="text-center">
              <span className="text-gray-600">Bạn đã có tài khoản? </span>
              <Link className="text-active font-medium" to={RouteBase.SignIn}>
                Đăng nhập
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="col-span-6 h-full flex justify-center items-center">
        <img
          className="h-3/4"
          src={bgLogin}
          alt=""
        />
      </Box>
    </Box>
  );
};

export default SignUpPage;
