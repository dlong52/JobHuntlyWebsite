import React, { useEffect, useMemo, useState } from "react";
import { useGetPackage } from "../../hooks/modules/package/useGetPackage";
import useQueryParams from "../../hooks/useQueryParams";
import {
  Box,
  Typography,
  Divider,
  Alert,
  AlertTitle,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { VnPayServices } from "../../services/VnPayServices";
import { useNotifications } from "../../utils/notifications";
import { useConvertData, useFilters } from "../../hooks";
import Loading from "../../components/Loading";
import { Button, CommonIcon } from "../../ui";
import { vnpay } from "../../assets/images";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentError from "./components/PaymentError";
import Error from "./components/Error";
import PaymentLoading from "./components/PaymentLoading";
import { PaymentService } from "../../services/PaymentServices";
import { SubscriptionService } from "../../services/SubscriptionServices";
import moment from "moment";
import { useGetAllSubscriptions } from "../../hooks/modules/subscription/useGetAllSubscriptions";

const CheckoutPage = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const query = useQueryParams();
  const { showError, showInfo } = useNotifications();
  const id = query?.package;
  const { data, isLoading } = useGetPackage(id, { enabled: !!id });
  const { dataConvert } = useConvertData(data);
  const price = dataConvert?.price * ((100 - dataConvert?.discount) / 100) || 0;

  const { filters: filtersSub } = useFilters({
    employer_id: user.user_id,
    status: "active",
    activeOnly: true,
  });
  const { data: subData, isLoading: isLoadingSub } = useGetAllSubscriptions(
    filtersSub,
    {
      enabled: !!user.user_id,
    }
  );
  const { dataConvert: subscriptions } = useConvertData(subData);
  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await VnPayServices.createPaymentUrl({
        amount: Number(price),
        orderDescription: JSON.stringify({
          id: id,
          job_post_remaining: dataConvert?.job_post_limit,
        }),
        orderType: "other",
        language: "vn",
      });
      if (res?.data?.status === "success") {
        window.location.href = res?.data?.data;
      }
      setLoading(false);
    } catch (error) {
      console.log({ error });
      showError("Đã xảy ra lỗi trong quá trình thanh toán");
    }
  };
  const transactionInfo = useMemo(() => {
    if (query) {
      return {
        vnp_Amount: query?.vnp_Amount,
        vnp_BankCode: query?.vnp_BankCode,
        vnp_CardType: query?.vnp_CardType,
        vnp_OrderInfo: query?.vnp_OrderInfo,
        vnp_PayDate: query?.vnp_PayDate,
        vnp_ResponseCode: query?.vnp_ResponseCode,
        vnp_TmnCode: query?.vnp_TmnCode,
        vnp_TransactionNo: query?.vnp_TransactionNo,
        vnp_TransactionStatus: query?.vnp_TransactionStatus,
        vnp_TxnRef: query?.vnp_TxnRef,
        vnp_SecureHash: query?.vnp_SecureHash,
      };
    }
  }, [query]);
  const queryString = new URLSearchParams(transactionInfo).toString();
  const verifyTransaction = async () => {
    try {
      const res = await VnPayServices.paymentReturn(queryString);
      showError(res?.data?.message);
    } catch (error) {
      console.log({ error });
    }
  };
  const createOrder = async () => {
    const decodedString = decodeURIComponent(transactionInfo?.vnp_OrderInfo);
    const orderInfo = JSON.parse(decodedString);
    try {
      const subscriptionRes = await SubscriptionService.createSubscription({
        employer_id: user?.user_id,
        package_id: orderInfo?.id,
        start_date: moment().format(),
        end_date: moment().add(30, "days").format(),
        job_post_remaining: orderInfo?.job_post_remaining,
      });
      if (subscriptionRes?.data?.status === "success") {
        await PaymentService.createPayment({
          user_id: user?.user_id,
          subscription_id: subscriptionRes?.data?.data?._id,
          amount: Number(transactionInfo?.vnp_Amount) / 100,
          payment_method: "VNPay",
          transaction_id: transactionInfo?.vnp_TransactionNo,
          status: "success",
        });
      }
      localStorage.setItem(`order_${transactionInfo?.vnp_TxnRef}`, true);
    } catch (error) {
      showError("Đã xảy ra lỗi trong quá trình tạo đơn hàng");
      localStorage.setItem(`order_${transactionInfo?.vnp_TxnRef}`, false);
    }
  };

  useEffect(() => {
    if (
      transactionInfo?.vnp_TransactionStatus === "00" &&
      !localStorage.getItem(`order_${transactionInfo?.vnp_TxnRef}`)
    ) {
      createOrder();
      localStorage.setItem(`order_${transactionInfo?.vnp_TxnRef}`, true);
      return;
    }
  }, [transactionInfo]);
  const checkAlreadyPackage = subscriptions?.some(
    (item) => item.package_id._id === id
  );
  return (
    <>
      {!isLoading ? (
        <>
          {data ? (
            <Box className="text-neutrals-100 relative">
              {loading && <Loading />}
              <Box className="grid grid-cols-12 gap-5">
                {/* Left Section */}
                <Box className="col-span-8 space-y-5">
                  {/* User Info */}
                  <Box className="p-6 flex flex-col gap-2 bg-white rounded-lg shadow">
                    <Typography
                      fontSize={"20px"}
                      fontWeight={500}
                      className="mb-4"
                    >
                      Thông tin khách hàng
                    </Typography>
                    <Box className="grid grid-cols-3">
                      <Typography>
                        <span className="text-[13px] text-neutrals-80">
                          Họ tên:
                        </span>{" "}
                        <br />
                        {user?.username}
                      </Typography>
                      <Typography>
                        <span className="text-[13px] text-neutrals-80">
                          Email:
                        </span>{" "}
                        <br />
                        {user?.email}
                      </Typography>
                      <Typography>
                        <span className="text-[13px] text-neutrals-80">
                          Số điện thoại:
                        </span>{" "}
                        <br />
                        {user?.phone_number}
                      </Typography>
                    </Box>
                    <Alert severity="info" className="mt-4">
                      <AlertTitle>Lưu ý</AlertTitle>
                      Jobhuntly chỉ chấp nhận thanh toán bằng ví điện tử VNPAY
                    </Alert>
                  </Box>

                  {/* Payment Detail */}
                  <Box className="p-6 bg-white rounded-lg shadow-lg border">
                    <Typography
                      fontSize={"20px"}
                      fontWeight={500}
                      className="mb-4"
                    >
                      Thông tin đơn hàng
                    </Typography>
                    <div className="flex gap-4 items-center my-4 p-4 rounded shadow">
                      <img src={vnpay} alt="" className="size-20" />
                      <div className="">
                        <Typography>Phương thức thanh toán</Typography>
                        <Typography>Ví điện tử VNPAY</Typography>
                      </div>
                    </div>
                    <div className="space-y-3 border rounded p-5 mt-4">
                      <Typography
                        variant="h5"
                        fontWeight={600}
                        className="text-primary-dark"
                      >
                        {dataConvert?.name}
                      </Typography>
                      <Typography variant="body1" className="text-gray-700">
                        {dataConvert?.introduce}
                      </Typography>
                      <Typography variant="body2" className="text-gray-500">
                        Thời hạn: {dataConvert?.duration_in_days} ngày • Giới
                        hạn bài đăng: {dataConvert?.job_post_limit}
                      </Typography>
                      <div className="bg-gray-100 p-4 rounded-lg mt-3">
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          className="text-gray-800"
                        >
                          Giá: {dataConvert?.price.toLocaleString()} VNĐ
                        </Typography>
                      </div>
                      <div className="">
                        <Typography
                          fontWeight={500}
                          className="mt-4 text-gray-800"
                        >
                          Tính năng
                        </Typography>
                        <Box className="flex flex-w" dense>
                          {dataConvert?.features.map((feature, index) => (
                            <ListItem key={index} disablePadding>
                              <ListItemText
                                primary={`• ${feature}`}
                                className="text-gray-700"
                              />
                            </ListItem>
                          ))}
                        </Box>
                      </div>
                    </div>
                  </Box>
                </Box>

                {/* Right Section */}
                <Box className="col-span-4 p-6 sticky top-0 bg-white rounded-lg shadow flex flex-col gap-4 h-fit">
                  <Typography
                    fontSize={"20px"}
                    fontWeight={500}
                    className="mb-4"
                  >
                    Tạm tính
                  </Typography>
                  <Divider className="my-4" />
                  <Box className="flex flex-col gap-2">
                    <Box className="flex justify-between items-center">
                      <Typography className="!text-sm text-neutrals-80">
                        Tạm tính
                      </Typography>
                      <Typography fontWeight={500}>
                        {dataConvert?.price.toLocaleString("vi-VN")}đ
                      </Typography>
                    </Box>
                    <Box className="flex justify-between items-center">
                      <Typography className="!text-sm text-neutrals-80">
                        Giảm giá({dataConvert?.discount}%)
                      </Typography>
                      <Typography fontWeight={500}>
                        {(
                          dataConvert?.price *
                          (dataConvert?.discount / 100)
                        ).toLocaleString("vi-vn")}
                        đ
                      </Typography>
                    </Box>
                    <Box className="flex justify-between items-center">
                      <Typography className="!text-sm text-neutrals-80">
                        VAT(0%)
                      </Typography>
                      <Typography fontWeight={500}>0đ</Typography>
                    </Box>
                  </Box>
                  <Divider className="my-4" />
                  <Box className="flex justify-between">
                    <Typography fontSize={"18px"} fontWeight={500}>
                      Tổng tiền:
                    </Typography>
                    <Typography fontSize={"18px"} fontWeight={500}>
                      {(
                        dataConvert?.price *
                        ((100 - dataConvert?.discount) / 100)
                      ).toLocaleString("vi-VN")}
                      đ
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<CommonIcon.Payment />}
                    size={"large"}
                    className="mt-5 !bg-primary hover:bg-blue-600 text-white py-3 rounded-lg"
                    onClick={() => {
                      if (checkAlreadyPackage) {
                        showInfo(
                          "Bạn đang sử dụng gói dịch vụ này vui lòng chọn gói khác!"
                        );
                        return;
                      }
                      if (!user.is_verified) {
                        showInfo(
                          "Bạn cần xác thực tài khoản để sử dụng dịch vụ của JobHuntly!"
                        );
                        return;
                      }
                      handlePayment();
                    }}
                  >
                    Thanh toán
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <>
              {transactionInfo?.vnp_TransactionStatus === "00" ? (
                <PaymentSuccess />
              ) : transactionInfo?.vnp_TransactionStatus === "02" ? (
                <PaymentError />
              ) : (
                <Error />
              )}
            </>
          )}
        </>
      ) : (
        <PaymentLoading />
      )}
    </>
  );
};

export default CheckoutPage;
