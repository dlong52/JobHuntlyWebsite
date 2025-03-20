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
        <Box className="flex items-center justify-center w-full py-5">
          <Form className="flex flex-col items-end gap-5 w-full text-neutrals-100">
            <FormikField
              sx={{
                fieldset: {
                  borderRadius: "10px",
                },
              }}
              className="w-full"
              name="oldPassword"
              component={InputField}
              required
              label="Mật khẩu cũ"
            />
            <FormikField
              sx={{
                fieldset: {
                  borderRadius: "10px",
                },
              }}
              className="w-full"
              name="password"
              component={InputField}
              required
              label="Mật khẩu mới"
            />
            <FormikField
              sx={{
                fieldset: {
                  borderRadius: "10px",
                },
              }}
              className="w-full"
              name="confirmPassword"
              component={InputField}
              required
              label="Nhập lại mật khẩu"
            />
            <Button
              type="submit"
              size="large"
              className="!bg-primary !rounded-lg !text-white w-fit !normal-case"
            >
              Lưu lại
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default ChangePassword;
