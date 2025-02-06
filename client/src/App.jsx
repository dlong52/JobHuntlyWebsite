import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import routes from "./routes/routes";
import { updateUser } from "./redux/userSlice";

import { MainLayout } from "./layouts";

import * as UserService from "./services/UserServices";
import httpServices from "./services/httpServices";
import withPermission from "./HOCs/withPermission";
import { onMessageListener } from "../firebaseConfig";
import { useNotifications } from "./utils/notifications";

function App() {
  const dispatch = useDispatch();
  const { showSuccess, showInfo } = useNotifications();
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
  useEffect(() => {
    const messageListener = async (payload) => {
      showSuccess(payload.notification.body, payload.notification.title);
    };
    onMessageListener(messageListener);
    return () => {
      console.log("Unsubscribing from notifications.");
    };
  }, []);

  useEffect(() => {
    const storageData = httpServices.getTokenStorage();
    if (storageData) {
      handleGetUserDetails(storageData);
    }
  }, []);
  const handleGetUserDetails = async (token) => {
    const res = await UserService.getDetailUser(token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    <Routes>
      {routes.map((route, index) => {
        const Page = route.component;
        let Layout = MainLayout;

        const WrappedPage = withPermission(Page, route.permissionAllow || []);

        if (route.layout) Layout = route.layout;
        if (route.layout === null) Layout = Fragment;

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <WrappedPage />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
