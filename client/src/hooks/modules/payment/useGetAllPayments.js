import { useQuery } from "react-query";
import { PaymentService } from "../../../services/PaymentServices";

export const useGetAllPayments = (params) => {
  return useQuery(["Payments", params], (params) => PaymentService.getAllPayments(params));
};
