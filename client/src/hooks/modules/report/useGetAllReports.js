import { useQuery } from "react-query";
import { ReportService } from "../../../services/ReportServices";

export const useGetAllReports = (params) => {
  return useQuery(["Reports", params], (params) => ReportService.getAllReports(params));
};
