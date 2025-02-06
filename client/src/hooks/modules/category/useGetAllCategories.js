import { useQuery } from 'react-query';
import { getAllCategories } from "../../../services/CategorySevices";

export const useGetAllCategories = (params) => {
  return useQuery(["categories", params], (params) => getAllCategories(params));
};
