import { useQuery } from 'react-query';
import { postService } from '../../../services/PostServices';

export const useGetPost = (params, options) => {
  return useQuery(['post-detail', params], (params) => postService.getPost(params), options);
};
