import { apiURL } from "../constants/api";
import httpServices from "./httpServices";
const getAllCategories = async (params) => {
  try {
    const res = await httpServices.get(apiURL.CATEGORY, {
      params: params.queryKey[1],
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
const getCategory = async (params) => {
  return httpServices.get(`${apiURL.CATEGORY}/${params.queryKey[1]}`);
};
const createCategory = (payload) => {
  return httpServices.post(apiURL.CATEGORY, payload);
};
const updateCategory = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${apiURL.CATEGORY}/${id}`, data);
};
const deleteCategory = (id) => {
  return httpServices.delete(`${apiURL.CATEGORY}/${id}`);
};
export {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
