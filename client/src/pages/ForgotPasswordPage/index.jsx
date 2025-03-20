import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import { forgotPassword } from "../../assets/images";
import { Button, Box } from "@mui/material";
import { CommonIcon } from "../../ui";
import { SendEmailServices } from "../../services/SendEmailServices";
import { useNotifications } from "../../utils/notifications";

const ForgotPasswordPage = () => {
  const { showSuccess, showError } = useNotifications();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const expireTime = localStorage.getItem("emailResetExpireTime");
    if (expireTime) {
      const remainingTime = Math.max(
        0,
        Math.floor((expireTime - Date.now()) / 1000)
      );
      setTimer(remainingTime);
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async (values) => {
    if (timer > 0) return;
    try {
      if (values?.email) {
        await SendEmailServices.sendChangePassword({ email: values.email });
        showSuccess("Vui lòng kiểm tra hòm thư của bạn để đặt lại mật khẩu");
        const expireTime = Date.now() + 60000; // 1 phút
        localStorage.setItem("emailResetExpireTime", expireTime);
        setTimer(60);
      }
    } catch (error) {
      if (error.status === 404) {
        showError("Tài khoản không tồn tại!");
        return;
      }
      showError(error);
    }
  };

  return (
    <Box className="fixed inset-0 bg-white flex items-center justify-center">
      <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form className="flex flex-col w-[400px] p-5 rounded-md shadow-lg">
              <img src={forgotPassword} alt="" />
              <FormikField
                classNameLabel="font-medium text-neutrals-100"
                name="email"
                component={InputField}
                placeholder="Nhập email của bạn"
              />
              <Button
                className="!bg-primary !text-white !mt-2"
                size="large"
                type="submit"
                startIcon={<CommonIcon.Send />}
                disabled={timer > 0}
              >
                {timer > 0 ? `Gửi lại sau ${timer}s` : "Gửi email"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ForgotPasswordPage;
