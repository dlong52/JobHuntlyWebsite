import { useQuery } from "react-query";
import { CvThemeService } from "../../../services/CvThemeServices";

export const useGetAllCvThemes = (params, options) => {
  return useQuery(["cv-themes", params], (params) => CvThemeService.getAllCvThemes(params), options);
};
