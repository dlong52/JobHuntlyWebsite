import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

export default function DrawerMui({
  open,
  onClose,
  content,
  anchor = "right",
}) {
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box className="min-h-full" role="presentation" onClick={onClose}>
        {content}
      </Box>
    </Drawer>
  );
}
