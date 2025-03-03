import { useQuery } from "react-query";
import { getAllUsers } from "../../../services/UserServices";

export const useGetAllUsers = (params, options) => {
  return useQuery(["user", params], (params) => getAllUsers(params), options);
};
