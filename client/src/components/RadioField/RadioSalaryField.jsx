import { FormikField, RadioField } from "../CustomFieldsFormik";
import { salaryOptions } from "../../constants/enum";
const RadioSalaryField = ({ classNameContainer }) => {
  return (
    <FormikField
      classNameLabel="text-neutrals-100 font-medium text-sm"
      classNameContainer={classNameContainer}
      name="salary"
      options={salaryOptions}
      row
      component={RadioField}
      //   activeColor="#4640DE"
      size="small"
      //   labelTop="Giới tính"
      //   placeholder="Giới tính"
    />
  );
};

export default RadioSalaryField;
