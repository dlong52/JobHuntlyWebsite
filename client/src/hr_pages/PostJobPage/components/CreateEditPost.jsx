import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useMemo } from "react";
import {
  AutocompleteField,
  CheckboxField,
  CkEditerField,
  FormikField,
  GenderField,
  InputField,
} from "../../../components/CustomFieldsFormik";
import { useAddress } from "../../../hooks";
import { initialValues, validationSchema } from "../form";
import { employmentTypeOptions } from "../../../constants/enum";
import DatePickerField from "../../../components/CustomFieldsFormik/DatePickerField";
import { postService } from "../../../services/PostServices";
import SelectCategoryField from "../../../components/SelectField/SelectCategoryField";
import SelectLevelField from "../../../components/SelectField/SelectLevelField";
import { useSelector } from "react-redux";
import { useNotifications } from "../../../utils/notifications";
import moment from "moment";
import { useGetPost } from "../../../hooks/modules/post/useGetPost";
import { CommonStyles } from "../../../ui";
import SelectSubscriptionField from "../../../components/SelectField/SelectSubscriptionField";

const CreateEditJobPost = ({ id, toggle, refetch }) => {
  const user = useSelector((state) => state.user);
  const { showSuccess, showError } = useNotifications();
  const { data, isLoading } = useGetPost(id, { enabled: !!id });
  const { provinces, districts, wards, fetchDistricts, fetchWards } =
    useAddress();

  const provinceOptions = useMemo(() => {
    if (provinces) {
      return provinces.map((item) => ({
        label: item.province_name,
        value: item.province_id,
      }));
    }
    return [];
  }, [provinces]);
  const districtOptions = useMemo(() => {
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
  const handleSubmit = async (values) => {
    const payload = {
      ...(id && { id }),
      title: values.title,
      experience: values?.isYear ? values.experience * 12 : values.experience,
      gender: values?.gender,
      subscription_id: values?.subscription_id?.value,
      description: values.description,
      requirements: values.requirements,
      job_benefit: values.job_benefit,
      work_time: values.work_time,
      company: user?.company_id,
      level: values.level.value,
      quantity: values.quantity,
      end_date: moment(values.end_date, "DD/MM/YYYY").toDate(),
      salary: {
        min: values.minSalary,
        max: values.maxSalary,
      },
      location: {
        province: {
          name: values.province.label,
          id: values.province.value,
        },
        district: {
          name: values.district.label,
          id: values.district.value,
        },
        ward: {
          name: values.ward.label,
          id: values.ward.value,
        },
        additional_info: values.additional,
      },
      categories: [values.categories.value],
      employment_type: values.employment_type.value,
      posted_by: user.user_id,
    };
    try {
      const res = id
        ? await postService.updatePost(payload)
        : await postService.createPost(payload);
      showSuccess(
        id ? "Cập nhật bài đăng thành công!" : "Tạo bài đăng thành công"
      );
      refetch();
      toggle();
    } catch (error) {
      // showError(error.response.data.error);
      return error;
    }
  };
  const initialValuesEdit = useMemo(() => {
    if (data) {
      const dataEdit = data?.data?.data;
      const checkIsYear = dataEdit?.experience % 12 === 0;
      return {
        title: dataEdit?.title,
        subscription_id: {
          label: dataEdit?.subscription_id?.package_id?.name,
          value: dataEdit?.subscription_id?._id,
        },
        experience: checkIsYear
          ? dataEdit?.experience / 12
          : dataEdit?.experience,
        isYear: checkIsYear ? true : false,
        gender: dataEdit?.gender,
        description: dataEdit?.description,
        requirements: dataEdit?.requirements,
        job_benefit: dataEdit?.job_benefit,
        quantity: dataEdit?.quantity,
        work_time: dataEdit?.work_time,
        level: {
          label: dataEdit?.level.name,
          value: dataEdit?.level._id,
        },
        end_date: moment(dataEdit?.end_date).format("DD/MM/YYYY"),
        minSalary: dataEdit?.salary.min,
        maxSalary: dataEdit?.salary.max,
        province: {
          label: dataEdit?.location?.province.name,
          value: dataEdit?.location?.province.id,
        },
        district: {
          label: dataEdit?.location?.district.name,
          value: dataEdit?.location?.district.id,
        },
        ward: {
          label: dataEdit?.location?.ward.name,
          value: dataEdit?.location?.ward.id,
        },
        additional: dataEdit?.location.additional_info,
        categories: {
          label: dataEdit?.categories[0].name,
          value: dataEdit?.categories[0]._id,
        },
        employment_type: employmentTypeOptions.filter((item) => {
          return item.value === dataEdit?.employment_type;
        })[0],
        posted_by: dataEdit?.posted_by,
      };
    }
  }, [data]);
  const checkEdit = id ? !!data : true;
  return (
    <>
      {checkEdit && !isLoading ? (
        <Formik
          initialValues={id ? initialValuesEdit : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => {
            useEffect(() => {
              if (values?.province?.value)
                fetchDistricts(values?.province?.value);
              if (values?.district?.value) fetchWards(values?.district?.value);
            }, [values?.province?.value, values?.district?.value]);
            return (
              <Form className="flex flex-col w-[1000px] relative">
                <div className="grid grid-cols-12 gap-4 p-5">
                  <FormikField
                    classNameContainer="col-span-8"
                    className="bg-[#f8fafc]"
                    required
                    classNameLabel="font-medium text-neutrals-100"
                    name="title"
                    component={InputField}
                    labelTop="Tiêu đề công việc"
                    placeholder="Nhập tiêu đề công việc"
                  />
                  <SelectSubscriptionField
                    disabled={!!id}
                    className="bg-[#f8fafc]"
                    labelTop="Chạy dịch vụ"
                    classNameContainer="col-span-4"
                  />
                  {/* Experience */}
                  <div className="col-span-8 flex items-center">
                    <FormikField
                      className="bg-[#f8fafc]"
                      classNameLabel="font-medium text-neutrals-100"
                      name="experience"
                      type="number"
                      component={InputField}
                      labelTop="Kinh nghiệm (không bắt buộc)"
                      placeholder="Nhập kinh nghiệm mong muốn"
                    />
                    <FormikField
                      classNameLabel="font-medium text-neutrals-100"
                      name="isYear"
                      component={CheckboxField}
                      labelTop="Theo năm"
                    />
                  </div>
                  <GenderField classNameContainer={"col-span-4"} />
                  <FormikField
                    classNameContainer="col-span-12"
                    name="description"
                    className="bg-[#f8fafc]"
                    component={CkEditerField}
                    label="Mô tả công việc"
                    classNameLabel="font-medium text-neutrals-100"
                    required
                  />
                  
                  <FormikField
                    classNameContainer="col-span-12"
                    className="bg-[#f8fafc]"
                    required
                    classNameLabel="font-medium text-neutrals-100"
                    name="requirements"
                    component={CkEditerField}
                    label="Yêu cầu công việc"
                    placeholder="Nhập các yêu cầu (phân cách bằng dấu phẩy)"
                  />
                  <FormikField
                    classNameContainer="col-span-12"
                    className="bg-[#f8fafc]"
                    required
                    classNameLabel="font-medium text-neutrals-100"
                    name="job_benefit"
                    component={CkEditerField}
                    label="Quyền lợi"
                    placeholder="Mô tả chi tiết quyền lợi"
                  />
                  <FormikField
                    classNameContainer="col-span-12"
                    className="bg-[#f8fafc]"
                    required
                    classNameLabel="font-medium text-neutrals-100"
                    name="work_time"
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
                    type="number"
                    component={InputField}
                    labelTop="Lương tối thiểu"
                    placeholder="Nhập lương tối thiểu"
                  />
                  <FormikField
                    classNameContainer="col-span-6"
                    className="bg-[#f8fafc]"
                    classNameLabel="font-medium text-neutrals-100"
                    name="maxSalary"
                    type="number"
                    component={InputField}
                    labelTop="Lương tối đa"
                    placeholder="Nhập lương tối đa"
                  />
                  {/* Employment Type */}
                  <FormikField
                    classNameContainer="col-span-4"
                    className="bg-[#f8fafc]"
                    required
                    classNameLabel="font-medium text-neutrals-100"
                    name="employment_type"
                    options={employmentTypeOptions}
                    component={AutocompleteField}
                    labelTop="Hình thức làm việc"
                    placeholder="Chọn hình thức làm việc"
                  />
                  <FormikField
                    classNameContainer="col-span-4"
                    className="bg-[#f8fafc]"
                    required
                    classNameLabel="font-medium text-neutrals-100"
                    name="end_date"
                    options={employmentTypeOptions}
                    component={DatePickerField}
                    labelTop="Hạn nộp hồ sơ"
                    placeholder="Nhập danh mục công việc"
                  />
                  <FormikField
                    classNameContainer="col-span-4"
                    className="bg-[#f8fafc]"
                    classNameLabel="font-medium text-neutrals-100"
                    name="quantity"
                    type="number"
                    component={InputField}
                    labelTop="Số lượng tuyển"
                    placeholder="Nhập số lượng tuyển"
                  />
                  {/* Categories */}
                  <SelectCategoryField
                    labelTop={"Danh mục công việc"}
                    className={"bg-[#f8fafc]"}
                  />
                  <SelectLevelField classNameContainer={"col-span-6"} />

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
                    disabled={!values?.province?.value}
                    options={districtOptions}
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
                    disabled={!values?.district?.value}
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
                    name="additional"
                    disabled={!values?.ward?.value}
                    component={InputField}
                    labelTop="Địa chỉ cụ thể"
                    placeholder="Nhập địa chỉ cụ thể"
                  />
                  {/* Submit Button */}
                  <Button
                    className="!bg-primary !text-white col-span-12"
                    size="large"
                    type="submit"
                  >
                    {id ? "Cập nhật bài đăng" : "Đăng bài tuyển dụng"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <CommonStyles.LoadingForm />
      )}
    </>
  );
};
export default CreateEditJobPost;
