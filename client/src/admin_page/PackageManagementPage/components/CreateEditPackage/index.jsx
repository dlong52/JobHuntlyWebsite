import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useMemo } from "react";
import {
  CheckboxField,
  CkEditerField,
  FormikField,
  InputField,
} from "../../../../components/CustomFieldsFormik";
import { initialValues, validationSchema } from "./form";
import { useNotifications } from "../../../../utils/notifications";
import { PackageService } from "../../../../services/PackageServices";
import { useGetPackage } from "../../../../hooks/modules/package/useGetPackage";
import { CommonStyles } from "../../../../ui";

const CreateEditPackage = ({ id, toggle, refetch }) => {
  const { showSuccess, showError } = useNotifications();
  const { data, isLoading } = useGetPackage(id, { enabled: !!id });
  const handleSubmit = async (values) => {
    const payload = {
      ...(id && { id }),
      name: values?.name,
      introduce: values?.introduce,
      discount: values?.discount,
      description: values?.description,
      price: values?.price,
      job_post_limit: values?.job_post_limit,
      duration_in_days: values?.duration_in_days,
      is_featured: values?.is_featured,
      active: values?.active,
    };
    try {
      id
        ? await PackageService.updatePackage(payload)
        : await PackageService.createPackage(payload);
      showSuccess(
        id ? "Cập nhật dịch vụ thành công!" : "Đã thêm mới 1 dịch vụ"
      );
      refetch();
      toggle();
    } catch (error) {
      showError(error);
      return error;
    }
  };
  const initialValuesEdit = useMemo(() => {
    if (data) {
      const detailData = data?.data?.data;
      return {
        name: detailData?.name,
        introduce: detailData?.introduce,
        discount: detailData?.discount,
        description: detailData?.description,
        price: detailData?.price,
        job_post_limit: detailData?.job_post_limit,
        duration_in_days: detailData?.duration_in_days,
        is_featured: detailData?.is_featured,
        active: detailData?.active,
      };
    }
  }, [data]);
  const checkEdit = id ? !!data : true;
  return (
    <>
      {checkEdit && !isLoading ? (
        <Formik
          initialValues={initialValuesEdit || initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({}) => {
            return (
              <Form className="flex flex-col w-[1000px] relative">
                <Box className="grid grid-cols-12 gap-4 p-5">
                  <FormikField
                    classNameContainer="col-span-6"
                    className="bg-[#f8fafc]"
                    required
                    classNameLabel="font-medium text-neutrals-100"
                    name="name"
                    component={InputField}
                    labelTop="Tên gói dịch vụ"
                    placeholder="Nhập tên gói dịch vụ"
                  />
                  <FormikField
                    classNameContainer="col-span-6"
                    className="bg-[#f8fafc]"
                    required
                    classNameLabel="font-medium text-neutrals-100"
                    name="introduce"
                    component={InputField}
                    labelTop="Giới thiệu gói dịch vụ"
                    placeholder="Giới thiệu gói dịch vụ"
                  />
                  <FormikField
                    classNameContainer="col-span-12"
                    name="description"
                    component={CkEditerField}
                    label="Mô tả chi tiết gói dịch vụ"
                    classNameLabel="font-medium text-neutrals-100"
                    required={true}
                  />
                  <FormikField
                    classNameContainer="col-span-6"
                    className="bg-[#f8fafc]"
                    classNameLabel="font-medium text-neutrals-100"
                    name="price"
                    type="number"
                    component={InputField}
                    labelTop="Giá gói dịch vụ"
                    placeholder="Nhập giá dịch vụ"
                  />
                  <FormikField
                    classNameContainer="col-span-6"
                    className="bg-[#f8fafc]"
                    classNameLabel="font-medium text-neutrals-100"
                    name="discount"
                    type="number"
                    component={InputField}
                    labelTop="Giảm giá (Nếu có)"
                    placeholder="Nhập % giảm giá dịch vụ"
                  />
                  <FormikField
                    classNameContainer="col-span-6"
                    className="bg-[#f8fafc]"
                    classNameLabel="font-medium text-neutrals-100"
                    name="job_post_limit"
                    type="number"
                    component={InputField}
                    labelTop="Số lượng tin tuyển dụng tối đa "
                    placeholder="Nhập số lương tin tối đa có thể đăng"
                  />
                  <FormikField
                    classNameContainer="col-span-6"
                    className="bg-[#f8fafc]"
                    classNameLabel="font-medium text-neutrals-100"
                    name="duration_in_days"
                    type="number"
                    component={InputField}
                    labelTop="Thời gian hiệu lực( Tính theo ngày )"
                    placeholder="Nhập số ngày hiệu lực dịch vụ"
                  />
                  <FormikField
                    classNameContainer="col-span-3"
                    classNameLabel="font-medium select-none text-neutrals-100 italic "
                    name="is_featured"
                    component={CheckboxField}
                    labelTop="Đánh dấu đặc trưng"
                  />
                  <FormikField
                    classNameContainer="col-span-3"
                    classNameLabel="font-medium select-none text-neutrals-100 italic "
                    name="active"
                    component={CheckboxField}
                    labelTop="Hoạt động"
                  />
                  <Button
                    className="!bg-primary !text-white col-span-12"
                    size="large"
                    type="submit"
                  >
                    {id ? "Cập nhật bài đăng" : "Thêm mới gói dịch vụ"}
                  </Button>
                </Box>
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
export default CreateEditPackage;
