import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getAllApplicants = async (params) => {
  return httpServices.get(apiURL.APPLICATION, { params: params.queryKey[1] });
};
const getAppliedJobs = (userId) => {
  return httpServices.get(`${apiURL.APPLICATION}/applied-job/${userId}`);
};
const getApplicationReport = (companyId, params) => {
  return httpServices.get(`${apiURL.APPLICATION}/report/${companyId}`, {
    params: params.queryKey[1],
  });
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
const deleteApplicant = (id) => {
  return httpServices.delete(`${apiURL.APPLICATION}/${id}`);
};

export const ApplicantService = {
  getAllApplicants,
  createApplicant,
  getApplicant,
  deleteApplicant,
  updateApplicant,
  getAppliedJobs,
  getApplicationReport,
};
