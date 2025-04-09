import { useQuery } from "react-query";
import { SubscriptionService } from "../../../services/SubscriptionServices";
import { ROLE } from "../../../constants/enum";

export const useGetActivePackage = (params, role) => {
  return useQuery(
    ["useGetActivePackage", params],
    (params) => SubscriptionService.getActivePackage(params),
    {enabled: !!params && role===ROLE.EMPLOYER}
  );
};
