import React, { useMemo } from "react";
import { AutocompleteField, FormikField } from "../CustomFieldsFormik";
import { useAddress } from "../../hooks";

const SelectProvinceField = () => {
  const { provinces } = useAddress();
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
      required
      name="province"
      variant="standard"
      placeholder="Địa điểm"
      component={AutocompleteField}
      options={provinceOptions}
    />
  );
};

export default SelectProvinceField;
