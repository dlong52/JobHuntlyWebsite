import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getAllApplicants = async (params) => {
  return httpServices.get(apiURL.APPLICATION, { params: params.queryKey[1] });
};
const getApplicant = async (params) => {
  return httpServices.get(`${apiURL.APPLICATION}/${params.queryKey[1]}`);
};
const createApplicant = (payload) => {
  return httpServices.post(apiURL.APPLICATION, payload);
};
const updateApplicant = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${apiURL.APPLICATION}/${id}`, data);
};
const deleteJob = (id) => {
  return httpServices.delete(`${apiURL.APPLICATION}/${id}`);
};

export const ApplicantService = {
  getAllApplicants,
  createApplicant,
  getApplicant,
  deleteJob,
  updateApplicant,
};
