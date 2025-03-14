import { useQuery } from "react-query";
import { CVService } from "../../../services/CvServices";

export const useGetCv = (params, options) => {
  return useQuery(["cv", params], (params) => CVService.getCV(params), options);
};
