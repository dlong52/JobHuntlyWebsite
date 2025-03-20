import { useQuery } from "react-query";
import { ConversationService } from "../../../services/ConversationServices";

export const useGetAllConversations = (userId, params) => {
  return useQuery(
    ["Conversations", params],
    (params) => ConversationService.getConversationsByUserId(userId, params),
    { enabled: !!userId }
  );
};
