import { useQuery } from 'react-query';
import { ReportService } from '../../../services/ReportServices';

export const useGetReport = (params, options) => {
  return useQuery(['Report-detail', params], (params) => ReportService.getReport(params), options);
};
