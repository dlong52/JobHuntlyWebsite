import { Box } from "@mui/material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import React from "react";
import { Button } from "../../../ui";
import {
  FormikField,
  InputField,
} from "../../../components/CustomFieldsFormik";
import { updateUser } from "../../../services/UserServices";
import { useSelector } from "react-redux";
import { useNotifications } from "../../../utils/notifications";

const SendEmailForm = ({ onClose }) => {
  const { user_id } = useSelector((state) => state.user);
  const { showError, showSuccess } = useNotifications();
  const handleSubmit = async (values) => {
    try {
      await updateUser({ id: user_id, email: values.email });
      showSuccess("Cập nhật email mới thành công")
      window.location.reload();
    } catch (error) {
      showError(error)
    }
  };
  return (
    <div>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Email không hợp lệ") // Kiểm tra định dạng email
            .required("Email không được để trống"), // Kiểm tra không để trống
        })}
        onSubmit={handleSubmit}
      >
        {({}) => {
          return (
            <Form className="min-w-[400px]">
              <FormikField
                classNameLabel="font-medium text-neutrals-100"
                name="email"
                component={InputField}
                labelTop="Địa chỉ email mới"
                placeholder="Nhập email"
              />
              <Box className="flex items-center gap-2 mt-4">
                <Button
                  onClick={onClose}
                  size={"large"}
                  className={"!text-neutrals-100 !bg-neutrals-20 flex-1"}
                >
                  Hủy
                </Button>
                <Button
                  type={"submit"}
                  size={"large"}
                  className={"!bg-primary !text-white !normal-case flex-1"}
                >
                  Thay đổi
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SendEmailForm;
