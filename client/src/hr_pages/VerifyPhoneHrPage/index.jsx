import React, { useState } from "react";
import { Logo } from "../../components";
import { Typography } from "@mui/material";
import { sendOpt } from "../../assets/images";
import { Form, Formik } from "formik";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import { Button } from "../../ui";
import { useSelector } from "react-redux";
import { useNotifications } from "../../utils/notifications";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { useQueryParams } from "../../hooks";

const VerifyPhoneHrPage = () => {
  const navigate = useNavigate();
  const { phone_number } = useSelector((state) => state.user);
  const { showError, showSuccess } = useNotifications();
  const [verificationId, setVerificationId] = useState(null);
  const [otp, setOtp] = useState("");

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  };

  const sendOTP = async (values) => {
    try {
      setupRecaptcha();
      const confirmation = await signInWithPhoneNumber(
        auth,
        "+84" + values.phone_number.substring(1),
        window.recaptchaVerifier
      );
      
      console.log(confirmation?.verificationId);
      setVerificationId(confirmation?.verificationId);
      
      showSuccess("Gửi OTP thành công! Vui lòng kiểm tra tin nhắn SMS.");
    } catch (error) {
      showError("Lỗi gửi OTP: " + error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      const credential = window.firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        otp
      );
      await auth.signInWithCredential(credential);
      showSuccess("Xác minh thành công!");
      navigate(RouteBase.HRVerifyPhone);
    } catch (error) {
      showError("Lỗi xác minh OTP: " + error.message);
    }
  };
console.log(verificationId);

  return (
    <div>
      <div className="bg-white p-10 rounded-md grid grid-cols-12">
        <div className="col-span-8 flex flex-col gap-10">
          <Logo />
          <Typography
            fontWeight="900"
            fontSize="45px"
            className="w-3/4 font-ClashDisplay text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary !leading-[50px]"
          >
            Xác thực số điện thoại nhà tuyển dụng
          </Typography>

          <Formik
            initialValues={{ phone_number: phone_number }}
            onSubmit={sendOTP}
          >
            {({}) => (
              <Form className="grid col-span-12 gap-4 w-4/5">
                <FormikField
                  component={InputField}
                  name="phone_number"
                  placeholder="Nhập số điện thoại"
                  classNameContainer="col-span-5"
                />
                <Button
                  size="large"
                  onClick={() => sendOTP({ phone_number })}
                  className="!bg-primary !text-white !col-span-5"
                >
                  Gửi mã xác thực
                </Button>
                <div id="recaptcha-container"></div>
              </Form>
            )}
          </Formik>

          {verificationId && (
            <div className="grid col-span-12 gap-4 w-4/5 mt-4">
              <input
                type="text"
                placeholder="Nhập OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <Button
                size="large"
                onClick={verifyOTP}
                className="!bg-primary !text-white"
              >
                Xác minh OTP
              </Button>
            </div>
          )}
          
        </div>
        <div className="col-span-4">
          <img src={sendOpt} className="w-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default VerifyPhoneHrPage;
