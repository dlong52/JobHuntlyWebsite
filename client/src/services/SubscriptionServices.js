import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getAllSubscriptions = async (params) => {
  return httpServices.get(apiURL.SUBSCRIPTION, { params: params.queryKey[1] });
};
const getSubscription = async (params) => {
  return httpServices.get(`${apiURL.SUBSCRIPTION}/${params.queryKey[1]}`);
};
const createSubscription = (payload) => {
  return httpServices.post(apiURL.SUBSCRIPTION, payload);
};
const updateSubscription = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${apiURL.SUBSCRIPTION}/${id}`, data);
};
const deleteSubscription = (id) => {
  return httpServices.delete(`${apiURL.SUBSCRIPTION}/${id}`);
};

export const SubscriptionService = {
  getAllSubscriptions,
  createSubscription,
  getSubscription,
  deleteSubscription,
  updateSubscription,
};
