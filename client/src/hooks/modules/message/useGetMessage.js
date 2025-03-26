import { useQuery } from "react-query";
import { MessageService } from "../../../services/MessageService";

export const useGetMessage = (conversationId, params) => {
  return useQuery(
    ["Conversations", params],
    (params) =>
      MessageService.getMessagesByConversationId(conversationId, params),
    { enabled: !!conversationId }
  );
};
