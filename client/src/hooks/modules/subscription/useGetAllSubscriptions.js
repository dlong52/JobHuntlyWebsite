import { useQuery } from "react-query";
import { SubscriptionService } from "../../../services/SubscriptionServices";

export const useGetAllSubscriptions = (params, options) => {
  return useQuery(
    ["Subscriptions", params],
    (params) => SubscriptionService.getAllSubscriptions(params),
    options
  );
};
