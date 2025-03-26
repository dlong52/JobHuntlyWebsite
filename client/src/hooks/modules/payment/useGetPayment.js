import { useQuery } from "react-query";
import { PaymentService } from "../../../services/PaymentServices";

export const useGetPayment = (params, options) => {
  return useQuery(
    ["Payment", params],
    (params) => PaymentService.getPayment(params),
    options
  );
};
