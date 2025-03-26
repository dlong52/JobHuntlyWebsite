import { Form, Formik } from "formik";
import React from "react";
import FormikField from "../../components/CustomFieldsFormik/FormikField";
import InputField from "../../components/CustomFieldsFormik/InputField";
import { Button } from "@/ui";
import * as Yup from "yup";
import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNotifications } from "../../utils/notifications";
import UploadAvatar from "./components/UploadAvatar";
import { changePassword } from "../../services/AuthServices";

const ChangePasswordPage = () => {
  const user = useSelector((state) => state.user);
  const { showError, showSuccess } = useNotifications();

  const initialValues = {
    oldPassword: "",
    confirmPassword: "",
    newPassword: "",
  };
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Vui lòng nhập mật khẩu cũ"),
    newPassword: Yup.string()
      .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
      .required("Vui lòng nhập mật khẩu mới"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
      .required("Vui lòng nhập lại mật khẩu"),
  });
  const handleSubmit = async (values) => {
    try {
      const payload = {
        userId: user?.user_id,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      const res = await changePassword(payload);
      if (res?.data?.status === "success") {
        showSuccess("Đổi mật khẩu thành công", null, {
          vertical: "top",
          horizontal: "right",
        });
      } else {
        showError(res?.data?.message, null, {
          vertical: "top",
          horizontal: "right",
        });
      }
    } catch (error) {
      showError(error, null, { vertical: "top", horizontal: "right" });
    }
  };

  return (
    <Box className="pt-5">
      <Container className="">
        <Box className="grid grid-cols-12 gap-2">
          <UploadAvatar />
          <Box className="col-span-12 bg-white shadow-md rounded-md p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {() => (
                <Form className="grid grid-cols-12 gap-4 w-full text-neutrals-100">
                  <Typography
                    className="col-span-12"
                    sx={{ fontSize: "20px", fontWeight: 600 }}
                  >
                    Đổi mật khẩu
                  </Typography>
                  <FormikField
                    classNameLabel="font-medium text-neutrals-100"
                    classNameContainer="col-span-6"
                    className="w-full"
                    name="oldPassword"
                    component={InputField}
                    size="medium"
                    type="password"
                    required
                    labelTop="Mật khẩu cũ"
                    placeholder="Nhập mật khẩu cũ "
                  />
                  <FormikField
                    classNameLabel="font-medium text-neutrals-100"
                    classNameContainer="col-span-6"
                    className="w-full"
                    name="newPassword"
                    required
                    type="password"
                    component={InputField}
                    size="medium"
                    labelTop="Mật khẩu mới"
                    placeholder="Nhập mật khẩu mới"
                  />
                  <FormikField
                    classNameLabel="font-medium text-neutrals-100"
                    classNameContainer="col-span-12"
                    className="w-full"
                    required
                    type="password"
                    name="confirmPassword"
                    component={InputField}
                    size="medium"
                    labelTop="Nhập lại mật khẩu"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  <Box className="flex justify-between items-end col-span-12">
                    <Button
                      size="large"
                      type="submit"
                      className="!font-medium !w-fit !text-sm !bg-primary !text-white !normal-case !px-5"
                    >
                      Lưu lại
                    </Button>
                    <Typography
                      className="col-span-12 !text-sm"
                      sx={{ color: "gray" }}
                    >
                      Chú ý: (
                      <span className="text-red-500 font-medium">*</span>) là
                      các thông tin bắt buộc.
                    </Typography>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ChangePasswordPage;
