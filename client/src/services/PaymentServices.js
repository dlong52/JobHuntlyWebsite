import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getAllPayments = async (params) => {
  return httpServices.get(apiURL.PAYMENT, { params: params.queryKey[1] });
};
const getAllPaymentSummary = async (params) => {
  return httpServices.get(apiURL.PAYMENT_SUMMARY, {
    params: params.queryKey[1],
  });
};
const getRevenueByPackage = async (params) => {
  return httpServices.get(apiURL.REVENUE_BY_PACKAGE, {
    params: params.queryKey[1],
  });
};
const getPayment = async (params) => {
  return httpServices.get(`${apiURL.PAYMENT}/${params.queryKey[1]}`);
};
const createPayment = (payload) => {
  return httpServices.post(apiURL.PAYMENT, payload);
};
const updatePayment = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${apiURL.PAYMENT}/${id}`, data);
};
const deletePayment = (id) => {
  return httpServices.delete(`${apiURL.PAYMENT}/${id}`);
};

export const PaymentService = {
  getRevenueByPackage,
  getAllPaymentSummary,
  getAllPayments,
  createPayment,
  getPayment,
  deletePayment,
  updatePayment,
};
