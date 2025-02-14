import { apiURL } from "../constants/api";
import httpServices from "./httpServices";

const getConversationsByUserId = async (user_id, params) => {
  return httpServices.get(`${apiURL.CONVERSATION}/${user_id}`);
};
const createConversation = (payload) => {
  return httpServices.post(apiURL.CONVERSATION, payload);
};

export const ConversationService = {
  getConversationsByUserId,
  createConversation,
};
