import * as React from "react";
import Popover from "@mui/material/Popover";

export default function CommonPopover({
  body,
  children,
  zIndex = 1200,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
  transformOrigin = { vertical: "top", horizontal: "right" },
  onClick,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (onClick) {
      onClick(event); 
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div onClick={handleClick}>{children}</div>
      <Popover
        sx={{ zIndex }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        disableScrollLock
      >
        {body}
      </Popover>
    </>
  );
}
