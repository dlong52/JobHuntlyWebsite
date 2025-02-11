import { useQuery } from "react-query";
import { RoleService } from "../../../services/RoleServices";

export const useGetAllRoles = (params) => {
  return useQuery(["Roles", params], (params) => RoleService.getAllRoles(params));
};
