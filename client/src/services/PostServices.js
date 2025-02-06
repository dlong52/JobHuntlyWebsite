import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getAllPosts = async (params) => {
  return httpServices.get(apiURL.POST, { params: params.queryKey[1] });
};
const getPost = async (params) => {
  return httpServices.get(`${apiURL.POST}/${params.queryKey[1]}`);
};
const createPost = (payload) => {
  return httpServices.post(apiURL.POST, payload);
};
const updatePost = (payload) => {
  const { id, ...data } = payload;
  return httpServices.put(`${apiURL.POST}/${id}`, data);
};
const deleteJob = (id) => {
  return httpServices.delete(`${apiURL.POST}/${id}`);
};

export const postService = {
  getAllPosts,
  createPost,
  getPost,
  deleteJob,
  updatePost,
};
