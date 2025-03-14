import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, Slide } from "@mui/material";
import { CommonIcon } from "../../ui";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });
const DialogMUI = ({
  open,
  toggle,
  title,
  body,
  className,
  size,
  isPadding = true,
  disableScrollLock,
}) => {
  const renderBody = () => {
    if (React.isValidElement(body)) {
      return body;
    }
    const Body = body;
    return <Body />;
  };

  return (
    <Dialog
      disableScrollLock={disableScrollLock}
      open={open}
      // TransitionComponent={Transition}
      keepMounted
      onClose={toggle}
      className="p-0"
      aria-describedby="alert-dialog-slide-description"
      sx={{ "& .MuiDialog-paper": { width: "auto", maxWidth: "none" } }} // Set width to auto
    >
      {title && (
        <Box className="shadow relative flex justify-between items-center pr-3">
          <DialogTitle id="customized-dialog-title">
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={toggle}
            sx={(theme) => ({
              // position: "absolute",
              // right: 8,
              // top: "50%",
              // trasi
              color: theme.palette.grey[500],
            })}
          >
            <CommonIcon.Close />
          </IconButton>
        </Box>
      )}
      <DialogContent
        sx={!isPadding ? { padding: 0 } : {}}
        className={className}
      >
        {renderBody()}
      </DialogContent>
    </Dialog>
  );
};
export default DialogMUI;
