import { useMutation } from 'react-query';
import { postService } from '../../../services/PostServices';

export const useDeletePost = () => {
  return useMutation(postService.deleteJob);
};
