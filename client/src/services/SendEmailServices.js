import { apiURL } from "../constants/api";
import httpServices from "./httpServices";
const cvViewed = (payload) => {
  return httpServices.post(`${apiURL.SEND_EMAIL}/cv-viewed`, payload);
};
const statusResume = (payload) => {
  return httpServices.post(`${apiURL.SEND_EMAIL}/send-status`, payload);
};
const sendChangePassword = (payload) => {
  return httpServices.post(`${apiURL.SEND_EMAIL}/send-change-password`, payload);
};
const sendVerify = (payload) => {
  return httpServices.post(`${apiURL.SEND_EMAIL}/send-verify`, payload);
};
const sendInvoice = (payload) => {
  return httpServices.post(`${apiURL.SEND_EMAIL}/send-invoice`, payload);
};
const verifyAccount = (token) => {
  return httpServices.get(`${apiURL.SEND_EMAIL}/verify-account?token=${token}`);
};
export const SendEmailServices = {
  cvViewed,
  sendVerify,
  verifyAccount,
  sendChangePassword,
  sendInvoice,
  statusResume
};
