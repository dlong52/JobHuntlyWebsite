import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getOverviewHr = async (params) => {
  return httpServices.get(`${apiURL.OVERVIEW}/${params.queryKey[1]}`);
};
const getOverviewAdmin = async (params) => {
  return httpServices.get(`${apiURL.OVERVIEW_ADMIN}`);
};

export const OverviewService = {
  getOverviewHr,
  getOverviewAdmin
};
