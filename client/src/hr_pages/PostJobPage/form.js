import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Tiêu đề công việc là bắt buộc"),
  description: Yup.string().required("Mô tả công việc là bắt buộc"),
  job_benefit: Yup.string().required("Quyền lợi là bắt buộc"),
  requirements: Yup.string().required("Yêu cầu công việc là bắt buộc"),
  work_time: Yup.string().required("Thời gian làm việc là bắt buộc"),
  minSalary: Yup.number()
    .required("Lương tối thiểu là bắt buộc")
    .typeError("Lương tối thiểu phải là số"),
  maxSalary: Yup.number()
    .required("Lương tối đa là bắt buộc")
    .typeError("Lương tối đa phải là số")
    .min(Yup.ref("minSalary"), "Lương tối đa phải lớn hơn lương tối thiểu"),
  employment_type: Yup.string().required("Hình thức làm việc là bắt buộc"),
  categories: Yup.array().required("Danh mục công việc là bắt buộc"),
  province: Yup.string().required("Tỉnh/Thành phố là bắt buộc"),
  district: Yup.string().required("Quận/Huyện là bắt buộc"),
  ward: Yup.string().required("Phường/Xã là bắt buộc"),
  additional: Yup.string().required("Địa chỉ cụ thể là bắt buộc"),
});

// initialValues
export const initialValues = {
  title: "",
  isYear: false,
  experience: "",
  description: "",
  requirements: "",
  job_benefit: "",
  quantity: 1,
  work_time: "",
  level: "",
  end_date: "",
  minSalary: "",
  maxSalary: "",
  province: "",
  district: "",
  ward: "",
  additional_info: "",
  categories: "",
  employment_type: "",
  posted_by: "",
};

const payload = {
  title: "",
  experience: "",
  description: "",
  requirements: "",
  job_benefit: "",
  work_time: "",
  level: "",
  end_date: "",
  minSalary: "",
  maxSalary: "",
  province: "",
  district: "",
  ward: "",
  additional_info: "",
  categories: "",
  employment_type: "",
  posted_by: "",
};
