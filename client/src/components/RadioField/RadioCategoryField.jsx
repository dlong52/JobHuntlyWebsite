import React, { useMemo } from "react";
import { FormikField, RadioField } from "../CustomFieldsFormik";
import { useGetAllCategories } from "../../hooks/modules/category/useGetAllCategories";

const RadioCategoryField = ({ classNameContainer }) => {
  const { data, isLoading } = useGetAllCategories();
  const categories = data?.data;
  const categoryOptions = useMemo(() => {
    if (categories) {
      const options = categories?.map((category) => {
        return {
          label: category.name,
          value: category._id,
        };
      });
      options?.unshift({ label: "Tất cả", value: "" });
      return options
    }
  }, [categories]);
  return (
    <>
      {categories && (
        <FormikField
          classNameLabel="text-neutrals-100 font-medium text-sm"
          classNameContainer={classNameContainer}
          name="category"
          options={categoryOptions}
          row
          component={RadioField}
          size="small"
        />
      )}
    </>
  );
};

export default RadioCategoryField;
