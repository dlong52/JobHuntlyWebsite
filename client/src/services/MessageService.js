import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getMessagesByConversationId = async (conversation_id, params) => {
  return httpServices.get(`${apiURL.MESSAGE}/${conversation_id}`, { params: params.queryKey[1] });
};
const createMessage = (payload) => {
  return httpServices.post(apiURL.MESSAGE, payload);
};

export const MessageService = {
  getMessagesByConversationId,
  createMessage,
};
