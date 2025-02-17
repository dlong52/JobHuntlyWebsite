import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getWishListByUser = async (userId, params) => {
  return httpServices.get(`${apiURL.WISH_LIST}/${userId}`, {
    params: params.queryKey[1],
  });
};
const getStatusWishlist = async (userId, jobId, params) => {
  return httpServices.get(`${apiURL.WISH_LIST}/${userId}/${jobId}`, {
    params: params.queryKey[1],
  });
};
const addToWishList = (payload) => {
  return httpServices.post(apiURL.WISH_LIST, payload);
};
const removeFromWishList = (userId, jobId) => {
  return httpServices.delete(`${apiURL.WISH_LIST}/${userId}/${jobId}`);
};

export const WishListService = {
  getWishListByUser,
  addToWishList,
  removeFromWishList,
  getStatusWishlist,
};
