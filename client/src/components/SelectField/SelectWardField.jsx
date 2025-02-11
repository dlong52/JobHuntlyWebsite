import React, { useEffect, useMemo } from "react";
import { AutocompleteField, FormikField } from "../CustomFieldsFormik";
import { useAddress } from "../../hooks";

const SelectWardField = ({
  districtId,
  classNameContainer,
  className,
  required,
  placeholder = "Phường/xã",
  variant,
}) => {
  const { wards, fetchWards, loading } = useAddress();
  const wardOptions = useMemo(() => {
    if (wards) {
      return wards.map((item) => ({
        label: item.ward_name,
        value: item.ward_id,
      }));
    }
    return [];
  }, [wards]);
  useEffect(() => {
    if (districtId) {
      fetchWards(districtId);
    }
  }, [districtId]);
  return (
    <FormikField
      classNameContainer={classNameContainer}
      className={className}
      required={required}
      name="ward"
      variant={variant}
      placeholder={loading ? "Đang tải dữ liệu..." : placeholder}
      disabled={districtId ? false : true}
      component={AutocompleteField}
      options={wardOptions}
    />
  );
};

export default SelectWardField;
