import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Tiêu đề công việc là bắt buộc"),
  description: Yup.string().required("Mô tả công việc là bắt buộc"),
  job_benefit: Yup.string().required("Quyền lợi là bắt buộc"),
  requirements: Yup.string().required("Yêu cầu công việc là bắt buộc"),
  work_time: Yup.string().required("Thời gian làm việc là bắt buộc"),
  // minSalary: Yup.number().typeError("Lương tối thiểu phải là số"),
  // maxSalary: Yup.number()
  //   .typeError("Lương tối đa phải là số")
  //   .min(Yup.ref("minSalary"), "Lương tối đa phải lớn hơn lương tối thiểu"),
  employment_type: Yup.object({
    value: Yup.string().required("Hình thức làm việc là bắt buộc"),
  }),
  categories: Yup.object({
    value: Yup.string().nullable().required("Danh mục công việc là bắt buộc"),
  }),
  province: Yup.object({
    value: Yup.string().required("Tỉnh/Thành phố là bắt buộc"),
  }),
  district: Yup.object({
    value: Yup.string().required("Quận/Huyện là bắt buộc"),
  }),
  ward: Yup.object({
    value: Yup.string().required("Phường/Xã là bắt buộc"),
  }),
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
  level: {
    value: "",
  },
  end_date: "",
  minSalary: "",
  maxSalary: "",
  gender: null,
  province: {
    value: "",
  },
  district: {
    value: "",
  },
  ward: {
    value: "",
  },
  additional_info: "",
  categories: {
    value: "",
  },
  employment_type: {
    value: "",
  },
  posted_by: "",
};
