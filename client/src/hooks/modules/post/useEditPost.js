import { useMutation } from 'react-query';
import { postService } from '../../../services/PostServices';

export const useEditPost = () => {
  return useMutation(postService.updatePost);
};
