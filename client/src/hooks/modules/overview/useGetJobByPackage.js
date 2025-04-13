import { useQuery } from "react-query";
import { OverviewService } from "../../../services/OverviewServices";

export const useGetJobByPackage = (params, options) => {
  return useQuery(
    ["OverviewHrvsadv", params],
    (params) => OverviewService.countJobByPackage(params),
    options
  );
};
