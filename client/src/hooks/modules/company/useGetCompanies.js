import { useQuery } from 'react-query';
import { CompanyService } from '../../../services/CompanyServices';

export const useGetAllCompanies = (params) => {
  return useQuery(["companies", params], (params) => CompanyService.getAllCompanies(params));
};
