import React from "react";
import ChipMui from "../../../../ui/Chip";

const Status = ({ status }) => {
  return (
    <ChipMui
      variant={"outlined"}
      label={status ? "Đang hoạt động" : "Đã bị khóa"}
      color={status ? "success" : "error"}
    />
  );
};

export default Status;
