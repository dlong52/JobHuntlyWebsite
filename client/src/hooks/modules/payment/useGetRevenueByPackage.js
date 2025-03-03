import { useQuery } from "react-query";
import { PaymentService } from "../../../services/PaymentServices";

export const useGetRevenueByPackage = (params) => {
  return useQuery(["useGetRevenueByPackage", params], (params) =>
    PaymentService.getRevenueByPackage(params)
  );
};
