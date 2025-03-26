import React, { useMemo } from "react";
import { AutocompleteField, FormikField } from "../CustomFieldsFormik";
import { useConvertData, useFilters } from "../../hooks";
import { useGetAllPackages } from "../../hooks/modules/package/useGetAllPackages";

const SelectPackageField = ({
  labelTop,
  className,
  classNameContainer = "col-span-6",
  sx,
  size,
  multiple,
  disabled,
}) => {
  const { filters } = useFilters({
    page: 1,
    limit: 10,
  });
  const { data, isLoading } = useGetAllPackages(filters);
  const { dataConvert } = useConvertData(data);
  const packageOptions = useMemo(() => {
    if (dataConvert) {
      return dataConvert?.map((item) => {
        return {
          label: item?.name,
          value: item._id,
        };
      });
    }
  }, [dataConvert]);
  return (
    <FormikField
      classNameContainer={classNameContainer}
      className={className}
      required
      sx={sx}
      classNameLabel="font-medium text-neutrals-100"
      name="package_id"
      options={packageOptions}
      size={size}
      disabled={disabled}
      multiple={multiple}
      component={AutocompleteField}
      labelTop={labelTop}
      placeholder={`${isLoading ? "Đang tải dữ liệu" : "Chọn dịch vụ"}`}
    />
  );
};

export default SelectPackageField;
