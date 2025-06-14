import React from "react";
import RadioField from "./RadioField"
import FormikField from "./FormikField"
import { genderOptions } from "../../constants/enum";
const GenderField = ({classNameContainer}) => {
  return (
    <FormikField
      classNameLabel="font-medium text-neutrals-100"
      classNameContainer={classNameContainer}
      name="gender"
      options={genderOptions}
      row
      component={RadioField}
      size="small"
      labelTop="Giới tính"
      placeholder="Giới tính"
    />
  );
};

export default GenderField;
