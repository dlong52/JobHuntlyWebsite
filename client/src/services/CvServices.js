import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getAllCVs = async (params) => {
  return httpServices.get(apiURL.CV, { params: params.queryKey[1] });
};
const getCV = async (params) => {
  return httpServices.get(`${apiURL.CV}/${params.queryKey[1]}`);
};
const createCV = (payload) => {
  return httpServices.post(apiURL.CV, payload);
};
const updateCV = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${apiURL.CV}/${id}`, data);
};
const deleteCV = (id) => {
  return httpServices.delete(`${apiURL.CV}/${id}`);
};

export const CVService = {
  getAllCVs,
  createCV,
  getCV,
  deleteCV,
  updateCV,
};
