import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useMemo } from "react";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import { Button } from "@mui/material";
import { useNotifications } from "../../utils/notifications";
import { resetPassword } from "../../services/AuthServices";
import { useQueryParams } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
});

const ResetPasswordPage = () => {
  const { showSuccess, showError } = useNotifications();
  const navigate = useNavigate()
  const query = useQueryParams();
  const token = useMemo(() => {
    if (query) {
      return query?.token;
    }
  }, [query]);
  const handleSubmit = async (values, { setSubmitting }) => {
    const { password } = values;
    setSubmitting(true);
    try {
      await resetPassword({
        newPassword: password,
        token: token,
      });
      showSuccess("Mật khẩu đã được đặt lại thành công!");
      navigate(RouteBase.SignIn)
    } catch (error) {
      showError("Có lỗi xảy ra, vui lòng thử lại!");
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-[400px] p-5 gap-2 rounded-md shadow-lg">
            <FormikField
              classNameLabel="font-medium text-neutrals-100"
              name="password"
              component={InputField}
              placeholder="Nhập mật khẩu mới"
              type="password"
            />
            <FormikField
              classNameLabel="font-medium text-neutrals-100"
              name="confirmPassword"
              component={InputField}
              placeholder="Nhập lại mật khẩu mới"
              type="password"
            />
            <Button
              className="!bg-primary !text-white !normal-case"
              size="large"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordPage;
