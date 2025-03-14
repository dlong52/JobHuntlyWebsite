import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getAllReports = async (params) => {
  return httpServices.get(apiURL.REPORT, { params: params.queryKey[1] });
};
const getReport = async (params) => {
  return httpServices.get(`${apiURL.REPORT}/${params.queryKey[1]}`);
};
const createReport = (payload) => {
  return httpServices.post(apiURL.REPORT, payload);
};
const updateReport = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${apiURL.REPORT}/${id}`, data);
};
const deleteReport = (id) => {
  return httpServices.delete(`${apiURL.REPORT}/${id}`);
};

export const ReportService = {
  getAllReports,
  createReport,
  getReport,
  deleteReport,
  updateReport,
};
