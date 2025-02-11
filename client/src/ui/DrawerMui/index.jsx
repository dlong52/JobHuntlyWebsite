import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";

const CustomDrawer = ({ anchor, open, onClose, onOpen, content }) => {
  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        {content}
      </Box>
    </SwipeableDrawer>
  );
};

export default function DrawerMui() {
  const [drawerState, setDrawerState] = React.useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setDrawerState((prevState) => ({ ...prevState, [anchor]: open }));
  };

  const sampleContent = (
    <Box>
      <p>Custom Content Here</p>
    </Box>
  );

  return (
    <div>
      {["left", "right", "top", "bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <CustomDrawer
            anchor={anchor}
            open={drawerState[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            content={sampleContent}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
