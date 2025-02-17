import React, { useMemo } from "react";
import useGetAllLevels from "../../hooks/modules/level/useGetAllLevels";
import { FormikField, RadioField } from "../CustomFieldsFormik";
const RadioLevelField = ({ classNameContainer }) => {
  const { levels } = useGetAllLevels();
  const levelOptions = useMemo(() => {
    if (levels) {
      const options = levels?.data?.map((level) => ({
        label: level?.name,
        value: level?._id,
      }));
      options?.unshift({ label: "Tất cả", value: "" });
      return options;
    }
    return [];
  }, [levels]);

  return (
    <FormikField
      classNameLabel="text-neutrals-100 font-medium text-sm"
      classNameContainer={classNameContainer}
      name="level"
      options={levelOptions}
      row
      component={RadioField}
      //   activeColor="#4640DE"
      size="small"
      //   labelTop="Giới tính"
      //   placeholder="Giới tính"
    />
  );
};

export default RadioLevelField;
