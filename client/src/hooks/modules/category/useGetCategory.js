import { useQuery } from "react-query";
import { getCategory } from "../../../services/CategorySevices";

export const useGetCategory = (params, options) => {
  return useQuery(["category", params], (params) => getCategory(params), options);
};
