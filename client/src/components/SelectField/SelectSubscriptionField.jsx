import React, { useMemo } from "react";
import { AutocompleteField, FormikField } from "../CustomFieldsFormik";
import { useConvertData, useFilters } from "../../hooks";
import { useGetAllSubscriptions } from "../../hooks/modules/subscription/useGetAllSubscriptions";
import { useSelector } from "react-redux";

const SelectSubscriptionField = ({
  labelTop,
  className,
  classNameContainer = "col-span-6",
  sx,
  size,
  multiple,
  disabled,
}) => {
  const { user_id } = useSelector((state) => state.user);
  const { filters } = useFilters({
    page: 1,
    limit: 4,
    employer_id: user_id,
    // status: "active",
    activeOnly: true,
  });
  const { data, isLoading } = useGetAllSubscriptions(filters, {
    enabled: !!user_id,
  });
  const { dataConvert: subscriptions } = useConvertData(data);
  const subscriptionOptions = useMemo(() => {
    if (subscriptions) {
      return subscriptions?.map((item) => {
        return {
          label: item?.package_id?.name,
          value: item._id,
        };
      });
    }
  }, [subscriptions]);
  return (
    <FormikField
      classNameContainer={classNameContainer}
      className={className}
      sx={sx}
      classNameLabel="font-medium text-neutrals-100"
      name="subscription_id"
      options={subscriptionOptions}
      size={size}
      disabled={disabled}
      multiple={multiple}
      component={AutocompleteField}
      labelTop={labelTop}
      placeholder={`${isLoading ? "Đang tải dữ liệu" : "Chọn dịch vụ đang có"}`}
    />
  );
};

export default SelectSubscriptionField;
