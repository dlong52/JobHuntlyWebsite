import { useQuery } from 'react-query';
import { RoleService } from '../../../services/RoleServices';

export const useGetRole = (params, options) => {
  return useQuery(['role-detail', params], (params) => RoleService.getRole(params), options);
};
