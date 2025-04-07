import { upperFirst } from "lodash";
import { useSnackbar } from "../providers/SnackbarProvider";
import React from "react";

export const useNotifications = () => {
  const { showSnackbar } = useSnackbar();

  // Memoize these functions to prevent unnecessary re-renders
  const showSuccess = React.useCallback(
    (msg = "Operation successful", title, anchor = { vertical: "top", horizontal: "center" }) => {
      showSnackbar(msg, "success", title, anchor);
    },
    [showSnackbar]
  );

  const showInfo = React.useCallback(
    (msg = "Operation successful", title, anchor = { vertical: "top", horizontal: "center" }) => {
      showSnackbar(msg, "info", title, anchor);
    },
    [showSnackbar]
  );

  const showError = React.useCallback(
    (error, title, anchor = { vertical: "top", horizontal: "center" }) => {
      if (error?.response?.data) {
        const { data } = error.response;
        
        // Use early returns for better readability
        if (data.errors) {
          showSnackbar(JSON.stringify(data.errors), "error", title, anchor);
          return;
        }
        
        if (data.title) {
          showSnackbar(JSON.stringify(data.title), "error", title, anchor);
          return;
        }
        
        if (data.messages) {
          // Handle both array and non-array messages
          const message = Array.isArray(data.messages) && data.messages[0] 
            ? data.messages[0] 
            : upperFirst(data.messages.toString());
          
          showSnackbar(message, "error", title, anchor);
          return;
        }
      }
      
      showSnackbar(
        error?.toString() || "An error occurred",
        "error",
        title,
        anchor
      );
    },
    [showSnackbar]
  );

  // Return memoized object to prevent unnecessary re-renders
  return React.useMemo(
    () => ({ showSuccess, showError, showInfo }),
    [showSuccess, showError, showInfo]
  );
};