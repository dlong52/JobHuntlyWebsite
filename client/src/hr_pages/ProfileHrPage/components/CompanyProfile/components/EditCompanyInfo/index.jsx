import { Box } from "@mui/material";
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

const EditCompanyInfo = () => {
  const user = useSelector((state) => state.user);
  const { showSuccess } = useNotifications();
  const handleSubmit = async (values) => {
    const payload = {
      description: values?.description,
      name: values?.name,
      phone: values?.phone,
      website: values?.website,
      introduce: values?.introduce,
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
      showSuccess("Cập nhật thông tin công ty thành công")
    } catch (error) {}
  };
  return (
    <Box className="p-4 w-full">
      <Formik
        initialValues={{
          name: user?.company_name,
          phone: user?.company_phone_number,
          introduce: user?.company_introduce,
          description: user?.company_description,
          province: {
            label: user.company_address?.province?.name,
            value: user.company_address?.province?.id,
          },
          district: {
            label: user.company_address?.district?.name,
            value: user.company_address?.district?.id,
          },
          ward: {
            label: user.company_address?.ward?.name,
            value: user.company_address?.ward?.id,
          },
          additional_info: user.company_address?.additional_info
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
              <FormikField
                classNameContainer="col-span-12"
                name="introduce"
                component={CkEditerField} // Sử dụng CKEditor làm component
                label="Giới thiệu về công ty"
                classNameLabel="font-medium text-neutrals-100"
              />
              <Button type={"submit"} className={"col-span-3 !bg-primary !text-white"}>
                Cập nhật
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default EditCompanyInfo;
