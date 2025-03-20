import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Tên gói dịch vụ không được để trống"),
  introduce: Yup.string().required(
    "Giới thiệu gói dịch vụ không được để trống"
  ),
  description: Yup.string().required("Mô tả chi tiết không được để trống"),
  price: Yup.number()
    .typeError("Giá dịch vụ phải là số")
    .required("Giá dịch vụ không được để trống")
    .min(0, "Giá dịch vụ phải lớn hơn hoặc bằng 0"),
  discount: Yup.number()
    .typeError("Giảm giá phải là số")
    .min(0, "Giảm giá không thể nhỏ hơn 0")
    .max(100, "Giảm giá không thể vượt quá 100%"),
  job_post_limit: Yup.number()
    .typeError("Số lượng tin tuyển dụng phải là số")
    .required("Số lượng tin tuyển dụng không được để trống")
    .min(1, "Số lượng tin tối thiểu là 1"),
  duration_in_days: Yup.number()
    .typeError("Thời gian hiệu lực phải là số")
    .required("Thời gian hiệu lực không được để trống")
    .min(1, "Thời gian hiệu lực tối thiểu là 1 ngày"),
  is_featured: Yup.boolean(),
  active: Yup.boolean(),
});

// initialValues
export const initialValues = {
  name: "",
  introduce: "",
  package_code: "",
  discount: undefined,
  description: "",
  price: undefined,
  job_post_limit: undefined,
  duration_in_days: undefined,
  is_featured: false,
  active: false,
  features: [""],
};
