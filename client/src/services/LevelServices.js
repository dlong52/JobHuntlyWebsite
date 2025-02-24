import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getAllLevels = async () => {
  try {
    const res = await httpServices.get(apiURL.LEVEL);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const getLevel = async (params) => {
  return httpServices.get(`${apiURL.LEVEL}/${params.queryKey[1]}`);
};
const createLevel = (payload) => {
  return httpServices.post(apiURL.LEVEL, payload);
};
const updateLevel = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${apiURL.LEVEL}/${id}`, data);
};
const deleteLevel = (id) => {
  return httpServices.delete(`${apiURL.LEVEL}/${id}`);
};
export const levelService = {
  getAllLevels,
  getLevel,
  createLevel,
  updateLevel,
  deleteLevel,
};
