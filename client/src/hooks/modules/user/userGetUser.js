import { useQuery } from "react-query";
import { getUserById } from "../../../services/UserServices";

export const useGetUser = (params, options) => {
  return useQuery(
    ["user-detail", params],
    (params) => getUserById(params),
    options
  );
};
