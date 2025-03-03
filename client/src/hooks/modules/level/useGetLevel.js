import { useQuery } from "react-query";
import { levelService } from "../../../services/LevelServices";

export const useGetLevel = (params, options) => {
  return useQuery(["Level", params], (params) => levelService.getLevel(params), options);
};
