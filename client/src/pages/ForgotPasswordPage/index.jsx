import { Formik } from "formik";
import React from "react";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import { forgotPassword } from "../../assets/images";
import { Box, Button } from "@mui/material";
import { CommonIcon } from "../../ui";

const ForgotPasswordPage = () => {
  const handleSubmit = async (values) => {
    try {
    } catch (error) {}
  };
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
        {() => {
          return (
            <div className="flex flex-col w-[400px] p-5 rounded-md shadow-lg">
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
              >
                Gửi email
              </Button>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default ForgotPasswordPage;
