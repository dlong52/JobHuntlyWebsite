import { useQuery } from "react-query";
import { PackageService } from "../../../services/PackageServices";

export const useGetAllPackages = (params) => {
  return useQuery(["packages", params], (params) =>
    PackageService.getAllPackages(params)
  );
};
