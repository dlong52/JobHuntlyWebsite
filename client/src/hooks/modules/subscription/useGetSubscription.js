import { useQuery } from "react-query";
import { SubscriptionService } from "../../../services/SubscriptionServices";

export const useGetSubscriptions = (params) => {
  return useQuery(["subscription", params], (params) => SubscriptionService.getSubscription(params));
};
