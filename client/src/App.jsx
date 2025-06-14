import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import routes from "./routes/routes";
import { updateUser } from "./redux/userSlice";

import { MainLayout } from "./layouts";

import * as UserService from "./services/UserServices";
import httpServices from "./services/httpServices";
import withPermission from "./HOCs/withPermission";
import { onMessageListener } from "../firebaseConfig";
import { useNotifications } from "./utils/notifications";
import { useLoadingUser } from "./providers/LoadingUserProvider";
import { ROLE } from "./constants/enum";
import CrispChat from "./components/CrispChat";
import { useNotification } from "./providers/NotificationProvider";
import PrivateRoute from "./components/PrivateRoute";
import { useGetActivePackage } from "./hooks/modules/subscription/useGetActivePackage";
import { useConvertData } from "./hooks";

function App() {
  const { setIsLoading } = useLoadingUser();
  const { refetch } = useNotification();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { showInfo } = useNotifications();
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
      showInfo(payload.notification.body, payload.notification.title);
      refetch();
    };
    onMessageListener(messageListener);
    return () => {
      console.log("Unsubscribing from notifications.");
    };
  }, []);

  const storageData = httpServices.getTokenStorage();
  useEffect(() => {
    if (!!storageData) {
      handleGetUserDetails(storageData);
    }
  }, [storageData]);
  const handleGetUserDetails = async (token) => {
    setIsLoading(true);
    const res = await UserService.getDetailUser(token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    setIsLoading(false);
  };
  return (
    <>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.component;
          let Layout = MainLayout;
          const isMustLogin = route.mustLogin;

          const WrappedPage = withPermission(Page, route.permissionAllow || [], route?.packages);

          const CheckingPrivateComponent = isMustLogin
            ? PrivateRoute
            : Fragment;

          if (route.layout) Layout = route.layout;
          if (route.layout === null) Layout = Fragment;
          let isShowCrisp = true;
          if (route.showCrisp === false) {
            isShowCrisp = false;
          }
          
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <CheckingPrivateComponent>
                  <Layout>
                    {[ROLE.EMPLOYER, ROLE.CANDIDATE].includes(user?.role) &&
                      isShowCrisp && (
                        <CrispChat
                          email={
                            user?.role == ROLE.CANDIDATE ||
                            user?.role === ROLE.EMPLOYER
                              ? user?.email
                              : ""
                          }
                          name={
                            user?.role == ROLE.CANDIDATE ||
                            user?.role === ROLE.EMPLOYER
                              ? user?.username
                              : ""
                          }
                        />
                      )}
                    <WrappedPage />
                  </Layout>
                </CheckingPrivateComponent>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
