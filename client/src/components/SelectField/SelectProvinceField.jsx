import React, { useMemo } from "react";
import { AutocompleteField, FormikField } from "../CustomFieldsFormik";
import { useAddress } from "../../hooks";

const SelectProvinceField = ({
  classNameContainer,
  className,
  required,
  placeholder = "Tỉnh/thành phố",
  variant,
  disabled,
}) => {
  const { provinces, loading } = useAddress();
  const provinceOptions = useMemo(() => {
    if (provinces) {
      return provinces.map((item) => ({
        label: item.province_name,
        value: item.province_id,
      }));
    }
    return [];
  }, [provinces]);
  return (
    <FormikField
      classNameContainer={classNameContainer}
      className={className}
      required={required}
      name="province"
      variant={variant}
      disabled={disabled}
      placeholder={loading ? "Đang tải dữ liệu..." : placeholder}
      component={AutocompleteField}
      options={provinceOptions}
    />
  );
};

export default SelectProvinceField;
