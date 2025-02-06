import React, { useMemo } from "react";
import { AutocompleteField, FormikField } from "../CustomFieldsFormik";
import useGetAllLevels from "../../hooks/modules/level/useGetAllLevels";

const SelectLevelField = ({classNameContainer}) => {
  const { levels, error, loading } = useGetAllLevels();
  const levelOptions = useMemo(() => {
    if (levels) {
      return levels?.data?.map((level) => {
        return {
          label: level.name,
          value: level._id,
        };
      });
    }
  }, [levels]);
  return (
    <>
      {levels && (
        <FormikField
          classNameContainer={classNameContainer}
          className="bg-[#f8fafc]"
          required
          classNameLabel="font-medium text-neutrals-100"
          name="level"
          options={levelOptions}
          component={AutocompleteField}
          labelTop="Cấp bậc"
          placeholder="Chọn cấp bậc"
        />
      )}
    </>
  );
};

export default SelectLevelField;
