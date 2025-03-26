import React from "react";
import { AutocompleteField, FormikField } from "../CustomFieldsFormik";

const SelectAccountTypeField = ({
  labelTop,
  className,
  classNameContainer = "col-span-6",
  sx,
  size,
  multiple,
  disabled,
}) => {
  const accountTypeOptions = [
    {
      label: "Mặc định",
      value: "default",
    },
    {
      label: "Google",
      value: "google",
    },
  ];
  return (
    <FormikField
      classNameContainer={classNameContainer}
      className={className}
      required
      sx={sx}
      classNameLabel="font-medium text-neutrals-100"
      name="account_type"
      options={accountTypeOptions}
      size={size}
      disabled={disabled}
      multiple={multiple}
      component={AutocompleteField}
      labelTop={labelTop}
      placeholder={"Chọn kiểu tài khoản"}
    />
  );
};

export default SelectAccountTypeField;
