const crypto = require("crypto");
const qs = require("qs");
const vnPayConfig = require("../configs/vnpay");
const moment = require("moment");

const createPaymentUrl = (
  amount,
  orderDescription,
  orderType,
  clientIp,
  bankCode = "",
  locale = "vn"
) => {
  const date = moment();
  const vnp_CreateDate = date.format("YYYYMMDDHHmmss");
  const vnp_TxnRef = `${date.format("HHmmss")}${date.milliseconds()}`;
  const vnp_ExpireDate = date.add(15, "minutes").format("YYYYMMDDHHmmss");

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: vnPayConfig.tmnCode,
    vnp_Amount: amount * 100,
    vnp_CurrCode: "VND",
    vnp_TxnRef: vnp_TxnRef,
    vnp_OrderInfo: encodeURIComponent(orderDescription),
    vnp_OrderType: orderType || "other",
    vnp_Locale: locale,
    vnp_ExpireDate: vnp_ExpireDate,
    vnp_ReturnUrl: "https://www.facebook.com/",
    vnp_IpAddr: clientIp,
    vnp_CreateDate: vnp_CreateDate,
  };

  if (bankCode) {
    vnp_Params.vnp_BankCode = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);
  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", vnPayConfig.hashSecret);
  const signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;

  const paymentUrl = `${vnPayConfig.url}?${qs.stringify(vnp_Params, {
    encode: false,
  })}`;
  console.log(paymentUrl);

  console.log("Chữ ký tạo ra:", signed);
  console.log("Chữ ký gửi đi:", vnp_Params.vnp_SecureHash);
  console.log("check: ", signed === vnp_Params.vnp_SecureHash);

  return paymentUrl;
};

const verifyPayment = (query) => {
  console.log("Dữ liệu nhận được từ VNPay:", query);

  const { vnp_SecureHash, ...queryWithoutHash } = query;
  const sortedParams = sortObject(queryWithoutHash);

  const signData = qs.stringify(sortedParams, { encode: false });
  console.log("Dữ liệu ký lại:", signData);

  const hmac = crypto.createHmac("sha512", vnPayConfig.hashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  console.log("Chữ ký tính toán:", signed);
  console.log("Chữ ký VNPay gửi:", vnp_SecureHash);

  return signed === vnp_SecureHash;
};
function sortObject(obj) {
  const sorted = {};
  const str = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }

  str.sort();

  for (const key of str) {
    sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
  }

  return sorted;
}
module.exports = { createPaymentUrl, verifyPayment };
