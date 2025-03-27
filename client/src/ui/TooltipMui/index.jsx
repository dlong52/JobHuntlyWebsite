import { Tooltip } from "@mui/material";
import React from "react";

const TooltipMui = ({ content, children, sx, arrow = true }) => {
  return (
    <Tooltip
      title={content}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                boundary: "window",
              },
            },
          ],
        },
        tooltip: {
          sx: {
            backgroundColor: "var(--neutrals-100)",
            color: "white",
            fontSize: "12px",
          },
        },
        arrow: {
          sx: {
            color: "var(--neutrals-100)",
          },
        },
      }}
      arrow={arrow}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipMui;
