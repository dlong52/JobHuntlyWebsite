import { useQuery } from "react-query";
import { PackageService } from "../../../services/PackageServices";

export const useGetPackage = (params, options) => {
  return useQuery(
    ["package-detail", params],
    (params) => PackageService.getPackage(params),
    options
  );
};
