import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import HttpService from "../services/httpServices";
import { signInWithGoogle } from "../services/AuthServices";
import {
  auth,
  provider,
  requestForToken,
  signInWithPopup,
} from "../../firebaseConfig";
import { useNotifications } from "../utils/notifications";
import helpers from "../utils/helpers";
import { apiURL } from "../constants/api";
import { RouteBase } from "../constants/routeUrl";
import { updateUser } from "../services/UserServices";
const AuthenticationContext = createContext({
  token: "",
  isLogged: false,
  isLoggingOut: false,
  isLogging: false,
  signIn: () => {},
  logout: () => {},
  signInGoogle: () => {},
  serviceSelected: "",
  chooseService: () => {},
  userInfo: {},
});

export const useAuthentication = () => useContext(AuthenticationContext);

const AuthProvider = ({ children }) => {
  const tokenLocalStorage = HttpService.getTokenStorage();
  const servicesLocalStorage = HttpService.getServiceStorage();

  //! State
  const [isLogged, setIsLogged] = useState(tokenLocalStorage ? true : false);
  const [isLoggingOut, setLoggingOut] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [serviceSelected, setServiceSelected] = useState(
    servicesLocalStorage ? servicesLocalStorage : ""
  );
  const [token, setToken] = useState(tokenLocalStorage || "");
  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    const service = HttpService.getServiceStorage();
    if (tokenLocalStorage) {
      setIsLogged(true);
      HttpService.attachTokenToHeader(tokenLocalStorage);
    }
    if (service) setServiceSelected(service);
  }, []);

  //! Function
  const chooseService = useCallback((arg) => {
    setServiceSelected(arg);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      setIsLogging(true);
      await helpers.sleepTime(1500);

      await requestForToken(email);
      const res = await HttpService.post(apiURL.SIGN_IN, { email, password });
      const { access_token } = res.data.data;

      HttpService.saveTokenStorage(access_token);
      HttpService.attachTokenToHeader(access_token);

      showSuccess("Đăng nhập thành công");
      setToken(access_token);
      setIsLogged(true);
      setIsLogging(false);
      return res.data;
    } catch (error) {
      setIsLogging(false);
      return error.response.data;
    }
  }, []);

  const signInGoogle = useCallback(async (role) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      console.log({ token });

      const res = await signInWithGoogle(token, role);

      if (res?.status === "success") {
        showSuccess(res?.message);
        navigate(RouteBase.Home);
        return;
      }
      showError(res.message);
    } catch (error) {
      console.error("Error during Google login: ", error);
    }
  }, []);

  const logout = useCallback(async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoggingOut(true);
        setIsLogged(false);
        HttpService.clearUserInfoStorage();
        HttpService.clearTokenStorage();
        HttpService.clearServiceStorage();
        sessionStorage.removeItem("path");
        sessionStorage.clear();
        await updateUser({
          id: id,
          fcmToken: null,
        });
        window.location.href = RouteBase.SignIn;
        resolve();
      } catch (error) {
        showError(error.toString());
        setLoggingOut(false);
        reject(error);
      }
    });
  }, []);

  //! Render
  const value = useMemo(() => {
    return {
      isLogged,
      isLoggingOut,
      isLogging,
      signIn,
      signInGoogle,
      logout,
      serviceSelected,
      chooseService,
      token,
    };
  }, [
    isLogged,
    signIn,
    logout,
    serviceSelected,
    isLogging,
    isLoggingOut,
    chooseService,
    token,
  ]);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthProvider;
