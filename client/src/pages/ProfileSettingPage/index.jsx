import { Form, Formik } from "formik";
import React from "react";
import FormikField from "../../components/CustomFieldsFormik/FormikField";
import InputField from "../../components/CustomFieldsFormik/InputField";
import { Button } from "@/ui";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CommonAvatar, CommonIcon } from "../../ui";

const ProfileSettingPage = () => {
  const user = useSelector((state) => state.user);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên là bắt buộc"),
    phone_number: Yup.string()
      .min(6, "Số điện thoại phải ít nhất 6 ký tự")
      .required("Số điện thoại là bắt buộc"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
  });

  const initialValues = {
    name: user?.username || "",
    phone_number: user?.phone_number || "",
    email: user?.email || "",
  };

  const handleSubmit = async (values) => {
    console.log("Form Values:", values);
    // Your submission logic here
  };

  return (
    <Box className="pt-5">
      <Box className="container mx-auto my-10">
        <Box className="grid grid-cols-12 gap-10">
          <Box className="col-span-8 bg-white shadow-md rounded-md p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {() => (
                <Form className="flex flex-col gap-4 w-full text-neutrals-100">
                  <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                    Cài đặt thông tin cá nhân
                  </Typography>
                  <Typography sx={{ color: "gray" }}>
                    <span className="text-red-500 font-medium">(*)</span> Các
                    thông tin bắt buộc
                  </Typography>
                  <FormikField
                    classNameLabel="font-medium text-neutrals-100"
                    className="w-full"
                    name="name"
                    component={InputField}
                    size="medium"
                    required
                    labelTop="Họ và tên"
                    placeholder="Nhập tên của bạn"
                  />
                  <FormikField
                    classNameLabel="font-medium text-neutrals-100"
                    className="w-full"
                    name="phone_number"
                    component={InputField}
                    size="medium"
                    labelTop="Số điện thoại"
                    placeholder="Nhập số điện thoại của bạn"
                  />
                  <FormikField
                    classNameLabel="font-medium text-neutrals-100"
                    className="w-full"
                    name="email"
                    component={InputField}
                    disabled={true}
                    size="medium"
                    readOnly={true}
                    labelTop="Email"
                    placeholder="Nhập email của bạn"
                  />
                  <Button
                    size="large"
                    type="submit"
                    className="!font-medium !w-fit !text-sm !bg-primary !text-white"
                  >
                    Lưu
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
          <Box className="col-span-4 bg-white shadow-md rounded-md p-8">
            <Box className="flex gap-4 items-center">
              <Box className="size-[80px] relative">
                <CommonAvatar className="!size-full " />
                <Box className="size-6 flex items-center justify-center bg-primary text-white absolute bottom-0 right-0 rounded-full aspect-square">
                  <CommonIcon.PhotoCamera className="!size-4"/>
                </Box>
              </Box>
              <Box className="flex flex-col">
                <span className="font-medium">Chào bạn trở lại,</span>
                <span className="font-semibold text-xl">{user?.username}</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSettingPage;
