import { Chip } from "@mui/material";
import React from "react";

const ChipMui = ({
  label,
  size,
  onDelete,
  variant,
  color,
  avatar,
  className,
}) => {
  return (
    <Chip
      label={label}
      className={className}
      size={size}
      onDelete={onDelete}
      variant={variant}
      color={color}
      avatar={avatar}
    />
  );
};

export default ChipMui;
