import React from "react";
import { ROLE } from "../../constants/enum";
import ChipMui from "../Chip";

const RoleChip = ({ role }) => {
  let label = "";
  let color = "";
  if (role === ROLE.ADMIN) {
    label = "Quản trị viên";
    color = "default";
  }
  if (role === ROLE.EMPLOYER) {
    label = "Nhà tuyển dụng";
    color = "secondary";
  }
  if (role === ROLE.CANDIDATE) {
    label = "Ứng viên";
    color = "info";
  }
  return <ChipMui variant={"filled"} label={label} color={color} />;
};

export default RoleChip;
