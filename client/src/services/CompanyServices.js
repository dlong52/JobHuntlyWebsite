import { apiURL } from "../constants/api";
import httpServices from "./httpServices";
const prefixAuthApi = apiURL.COMPANY;

const getAllCompanies = async (params) => {
  return httpServices.get(prefixAuthApi, { params: params.queryKey[1] });
};
const getCompany = async (params) => {
  return httpServices.get(`${prefixAuthApi}/${params.queryKey[1]}`);
};
const createCompany = (payload) => {
  return httpServices.post(prefixAuthApi, payload);
};
const updateCompany = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${prefixAuthApi}/${id}`, data);
};
const deleteJob = (id) => {
  return httpServices.delete(`${prefixAuthApi}/${id}`);
};

export const CompanyService = {
  getAllCompanies,
  createCompany,
  getCompany,
  deleteJob,
  updateCompany,
};
