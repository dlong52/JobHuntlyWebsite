import React from "react";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import AuthProvider from "./providers/AuthenticationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider>
    <AuthProvider>
      <Router>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </LocalizationProvider>
        </Provider>
      </Router>
    </AuthProvider>
  </SnackbarProvider>
);
