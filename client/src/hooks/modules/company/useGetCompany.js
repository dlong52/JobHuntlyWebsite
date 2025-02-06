import { useQuery } from 'react-query';
import { CompanyService } from '../../../services/CompanyServices';

export const useGetCompany = (params, options) => {
  return useQuery(['company-detail', params], (params) => CompanyService.getCompany(params), options);
};
