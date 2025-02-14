import { useQuery } from "react-query";
import { ConversationService } from "../../../services/ConversationServices";

export const useGetAllMessages = (user_id, params) => {
  return useQuery(
    ["all-message", params],
    (params) => MessageServices.getConversationsByUserId(user_id, params),
    { enabled: !!user_id }
  );
};
