import React, { createContext, useState, useContext } from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

// Create context
const SnackbarContext = createContext();

// Custom hook to use Snackbar context
export const useSnackbar = () => useContext(SnackbarContext);

// Snackbar Provider Component
export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    title: "",
    message: "",
    severity: "success", 
  });

  const showSnackbar = (message, severity = "success", title) => {
    setSnackbar({ open: true, title, message, severity });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.title && <AlertTitle>{snackbar.title}</AlertTitle>}
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
