import React, { useEffect, useMemo } from "react";
import { AutocompleteField, FormikField } from "../CustomFieldsFormik";
import { useAddress } from "../../hooks";

const SelectDistrictField = ({
  provinceId,
  classNameContainer,
  className,
  required,
  placeholder = "Quận/huyện",
  variant,
}) => {
  const { districts, fetchDistricts, loading } = useAddress();
  const districtOptions = useMemo(() => {
    if (districts && provinceId) {
      return districts.map((item) => ({
        label: item.district_name,
        value: item.district_id,
      }));
    }
    return [];
  }, [districts]);
  useEffect(() => {
    if (provinceId) {
      fetchDistricts(provinceId);
    }
  }, [provinceId]);
  return (
    <FormikField
      classNameContainer={classNameContainer}
      required={required}
      className={className}
      name="district"
      variant={variant}
      placeholder={loading ? "Đang tải dữ liệu..." : placeholder}
      disabled={provinceId ? false : true}
      component={AutocompleteField}
      options={districtOptions}
    />
  );
};

export default SelectDistrictField;
