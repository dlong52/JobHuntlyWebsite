import { apiURL } from "../constants/api";
import httpServices from "./httpServices";
const getAllCategories = async () => {
  try {
    const res = await httpServices.get(apiURL.CATEGORY);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export { getAllCategories };
