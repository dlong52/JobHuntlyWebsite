import React from "react";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { QueryClient, QueryClientProvider } from "react-query";
// Providers
import AuthProvider from "./providers/AuthenticationProvider";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { LoadingUserProvider } from "./providers/LoadingUserProvider.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider>
    <AuthProvider>
      <Router>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <QueryClientProvider client={queryClient}>
              <LoadingUserProvider>
                <App />
              </LoadingUserProvider>
            </QueryClientProvider>
          </LocalizationProvider>
        </Provider>
      </Router>
    </AuthProvider>
  </SnackbarProvider>
);
