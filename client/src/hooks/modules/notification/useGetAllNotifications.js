import { useQuery } from "react-query";
import { NotificationService } from "../../../services/NotificationServices";

export const useGetAllNotifications = (user_id, params) => {
  return useQuery(
    ["notifications", params],
    (params) => NotificationService.getAllNotifications(user_id, params),
    { enabled: !!user_id }
  );
};
