import { Form, Formik } from "formik";
import React from "react";
import {
  FormikField,
  InputField,
} from "../../../../components/CustomFieldsFormik";
import { Box, Button } from "@mui/material";
import { changePassword } from "../../../../services/AuthServices";
import { useSelector } from "react-redux";
import { useNotifications } from "../../../../utils/notifications";

const ChangePassword = () => {
  const user = useSelector((state) => state.user);
  const { showSuccess, showError } = useNotifications();
  const handleSubmit = async (values) => {
    try {
      const payload = {
        userId: user?.user_id,
        oldPassword: values.oldPassword,
        newPassword: values.password,
      };
      const res = await changePassword(payload);
      if (res?.data?.status === "success") {
        showSuccess("Đổi mật khẩu thành công");
      } else {
        showError(res?.data?.message);
      }
    } catch (error) {
      showError(error);
    }
  };
  return (
    <Formik
      initialValues={{ oldPassword: "", password: "", confirmPassword: "" }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {() => (
        <Box className="flex items-center justify-center py-10">
          <Form className="flex flex-col gap-4 w-fit text-neutrals-100">
            <FormikField
              className="w-[400px]"
              name="oldPassword"
              component={InputField}
              required
              label="Mật khẩu cũ"
              placeholder="Nhập mật khẩu cũ"
            />
            <FormikField
              className="w-[400px]"
              name="password"
              component={InputField}
              required
              label="Mật khẩu mới"
              placeholder="Nhập mật khẩu mới"
            />
            <FormikField
              className="w-[400px]"
              name="confirmPassword"
              component={InputField}
              required
              label="Nhập lại mật khẩu"
              placeholder="Nhập lại mật khẩu mới"
            />
            <Button type="submit" size="large" className="!bg-primary !text-white">
              Xác nhận
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default ChangePassword;
