import { useQuery } from "react-query";
import { ConversationService } from "../../../services/ConversationServices";

export const useGetAllConversationByUser = (user_id, params) => {
  return useQuery(
    ["conversation-by-user", params],
    (params) => ConversationService.getConversationsByUserId(user_id, params),
    { enabled: !!user_id }
  );
};
