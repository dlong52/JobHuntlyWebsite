import { useQuery } from "react-query";
import { OverviewService } from "../../../services/OverviewServices";

export const useGetOverviewAdmin = (params, options) => {
  return useQuery(
    ["OverviewAdmin", params],
    (params) => OverviewService.getOverviewAdmin(params),
    options
  );
};
