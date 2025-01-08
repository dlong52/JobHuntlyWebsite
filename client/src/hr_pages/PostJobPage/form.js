import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Tiêu đề công việc là bắt buộc"),
  experience: Yup.string().required("Kinh nghiệm là bắt buộc"),
  jobDescription: Yup.string().required("Mô tả công việc là bắt buộc"),
  jobBenefits: Yup.string().required("Quyền lợi là bắt buộc"),
  jobRequirements: Yup.string().required("Yêu cầu công việc là bắt buộc"),
  workingTime: Yup.string().required("Thời gian làm việc là bắt buộc"),
  minSalary: Yup.number()
    .required("Lương tối thiểu là bắt buộc")
    .typeError("Lương tối thiểu phải là số"),
  maxSalary: Yup.number()
    .required("Lương tối đa là bắt buộc")
    .typeError("Lương tối đa phải là số")
    .min(Yup.ref("minSalary"), "Lương tối đa phải lớn hơn lương tối thiểu"),
  employmentType: Yup.string().required("Hình thức làm việc là bắt buộc"),
  categories: Yup.array().required("Danh mục công việc là bắt buộc"),
  province: Yup.string().required("Tỉnh/Thành phố là bắt buộc"),
  district: Yup.string().required("Quận/Huyện là bắt buộc"),
  ward: Yup.string().required("Phường/Xã là bắt buộc"),
  detailAddress: Yup.string().required("Địa chỉ cụ thể là bắt buộc"),
});

// initialValues
export const initialValues = {
  title: "",
  experience: "",
  jobDescription: "",
  jobBenefits: "",
  jobRequirements: "",
  workingTime: "",
  minSalary: "",
  maxSalary: "",
  employmentType: "",
  categories: [],
  province: "",
  district: "",
  ward: "",
  detailAddress: "",
};
