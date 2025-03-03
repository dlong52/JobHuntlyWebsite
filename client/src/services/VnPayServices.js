import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const createPaymentUrl = (payload) => {
  return httpServices.post(`${apiURL.VN_PAY}/create-payment`, payload);
};

const paymentReturn = async (params) => {
  return httpServices.get(`${apiURL.VN_PAY}/return?${params}`);
};

export const VnPayServices = {
  createPaymentUrl,
  paymentReturn,
};
