import { Box, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import {
  CkEditerField,
  FormikField,
  InputField,
} from "../../../../../../components/CustomFieldsFormik";
import SelectProvinceField from "../../../../../../components/SelectField/SelectProvinceField";
import SelectDistrictField from "../../../../../../components/SelectField/SelectDistrictField";
import SelectWardField from "../../../../../../components/SelectField/SelectWardField";
import { Button } from "../../../../../../ui";
import { CompanyService } from "../../../../../../services/CompanyServices";
import { useNotifications } from "../../../../../../utils/notifications";
import { useGetCompany } from "../../../../../../hooks/modules/company/useGetCompany";
import useConvertData from "../../../../../../hooks/useConvertData";
import SelectCategoryField from "../../../../../../components/SelectField/SelectCategoryField";

const EditCompanyInfo = () => {
  const user = useSelector((state) => state.user);
  const { showSuccess, showError } = useNotifications();
  const { data, isLoading } = useGetCompany(user?.company_id, {
    enable: !!user?.company_id,
  });
  const { dataConvert } = useConvertData(data);

  const handleSubmit = async (values) => {
    const payload = {
      description: values?.description,
      name: values?.name,
      phone: values?.phone,
      website: values?.website,
      introduce: values?.introduce,
      categories: values?.categories?.map((item) => item?.value),
      staff_quantity: {
        min: values?.min_staff,
        max: values?.max_staff,
      },
      address: {
        province: {
          id: values?.province?.value,
          name: values?.province?.label,
        },
        district: {
          id: values?.district?.value,
          name: values?.district?.label,
        },
        ward: {
          id: values?.ward?.value,
          name: values?.ward?.label,
        },
        additional_info: values?.additional_info,
      },
    };
    try {
      await CompanyService.updateCompany({
        id: user?.company_id,
        ...payload,
      });
      showSuccess("Cập nhật thông tin công ty thành công");
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Box className="p-4 w-full">
      {!isLoading && (
        <Formik
          initialValues={{
            description: dataConvert?.description,
            name: dataConvert?.name,
            phone: dataConvert?.phone,
            website: dataConvert?.website,
            introduce: dataConvert?.introduce,
            min_staff: dataConvert?.staff_quantity?.min,
            max_staff: dataConvert?.staff_quantity?.max,
            categories:
              dataConvert?.categories?.length !== 0
                ? dataConvert?.categories?.map((item) => {
                    return {
                      label: item?.name,
                      value: item?._id,
                    };
                  })
                : [],
            province: {
              label: dataConvert?.address?.province?.name,
              value: dataConvert?.address?.province?.id,
            },
            district: {
              label: dataConvert?.address?.district?.name,
              value: dataConvert?.address?.district?.id,
            },
            ward: {
              label: dataConvert?.address?.ward?.name,
              value: dataConvert?.address?.ward?.id,
            },
            additional_info: dataConvert?.address?.additional_info,
          }}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => {
            return (
              <Form className="grid grid-cols-12 gap-4 w-full text-neutrals-100">
                <FormikField
                  classNameContainer="col-span-6"
                  classNameLabel="font-medium text-neutrals-80"
                  name="name"
                  component={InputField}
                  label="Tên doanh nghiệp"
                />
                <FormikField
                  classNameContainer="col-span-6"
                  classNameLabel="font-medium text-neutrals-80"
                  name="phone"
                  component={InputField}
                  label="Số điện thoại"
                />
                <FormikField
                  classNameContainer=" col-span-6"
                  classNameLabel="font-medium text-neutrals-80"
                  name="website"
                  component={InputField}
                  label="Website"
                />
                <SelectCategoryField multiple />
                <FormikField
                  classNameContainer=" col-span-12"
                  classNameLabel="font-medium text-neutrals-80"
                  name="description"
                  component={InputField}
                  multiline
                  rows={3}
                  label="Mô tả"
                />
                <SelectProvinceField classNameContainer="col-span-3" />
                <SelectDistrictField
                  classNameContainer="col-span-3"
                  provinceId={
                    values?.province?.value ? values?.province.value : undefined
                  }
                />
                <SelectWardField
                  classNameContainer="col-span-3"
                  districtId={
                    values?.district?.value ? values?.district.value : undefined
                  }
                />
                <FormikField
                  classNameContainer="col-span-3"
                  classNameLabel="font-medium text-neutrals-80"
                  name="additional_info"
                  disabled={values?.ward?.value ? false : true}
                  component={InputField}
                  label="Địa chỉ cụ thể"
                />
                <Box className="col-span-12 flex flex-col gap-2">
                  <Typography fontWeight={500}>Số lượng nhân viên</Typography>
                  <Box className="flex gap-4">
                    <FormikField
                      name="min_staff"
                      component={InputField}
                      type="number"
                      label="Tối thiểu"
                    />
                    <FormikField
                      name="max_staff"
                      component={InputField}
                      type="number"
                      label="Tối đa"
                    />
                  </Box>
                </Box>
                <FormikField
                  classNameContainer="col-span-12"
                  name="introduce"
                  component={CkEditerField} // Sử dụng CKEditor làm component
                  label="Giới thiệu về công ty"
                  classNameLabel="font-medium text-neutrals-100"
                />
                <Button
                  type={"submit"}
                  className={"col-span-3 !bg-primary !text-white"}
                >
                  Cập nhật
                </Button>
              </Form>
            );
          }}
        </Formik>
      )}
    </Box>
  );
};

export default EditCompanyInfo;
