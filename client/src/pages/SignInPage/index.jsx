import React, { useCallback } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { auth, provider, signInWithPopup } from "@/../firebaseConfig";

import { Logo } from "@/components";
import { Button } from "@/ui";
import FormikField from "@/components/CustomFieldsFormik/FormikField";
import InputField from "@/components/CustomFieldsFormik/InputField";
import DialogCustom from "../../components/Dialogs";
import ConfirmSignUpRole from "./components/ConfirmSignUpRole";

import * as UserServices from "@/services/UserServices";

import { useNotifications } from "@/utils/notifications";
import { updateUser } from "@/redux/userSlice";
import { validationSchema } from "./validate";
import { useToggleDialog } from "../../hooks";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { bgLogin, Google } from "../../assets/images";
import { signInWithGoogle } from "../../services/AuthServices";
import useCheckRoleNavigate from "../../hooks/useCheckRoleNavigate";
import { ROLE } from "../../constants/enum";
import httpServices from "../../services/httpServices";
import { useLoadingUser } from "../../providers/LoadingUserProvider";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";

const SignInPage = () => {
  const { isLoading, setIsLoading } = useLoadingUser();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useNotifications();
  const { open, toggle, shouldRender } = useToggleDialog();
  const { checkRoleNavigate } = useCheckRoleNavigate();
  const { signIn, isLogging } = useAuthentication();
  const initialValues = {
    email: "",
    password: "",
  };
  const signInGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      setIsLoading(true);
      const res = await signInWithGoogle(token, "google", ROLE.CANDIDATE);
      if (res?.status === "success") {
        showSuccess(res?.message);
        checkRoleNavigate(res?.data.role);
        if (res?.data?.access_token) {
          handleGetUserDetails(res?.data.access_token);
          httpServices.saveTokenStorage(res?.data?.access_token);
          httpServices.attachTokenToHeader(res?.data?.access_token);
        }
        return;
      }
      showError(res.message);
    } catch (error) {
      console.error("Error during Google login: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const res = await signIn(values);
      if (res?.status === "success") {
        showSuccess(res?.message);
        checkRoleNavigate(res?.data.role);
        if (res?.data.access_token) {
          handleGetUserDetails(res?.data.access_token);
        }
        return;
      }
      showError(res.message);
    } catch (error) {
      showError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleGetUserDetails = async (token) => {
    setIsLoading(true);
    const res = await UserServices.getDetailUser(token);
    dispatch(updateUser({ ...res?.data, accessToken: token }));
    setIsLoading(false);
  };
  // Render
  return (
    <Box className="w-full min-h-screen relative grid grid-cols-1 gap-10 md:grid-cols-12  bg-blue-950 p-10 bg-grid bg-no-repeat bg-contain bg-bottom">
      <Box className="col-span-6 flex flex-col items-center justify-center gap-y-4 px-4 md:px-0">
        <Box className="size-full bg-white flex flex-col items-center justify-center gap-y-4 px-4 md:px-0 rounded-xl">
          <Logo />
          <Box className="w-[450px] flex flex-col gap-5">
            <Box className="text-center">
              <h2 className="font-bold font-RedHatDisplay text-2xl text-neutrals-100 mb-2">
                Chào mừng bạn đã quay trở lại
              </h2>
            </Box>

            <Button
              onClick={signInGoogle}
              size="large"
              className="!bg-white shadow  !text-gray-800"
              startIcon={<img src={Google} alt="" />}
            >
              Đăng nhập với Google
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
              {() => {
                return (
                  <Form className="flex flex-col gap-5 w-[450px]">
                    <FormikField
                      classNameLabel="font-medium text-neutrals-100"
                      name="email"
                      component={InputField}
                      size="small"
                      labelTop="Email"
                      placeholder="Nhập email của bạn"
                    />
                    <Box className="text-end">
                      <FormikField
                        classNameLabel="font-medium text-neutrals-100"
                        name="password"
                        component={InputField}
                        size="small"
                        type="password"
                        labelTop="Mật khẩu"
                        placeholder="Nhập mật khẩu của bạn"
                      />
                      <Link to={RouteBase.ForgotPassword} className="text-end text-sm text-neutrals-80 !mt-2">
                        Quên mật khẩu?
                      </Link>
                    </Box>
                    <Button
                      className="!bg-primary !text-white"
                      size="large"
                      type="submit"
                      isLoading={isLogging}
                    >
                      Đăng nhập
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <Box className="flex justify-center gap-2">
              <Typography className="text-gray-600">
                Bạn chưa có tài khoản?{" "}
              </Typography>
              <Typography
                onClick={toggle}
                className="text-active font-medium cursor-pointer"
              >
                Đăng ký
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="col-span-6 h-full flex justify-center items-center">
        <img className="h-3/4 " src={bgLogin} alt="" />
      </Box>
      {isLoading && <Loading />}
      {shouldRender && (
        <DialogCustom toggle={toggle} open={open} body={ConfirmSignUpRole} />
      )}
    </Box>
  );
};

export default SignInPage;
