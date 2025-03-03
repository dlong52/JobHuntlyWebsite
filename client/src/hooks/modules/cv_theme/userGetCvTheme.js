import { useQuery } from "react-query";
import { CvThemeService } from "../../../services/CvThemeServices";

export const useGetCvTheme = (params, options) => {
  return useQuery(
    ["cv-theme-detail", params],
    (params) => CvThemeService.getCvTheme(params),
    options
  );
};
