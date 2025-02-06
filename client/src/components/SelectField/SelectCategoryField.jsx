import React, { useMemo } from "react";
import { AutocompleteField, FormikField } from "../CustomFieldsFormik";
import { useGetAllCategories } from "../../hooks/modules/category/useGetAllCategories";

const SelectCategoryField = ({ labelTop, className, sx, size }) => {
  const { data, isLoading } = useGetAllCategories();
  const categories = data?.data;
  const categoryOptions = useMemo(() => {
    if (categories) {
      return categories?.map((category) => {
        return {
          label: category.name,
          value: category._id,
        };
      });
    }
  }, [categories]);
  return (
    <>
      {categories && (
        <FormikField
          classNameContainer="col-span-6"
          className={className}
          required
          sx={sx}
          classNameLabel="font-medium text-neutrals-100"
          name="categories"
          options={categoryOptions}
          size={size}
          component={AutocompleteField}
          labelTop={labelTop}
          placeholder={`${
            isLoading ? "Đang tải dữ liệu" : "Nhập danh mục công việc"
          }`}
        />
      )}
    </>
  );
};

export default SelectCategoryField;
