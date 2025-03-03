import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getOverviewHr = async (params) => {
  return httpServices.get(`${apiURL.OVERVIEW}/${params.queryKey[1]}`);
};

export const OverviewService = {
  getOverviewHr,
};
