import axios from "axios";
import httpServices from "./httpServices";
import { apiURL } from "../constants/api";
const axiosJwt = axios.create();

const signIn = async (data) => {
  try {
    const res = await httpServices.post(apiURL.SIGN_IN, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const signInWithGoogle = async (
  token,
  account_type = "google",
  role = "candidate"
) => {
  try {
    const res = await axios.post(
      apiURL.SIGN_IN_GOOGLE,
      { token, account_type, role },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
const signUp = async (data) => {
  try {
    const res = await httpServices.post(apiURL.SIGN_UP, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const signOut = async (data) => {
  try {
    const res = await httpServices.post(`${prefixAuthApi}/sign-out`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

const refreshToken = async () => {
  try {
    const res = await httpServices.post(
      `${prefixAuthApi}/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
const changePassword = (payload) => {
  return httpServices.post(`${apiURL.CHANGE_PASSWORD}`, payload);
};
const resetPassword = (payload) => {
  return httpServices.post(`${apiURL.RESET_PASSWORD}`, payload);
};
export {
  axiosJwt,
  signIn,
  signInWithGoogle,
  signUp,
  signOut,
  refreshToken,
  changePassword,
  resetPassword
};
