import { Box, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import {
  FormikField,
  InputField,
} from "../../../../components/CustomFieldsFormik";
import SelectProvinceField from "../../../../components/SelectField/SelectProvinceField";
import SelectDistrictField from "../../../../components/SelectField/SelectDistrictField";
import SelectWardField from "../../../../components/SelectField/SelectWardField";
import { Button } from "../../../../ui";
import { useNotifications } from "../../../../utils/notifications";
import { updateUser } from "../../../../services/UserServices";
import DatePickerField from "../../../../components/CustomFieldsFormik/DatePickerField";
import moment from "moment";

const UpdateInfoForm = () => {
  const user = useSelector((state) => state.user);
  const { showSuccess, showError } = useNotifications();

  const handleSubmit = async (values) => {
    const payload = {
      "profile.name": values.name,
      "profile.birthday": values.birthday,
      "profile.phone_number": values.phone,
      "profile.address.province": {
        id: values.province.value,
        name: values.province.label,
      },
      "profile.address.district": {
        id: values.district.value,
        name: values.district.label,
      },
      "profile.address.ward": {
        id: values.ward.value,
        name: values.ward.label,
      },
      "profile.address.additional_info": values.additional_info,
    };
    try {
      await updateUser({
        id: user?.user_id,
        ...payload,
      });
      showSuccess("Cập nhật thông tin thành công");
    } catch (error) {
      showError(error);
    }
  };
  return (
    <Box className="p-4 w-full">
      <Formik
        initialValues={{
          name: user?.username,
          email: user?.email,
          phone: user?.phone_number,
          birthday: moment(user?.birthday).format("MM/DD/YYYY"),
          province: {
            label: user?.address?.province?.name,
            value: user?.address?.province?.id,
          },
          district: {
            label: user?.address?.district?.name,
            value: user?.address?.district?.id,
          },
          ward: {
            label: user?.address?.ward?.name,
            value: user?.address?.ward?.id,
          },
          additional_info: user?.address?.additional_info,
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
                className="bg-[#f8fafc]"
                component={InputField}
                label="Họ tên"
              />
              <FormikField
                classNameContainer=" col-span-6"
                classNameLabel="font-medium text-neutrals-80"
                name="email"
                disabled
                className=" bg-[#f8fafc]"
                component={InputField}
                label="Email"
              />
              <FormikField
                classNameContainer="col-span-6"
                classNameLabel="font-medium text-neutrals-80"
                name="phone"
                className=" bg-[#f8fafc]"
                component={InputField}
                label="Số điện thoại"
              />
              <FormikField
                classNameContainer=" col-span-6"
                className=" bg-[#f8fafc]"
                classNameLabel="font-medium text-neutrals-80"
                name="birthday"
                component={DatePickerField}
                label="Mô tả"
              />
              <Box className="col-span-12">
                <Typography className="!text-neutrals-80" fontWeight={500}>
                  Địa chỉ
                </Typography>
                <Box className="grid grid-cols-12 gap-4 mt-2">
                  <SelectProvinceField classNameContainer="col-span-4 bg-[#f8fafc]" />
                  <SelectDistrictField
                    classNameContainer="col-span-4 bg-[#f8fafc]"
                    provinceId={
                      values?.province?.value
                        ? values?.province.value
                        : undefined
                    }
                  />
                  <SelectWardField
                    classNameContainer="col-span-4 bg-[#f8fafc]"
                    districtId={
                      values?.district?.value
                        ? values?.district.value
                        : undefined
                    }
                  />
                  <FormikField
                    classNameContainer="col-span-12"
                    className=" bg-[#f8fafc]"
                    classNameLabel="font-medium text-neutrals-80"
                    name="additional_info"
                    disabled={values?.ward?.value ? false : true}
                    component={InputField}
                    label="Địa chỉ cụ thể"
                  />
                </Box>
              </Box>
              <Button
                type={"submit"}
                size={"large"}
                className={"col-span-3 !bg-primary !normal-case !text-white"}
              >
                Cập nhật
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default UpdateInfoForm;
