import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getSuggest = async (params) => {
  return httpServices.get(apiURL.SEARCH, { params: params.queryKey[1] });
};

export const SearchService = {
  getSuggest,
};
