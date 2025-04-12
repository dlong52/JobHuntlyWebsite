import { useQuery } from 'react-query';
import { postService } from '../../../services/PostServices';

export const useGetAllPosts = (params, options) => {
  return useQuery(["user", params], (params) => postService.getAllPosts(params), options);
};
