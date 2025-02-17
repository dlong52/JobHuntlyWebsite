import { useSelector } from "react-redux";
import useConvertData from "../../useConvertData";
import { useGetStatusWishlist } from "./useGetStatusWishlist";

const useStatusWishlist = (jobId) => {
  const user = useSelector((state) => state.user);
  const { data: statusData, isLoading: loadingStatus } = useGetStatusWishlist(
    user?.user_id,
    jobId
  );
  const { dataConvert: status } = useConvertData(statusData);
  return { status };
};

export default useStatusWishlist;
