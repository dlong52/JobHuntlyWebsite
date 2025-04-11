import { useQuery } from "react-query";
import { SearchService } from "../../../services/SearchServices";

export const useGetSuggest = (params) => {    
  return useQuery(["suggest", params], (params) => SearchService.getSuggest(params), {enabled: !!params?.query});
};
