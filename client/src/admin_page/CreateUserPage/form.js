import * as Yup from "yup";
export const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "",
  companyName: "",
  categories: null,
  website: "",
  description: "",
  birthday: "",
  phone_number: "",
  min_staff: "",
  max_staff: "",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, "Tên phải có ít nhất 3 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự")
    .required("Tên là bắt buộc"),

  email: Yup.string()
    .trim()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),

  password: Yup.string()
    .trim()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(50, "Mật khẩu không được vượt quá 50 ký tự")
    .required("Mật khẩu là bắt buộc"),

  role: Yup.object({
    value: Yup.string().nullable().required("Vai trò là bắt buộc"),
    label: Yup.string().required(),
  }).required("Vai trò là bắt buộc"),

  companyName: Yup.string()
    .trim()
    .min(3, "Tên công ty phải có ít nhất 3 ký tự")
    .max(100, "Tên công ty không được vượt quá 100 ký tự")
    .when("role.label", {
      is: "Nhà tuyển dụng",
      then: (schema) => schema.required("Tên công ty là bắt buộc"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

