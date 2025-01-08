import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import routes from "./routes/routes";
import { updateUser } from "./redux/userSlice";

import { MainLayout } from "./layouts";

import * as UserService from "./services/UserServices";
import httpServices from "./services/httpServices";
import withPermission from "./HOCs/withPermission";

function App() {  
  const dispatch = useDispatch();
  
  useEffect(() => {
    const storageData = httpServices.getTokenSession();
    if (storageData) {
      handleGetUserDetails(storageData);
    }
  }, []);
  const handleGetUserDetails = async (token) => {
    const res = await UserService.getDetailUser(token);
    dispatch(updateUser({ ...res?.data, accessToken: token }));
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
