import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Họ tên là bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    .min(6, "Mật khẩu phải ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Mật khẩu xác nhận là bắt buộc"),
  gender: Yup.string().required("Giới tính là trường bắt buộc"),
  phoneNumber: Yup.string().required("Số điện thoại là trường bắt buộc"),
  province: Yup.object().required("Tỉnh/Thành phố là trường bắt buộc"),
  district: Yup.object().required("Quận/Huyện là trường bắt buộc"),
  companyName: Yup.string().required("Tên công ty là trường bắt buộc"),
});

export const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  companyName: "",
  province: "",
  district: "",
  gender: "",
  phoneNumber: "",
  role: "",
};