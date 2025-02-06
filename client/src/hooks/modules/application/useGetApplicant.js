import { useQuery } from "react-query";
import { ApplicantService } from "../../../services/ApplicationServices";

export const useGetApplicant = (params, options) => {
  return useQuery(
    ["applicant-detail", params],
    (params) => ApplicantService.getApplicant(params),
    options
  );
};
