import { Tooltip } from "@mui/material";
import React from "react";

const TooltipMui = ({ content, children }) => {
  return (
    <Tooltip title={content} arrow>
      {children}
    </Tooltip>
  );
};

export default TooltipMui;
