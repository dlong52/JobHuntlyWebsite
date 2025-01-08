import React from "react";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import AuthProvider from "./providers/AuthenticationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <SnackbarProvider>
      <AuthProvider>
        <Router>
          <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <App />
            </LocalizationProvider>
          </Provider>
        </Router>
      </AuthProvider>
    </SnackbarProvider>
  </QueryClientProvider>
);
