import { useQuery } from "react-query";
import { postService } from "../../../services/PostServices";

export const useGetJobCount = (params) => {
  return useQuery(["job-count", params], (params) => postService.getJobCount(params));
};
