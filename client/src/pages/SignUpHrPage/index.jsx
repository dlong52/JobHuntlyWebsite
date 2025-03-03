import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";

import { Logo } from "@/components";
import { Button } from "@/ui";

import { RouteBase } from "../../constants/routeUrl";

import CommonIcon from "../../ui/CommonIcon";
import { bgLogin } from "../../assets/images";
import SignUpHrForm from "./components/SignUpHrForm";
import useCheckRoleNavigate from "../../hooks/useCheckRoleNavigate";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebaseConfig";
import { signInWithGoogle } from "../../services/AuthServices";
import { useNotifications } from "../../utils/notifications";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/userSlice";
import * as UserServices from "@/services/UserServices";
import { ROLE } from "../../constants/enum";
import httpServices from "../../services/httpServices";
const SignUpHrPage = () => {
  const { showSuccess, showError } = useNotifications();
  const dispatch = useDispatch();
  const { checkRoleNavigate } = useCheckRoleNavigate();
  const signInGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      const res = await signInWithGoogle(token, "google", ROLE.EMPLOYER);
      if (res?.status === "success") {
        showSuccess(res?.message);
        checkRoleNavigate(res?.data.role);
        if (res?.data.access_token) {
          handleGetUserDetails(res?.data.access_token);
          httpServices.saveTokenStorage(res?.data?.access_token);
          httpServices.attachTokenToHeader(res?.data?.access_token);
        }
        return;
      }
      showError(res.message);
    } catch (error) {
      console.error("Error during Google login: ", error);
    }
  }, []);
  const handleGetUserDetails = async (token) => {
    const res = await UserServices.getDetailUser(token);
    dispatch(updateUser({ ...res?.data, accessToken: token }));
  };
  // Render
  return (
    <Box className="w-full max-h-screen relative grid grid-cols-12 bg-primary-dark">
      <Box className="col-span-8 h-screen py-10 overflow-y-auto overflow-hidden bg-white bg-grid bg-no-repeat bg-contain bg-bottom flex flex-col items-center justify-center gap-y-4">
        <Box className="w-3/4 h-full flex flex-col gap-4">
          <Logo />
          <h2 className="font-bold font-RedHatDisplay text-2xl text-primary mb-2">
            Đăng ký tài khoản Nhà tuyển dụng
          </h2>
          <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
            Tài khoản
          </Typography>
          <Button
            onClick={signInGoogle}
            className="!bg-primary !text-white"
            startIcon={<CommonIcon.Google />}
          >
            Đăng ký bằng Google
          </Button>
          <Box className="flex items-center w-full">
            <Divider className="flex-grow" />
            <Typography variant="body2" className="px-4 text-gray-500">
              Hoặc bằng Email
            </Typography>
            <Divider className="flex-grow" />
          </Box>
          <SignUpHrForm />
          <Box className="text-center">
            <span className="text-gray-600">Bạn đã có tài khoản? </span>
            <Link className="text-active font-medium" to={RouteBase.SignIn}>
              Đăng nhập ngay
            </Link>
          </Box>
        </Box>
      </Box>
      <Box className="col-span-4 max-h-screen flex justify-center items-center ">
        <Box className="bg-grid w-[300px] h-full"></Box>
        <img className="" src={bgLogin} alt="" />
      </Box>
    </Box>
  );
};

export default SignUpHrPage;
