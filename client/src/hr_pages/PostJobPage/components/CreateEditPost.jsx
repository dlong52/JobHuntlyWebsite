import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useMemo } from "react";
import {
  AutocompleteField,
  CkEditerField,
  FormikField,
  InputField,
  SelectField,
} from "../../../components/CustomFieldsFormik";
import { CommonIcon } from "../../../ui";
import { useAddress } from "../../../hooks";
import { initialValues, validationSchema } from "../form";
import { employmentTypeOptions } from "../../../constants/enum";
import DatePickerField from "../../../components/CustomFieldsFormik/DatePickerField";

const CreateEditJobPost = ({ toggle }) => {
  const {
    provinces,
    districts,
    wards,
    loading,
    error,
    fetchDistricts,
    fetchWards,
  } = useAddress();

  const provinceOptions = useMemo(() => {
    if (provinces) {
      return provinces.map((item) => ({
        label: item.province_name,
        value: item.province_id,
      }));
    }
    return [];
  }, [provinces]);
  const dictrictOptions = useMemo(() => {
    if (districts) {
      return districts.map((item) => ({
        label: item.district_name,
        value: item.district_id,
      }));
    }
    return [];
  }, [districts]);
  const wardOptions = useMemo(() => {
    if (wards) {
      return wards.map((item) => ({
        label: item.ward_name,
        value: item.ward_id,
      }));
    }
    return [];
  }, [wards]);
  const handleSubmit = (values) => {
    console.log("values: ", values);
  };
  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => {
        useEffect(() => {
          if (values.province?.value) fetchDistricts(values.province.value);
          if (values.district?.value) fetchWards(values.district.value);
        }, [values.province?.value, values.district?.value]);

        if (error) return <Typography>Lỗi khi tải dữ liệu: {error}</Typography>;
        return (
          <Form className="flex flex-col w-[1000px] relative">
            {/* Title */}
            <Box className="flex justify-between items-center sticky top-0 p-5 z-50 bg-white shadow">
              <Typography fontSize={"20px"} fontWeight={600} className="">
                Đăng tin tuyển dụng
              </Typography>
              <Box className="cursor-pointer" onClick={toggle}>
                <CommonIcon.Close />
              </Box>
            </Box>
            <div className="grid grid-cols-12 gap-4 p-5">
              <FormikField
                classNameContainer="col-span-6"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="title"
                component={InputField}
                labelTop="Tiêu đề công việc"
                placeholder="Nhập tiêu đề công việc"
              />
              {/* Experience */}
              <FormikField
                classNameContainer="col-span-6"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="experience"
                component={InputField}
                labelTop="Kinh nghiệm"
                placeholder="Ví dụ: 2 năm kinh nghiệm"
              />
              <FormikField
                classNameContainer="col-span-12"
                name="jobDescription"
                component={CkEditerField} // Sử dụng CKEditor làm component
                label="Mô tả công việc"
                classNameLabel="font-medium text-neutrals-100"
                required={true}
                optionsToRemove={[
                  "EasyImage",
                  "BlockQuote",
                  "Table",
                  "Heading",
                ]}
              />
              <FormikField
                classNameContainer="col-span-12"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="jobBenefits"
                component={CkEditerField}
                label="Quyền lợi"
                placeholder="Mô tả chi tiết quyền lợi"
              />
              {/* requiredments */}
              <FormikField
                classNameContainer="col-span-6"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="jobRequirements"
                component={CkEditerField}
                label="Yêu cầu công việc"
                placeholder="Nhập các yêu cầu (phân cách bằng dấu phẩy)"
              />
              <FormikField
                classNameContainer="col-span-6"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="workingTime"
                component={CkEditerField}
                label="Thời gian làm việc"
                placeholder="Nhập thông tin cụ thể thời gian làm việc"
              />
              {/* Salary */}
              <FormikField
                classNameContainer="col-span-6"
                className="bg-[#f8fafc]"
                classNameLabel="font-medium text-neutrals-100"
                name="minSalary"
                component={InputField}
                labelTop="Lương tối thiểu"
                placeholder="Nhập lương tối thiểu"
              />
              <FormikField
                classNameContainer="col-span-6"
                className="bg-[#f8fafc]"
                classNameLabel="font-medium text-neutrals-100"
                name="maxSalary"
                component={InputField}
                labelTop="Lương tối đa"
                placeholder="Nhập lương tối đa"
              />
              {/* Employment Type */}
              <FormikField
                classNameContainer="col-span-6"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="employmentType"
                options={employmentTypeOptions}
                component={SelectField}
                labelTop="Hình thức làm việc"
                placeholder="Chọn hình thức làm việc"
              />
              {/* Categories */}
              <FormikField
                classNameContainer="col-span-6"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="categories"
                options={employmentTypeOptions}
                component={AutocompleteField}
                labelTop="Danh mục công việc"
                placeholder="Nhập danh mục công việc"
              />
              <FormikField
                classNameContainer="col-span-6"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="endDate"
                options={employmentTypeOptions}
                component={DatePickerField}
                labelTop="Hạn nộp hồ sơ"
                placeholder="Nhập danh mục công việc"
              />
              <FormikField
                classNameContainer="col-span-6"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="rank"
                options={employmentTypeOptions}
                component={AutocompleteField}
                labelTop="Cấp bậc"
                placeholder="Chọn cấp bậc"
              />
              <FormikField
                classNameContainer="col-span-3"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="province"
                options={provinceOptions}
                component={AutocompleteField}
                labelTop="Tỉnh/Thành phố"
                placeholder="Chọn tỉnh/thành phố"
              />
              <FormikField
                classNameContainer="col-span-3"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="district"
                options={dictrictOptions}
                component={AutocompleteField}
                labelTop="Quận/huyện"
                placeholder="Chọn quận huyện"
              />
              <FormikField
                classNameContainer="col-span-3"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="ward"
                options={wardOptions}
                component={AutocompleteField}
                labelTop="Phường/xã"
                placeholder="Chọn phường/xã"
              />
              <FormikField
                classNameContainer="col-span-3"
                className="bg-[#f8fafc]"
                required
                classNameLabel="font-medium text-neutrals-100"
                name="detailAddress"
                component={InputField}
                labelTop="Địa chỉ cụ thể"
                placeholder="Nhập địa chỉ cụ thể"
              />
              {/* </div> */}
              {/* Submit Button */}
              <Button
                className="!bg-primary !text-white col-span-12"
                size="large"
                type="submit"
              >
                Đăng bài tuyển dụng
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default CreateEditJobPost;
