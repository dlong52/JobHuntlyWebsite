import { useQuery } from "react-query";
import { WishListService } from "../../../services/WishListServices";

export const useGetAllWishlistByUser = (user_id, params) => {
  return useQuery(
    ["wishlist-by-user", params],
    (params) => WishListService.getWishListByUser(user_id, params),
    { enabled: !!user_id }
  );
};
