import { employmentTypeOptions } from "../../constants/enum";
import { FormikField, RadioField } from "../CustomFieldsFormik";
const RadioEmploymentTypeField = ({ classNameContainer }) => {
  const options = [{ label: "Tất cả", value: "" }, ...employmentTypeOptions];

  return (
    <FormikField
      classNameLabel="text-neutrals-100 font-medium text-sm"
      classNameContainer={classNameContainer}
      name="employment_type"
      options={options}
      row
      component={RadioField}
      //   activeColor="#4640DE"
      size="small"
      //   labelTop="Giới tính"
      //   placeholder="Giới tính"
    />
  );
};

export default RadioEmploymentTypeField;
