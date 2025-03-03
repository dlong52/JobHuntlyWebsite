import { useQuery } from "react-query";
import { PaymentService } from "../../../services/PaymentServices";

export const useGetAllPaymentSummary = (params) => {
  return useQuery(["PaymentSummary", params], (params) => PaymentService.getAllPaymentSummary(params));
};
