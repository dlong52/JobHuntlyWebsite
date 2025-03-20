import { useQuery } from "react-query";
import { ApplicantService } from "../../../services/ApplicationServices";

export const useGetAppliedJobs = (userId, params) => {
  return useQuery(
    ["getAppliedJobs", params],
    (params) => ApplicantService.getAppliedJobs(userId, params),
    { enabled: !!userId }
  );
};
