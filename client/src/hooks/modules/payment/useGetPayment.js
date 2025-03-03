import { useQuery } from "react-query";
import { PaymentService } from "../../../services/PaymentServices";

export const useGetPayment = (params) => {
  return useQuery(["Payment", params], (params) => PaymentService.getPayment(params));
};
