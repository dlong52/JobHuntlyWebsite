import React, { useEffect, useMemo } from "react";
import { FormikField } from "../CustomFieldsFormik";
import { useAddress } from "../../hooks";

const SelectDistrictField = ({ provinceId }) => {
  const { districts, fetchDistricts } = useAddress();
  const districtOptions = useMemo(() => {
    if (districts) {
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
      name="district"
      disabled={!!districts ? false : true}
      component={AutocompleteField}
      options={districtOptions}
    />
  );
};

export default SelectDistrictField;
