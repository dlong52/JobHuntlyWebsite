import { useQuery } from "react-query";
import { ApplicantService } from "../../../services/ApplicationServices";

export const useGetAllApplicants = (params) => {
  return useQuery(["applicants", params], (params) =>
    ApplicantService.getAllApplicants(params)
  );
};
