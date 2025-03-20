import { useQuery } from "react-query";
import { ApplicantService } from "../../../services/ApplicationServices";

export const useGetApplicationReport = (companyId, params) => {
  return useQuery(
    ["report-apply", params],
    (params) => ApplicantService.getApplicationReport(companyId, params),
    { enabled: !!companyId }
  );
};
