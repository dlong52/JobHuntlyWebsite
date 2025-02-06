import { Form, Formik } from "formik";
import React from "react";
import {
  FormikField,
  InputField,
} from "../../../../components/CustomFieldsFormik";
import { Box, Button } from "@mui/material";

const ChangePassword = () => {
  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      onSubmit={() => {}}
      enableReinitialize
    >
      {() => (
        <Box className="flex items-center justify-center py-10">
          <Form className="flex flex-col gap-4 w-fit text-neutrals-100">
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
            <Button size="large" className="!bg-primary !text-white">Xác nhận</Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default ChangePassword;
