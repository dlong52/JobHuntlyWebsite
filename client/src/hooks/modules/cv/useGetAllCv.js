import { useQuery } from 'react-query';
import { CVService } from '../../../services/CvServices';

export const useGetAllCvs = (params) => {
  return useQuery(["cvs", params], (params) => CVService.getAllCVs(params));
};
