import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const sendOtp = (payload) => {
  return httpServices.post(`${apiURL.OTP}/send`, payload);
};
const verifyOtp = (payload) => {
  return httpServices.post(`${apiURL.OTP}/verify`, payload);
};
export const OtpService = {
  sendOtp,
  verifyOtp,
};
