import { useQuery } from "react-query";
import { NotificationService } from "../../../services/NotificationServices";

export const useGetNotifications = (params) => {
  return useQuery(["notifications", params], (params) =>
    NotificationService.getNotifications(params)
  );
};
