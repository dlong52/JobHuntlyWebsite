import { apiURL } from "../constants/api";
import httpServices from "./httpServices";
const prefixAuthApi = apiURL.PACKAGE;

const getAllPackages = async (params) => {
  return httpServices.get(prefixAuthApi, { params: params.queryKey[1] });
};
const getPackage = async (params) => {
  return httpServices.get(`${prefixAuthApi}/${params.queryKey[1]}`);
};
const createPackage = (payload) => {
  return httpServices.post(prefixAuthApi, payload);
};
const updatePackage = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${prefixAuthApi}/${id}`, data);
};
const deletePackage = (id) => {
  return httpServices.delete(`${prefixAuthApi}/${id}`);
};

export const PackageService = {
  getAllPackages,
  createPackage,
  getPackage,
  deletePackage,
  updatePackage,
};
