import React, { useMemo } from "react";
import { AutocompleteField, FormikField } from "../CustomFieldsFormik";
import { useGetAllRoles } from "../../hooks/modules/role/useGetAllRoles";
import { ROLE } from "../../constants/enum";

const SelectRoleField = ({
  labelTop,
  className,
  classNameContainer = "col-span-6",
  sx,
  size,
  multiple,
}) => {
  const { data, isLoading } = useGetAllRoles();
  const roles = data?.data?.data;
  const roleOptions = useMemo(() => {
    if (roles) {
      return roles?.map((role) => {
        const roleName =
          role.name === ROLE.ADMIN
            ? "Quản trị viên"
            : role.name === ROLE.EMPLOYER
            ? "Nhà tuyển dụng"
            : "Ứng viên";
        return {
          label: roleName,
          value: role._id,
        };
      });
    }
  }, [roles]);
  return (
    <FormikField
      classNameContainer={classNameContainer}
      className={className}
      required
      sx={sx}
      classNameLabel="font-medium text-neutrals-100"
      name="role"
      options={roleOptions}
      size={size}
      multiple={multiple}
      component={AutocompleteField}
      labelTop={labelTop}
      placeholder={`${isLoading ? "Đang tải dữ liệu" : "Chọn vai trò"}`}
    />
  );
};

export default SelectRoleField;
