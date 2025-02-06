import { apiURL } from "../constants/api";
import httpServices from "./httpServices";
const cvViewed = (payload) => {
  return httpServices.post(`${apiURL.SEND_EMAIL}/cv-viewed`, payload);
};
export const SendEmailServices = {
  cvViewed,
};
