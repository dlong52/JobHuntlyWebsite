import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Redux
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

// React Router
import { BrowserRouter as Router } from "react-router-dom";

// Date Picker (MUI)
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

// React Query
import { QueryClient, QueryClientProvider } from "react-query";

// Providers
import AuthProvider from "./providers/AuthenticationProvider";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { LoadingUserProvider } from "./providers/LoadingUserProvider.jsx";
import { NotificationProvider } from "./providers/NotificationProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <AuthProvider>
            <LoadingUserProvider>
              <NotificationProvider>
                <Router>
                  <App />
                </Router>
              </NotificationProvider>
            </LoadingUserProvider>
          </AuthProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </Provider>
  </SnackbarProvider>
);
