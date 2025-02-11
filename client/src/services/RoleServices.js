import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getAllRoles = async (params) => {
  return httpServices.get(apiURL.ROLE, { params: params.queryKey[1] });
};
const getRole = async (params) => {
  return httpServices.get(`${apiURL.ROLE}/${params.queryKey[1]}`);
};
const createRole = (payload) => {
  return httpServices.post(apiURL.ROLE, payload);
};
const updateRole = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${apiURL.ROLE}/${id}`, data);
};
const deleteRole = (id) => {
  return httpServices.delete(`${apiURL.ROLE}/${id}`);
};

export const RoleService = {
  getAllRoles,
  createRole,
  getRole,
  deleteRole,
  updateRole,
};
