import { useQuery } from "react-query";
import { WishListService } from "../../../services/WishListServices";

export const useGetStatusWishlist = (user_id, jobId, params) => {
  return useQuery(
    ["status-wishlist", params],
    (params) => WishListService.getStatusWishlist(user_id, jobId, params),
    { enabled: !!user_id && !!jobId }
  );
};
