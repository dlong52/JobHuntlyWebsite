import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getDetailUser = async (accessToken) => {
  try {
    const res = await httpServices.get(`${apiURL.USER}/details`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching user details:",
      error.response ? error.response.data : error.message
    );
    return res.error;
  }
};
const pushFcmToken = (payload) => {
  return httpServices.post(`${apiURL.USER}/push-fcm-token`, payload);
};

const getAllUsers = async (params) => {
  return httpServices.get(apiURL.USER, { params: params.queryKey[1] });
};
const getUserById = async (params) => {
  return httpServices.get(`${apiURL.USER}/${params.queryKey[1]}`);
};
const createUser = (payload) => {
  return httpServices.User(apiURL.USER, payload);
};
const updateUser = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${apiURL.USER}/${id}`, data);
};
const deleteUser = (id) => {
  return httpServices.delete(`${apiURL.USER}/${id}`);
};
export {
  getUserById,
  getDetailUser,
  pushFcmToken,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
