import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getAllNotifications = async (user_id, params) => {
  return httpServices.get(`${apiURL.NOTIFICATION}/${user_id}`, {
    params: params.queryKey[1],
  });
};
const getNotifications = async (params) => {
  return httpServices.get(`${apiURL.NOTIFICATION}`, {
    params: params.queryKey[1],
  });
};
const createNotification = (payload) => {
  return httpServices.post(apiURL.NOTIFICATION, payload);
};
const sendToUser = (payload) => {
  return httpServices.post(`${apiURL.NOTIFICATION}/send-to-user`, payload);
};
const sendToAll = (payload) => {
  return httpServices.post(`${apiURL.NOTIFICATION}/send-to-all`, payload);
};
const updateNotification = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${apiURL.NOTIFICATION}/${id}`, data);
};
const deleteNotification = (id) => {
  return httpServices.delete(`${apiURL.NOTIFICATION}/${id}`);
};
const markAllNotifications = (userId) => {
  return httpServices.patch(`${apiURL.NOTIFICATION}/${userId}/read-all`);
};
export const NotificationService = {
  getAllNotifications,
  createNotification,
  getNotifications,
  deleteNotification,
  updateNotification,
  sendToUser,
  markAllNotifications,
  sendToAll
};
