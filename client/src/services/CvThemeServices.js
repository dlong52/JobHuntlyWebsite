import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getAllCvThemes = async (params) => {
  return httpServices.get(apiURL.CV_THEME, { params: params.queryKey[1] });
};
const getCvTheme = async (params) => {
  return httpServices.get(`${apiURL.CV_THEME}/${params.queryKey[1]}`);
};
const createCvTheme = (payload) => {
  return httpServices.post(apiURL.CV_THEME, payload);
};
const updateCvTheme = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${apiURL.CV_THEME}/${id}`, data);
};
const deleteCvTheme = (id) => {
  return httpServices.delete(`${apiURL.CV_THEME}/${id}`);
};

export const CvThemeService = {
  getAllCvThemes,
  createCvTheme,
  getCvTheme,
  deleteCvTheme,
  updateCvTheme,
};
