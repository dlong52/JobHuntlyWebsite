import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên là bắt buộc"),
    phone_number: Yup.string()
      .min(6, "Số điện thoại phải ít nhất 6 ký tự")
      .required("Số điện thoại là bắt buộc"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
  });

export const initialValues = {
    name: "Nguyễn Đức Long",
    phone_number: "0123456789",
    email: "dlong.work23@gmail.com",
  };