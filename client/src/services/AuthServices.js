import axios from "axios";
import httpServices from "./httpServices";
import { apiURL } from "../constants/api";
const axiosJwt = axios.create();
const prefixAuthApi = `${import.meta.env.VITE_API}/auth`;

const signIn = async (data) => {
  try {
    const res = await httpServices.post(apiURL.SIGN_IN, data);
    return res.data;
  } catch (error) {
    console.log({ error });

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
      `${prefixAuthApi}/sign-in-google`,
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
    const res = await httpServices.post(`${prefixAuthApi}/sign-up`, data);
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

export { axiosJwt, signIn, signInWithGoogle, signUp, signOut, refreshToken };
