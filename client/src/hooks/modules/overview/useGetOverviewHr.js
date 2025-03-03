import { useQuery } from "react-query";
import { OverviewService } from "../../../services/OverviewServices";

export const useGetOverviewHr = (params, options) => {
  return useQuery(
    ["OverviewHr", params],
    (params) => OverviewService.getOverviewHr(params),
    options
  );
};
