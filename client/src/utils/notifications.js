import { upperFirst } from "lodash";
import { useSnackbar } from "../providers/SnackbarProvider";

export const useNotifications = () => {
  const { showSnackbar } = useSnackbar();

  const showSuccess = (
    msg,
    title,
    anchor = { vertical: "top", horizontal: "center" }
  ) => {
    showSnackbar(msg || "Operation successful", "success", title, anchor);
  };

  const showInfo = (
    msg,
    title,
    anchor = { vertical: "top", horizontal: "center" }
  ) => {
    showSnackbar(msg || "Operation successful", "info", title, anchor);
  };

  const showError = (
    error,
    title,
    anchor = { vertical: "top", horizontal: "center" }
  ) => {
    if (error && error.response) {
      const { data } = error.response;
      if (data.errors) {
        showSnackbar(JSON.stringify(data.errors), "error", title, anchor);
        return;
      }
      if (data.title) {
        showSnackbar(JSON.stringify(data.title), "error", title, anchor);
        return;
      }
      if (data.messages && data.messages[0]) {
        showSnackbar(data.messages[0], "error", title, anchor);
        return;
      }
      if (data.messages) {
        showSnackbar(
          upperFirst(data.messages.toString()),
          "error",
          title,
          anchor
        );
        return;
      }
    }

    showSnackbar(
      error?.toString() || "An error occurred",
      "error",
      title,
      anchor
    );
  };

  return { showSuccess, showError, showInfo };
};
