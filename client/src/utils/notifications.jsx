// utils/notifications.js
import { upperFirst } from "lodash";
import { useSnackbar } from "../providers/SnackbarProvider";

export const useNotifications = () => {
  const { showSnackbar } = useSnackbar();

  const showSuccess = (msg) => {
    if (typeof msg === "string") {
      showSnackbar(msg, "success");
    } else {
      showSnackbar("Operation successful", "success");
    }
  };

  const showError = (error) => {
    if (error && error.response) {
      const { data } = error.response;
      if (data.errors) {
        showSnackbar(JSON.stringify(data.errors), "error");
        return;
      }
      if (data.title) {
        showSnackbar(JSON.stringify(data.title), "error");
        return;
      }
      if (data.messages && data.messages[0]) {
        showSnackbar(data.messages[0], "error");
        return;
      }
      if (data.messages) {
        showSnackbar(upperFirst(data.messages.toString()), "error");
        return;
      }
    }

    if (typeof error === "string" || error.toString) {
      showSnackbar(error.toString(), "error");
    } else {
      showSnackbar("An error occurred", "error");
    }
  };

  return { showSuccess, showError };
};
