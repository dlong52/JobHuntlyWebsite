import { useQuery } from "react-query";
import { ApplicantService } from "../../../services/ApplicationServices";

export const useGetAllApplicants = (params, options) => {
  return useQuery(
    ["applicants", params],
    (params) => ApplicantService.getAllApplicants(params),
    options
  );
};
