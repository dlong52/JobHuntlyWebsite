const {
  createPaymentUrl,
  verifyPayment,
} = require("../services/VnPayServices");

const createPayment = (req, res) => {
  try {
    const { amount, orderDescription, orderType, bankCode, language } =
      req.body;
    const clientIp = req.ip || "127.0.0.1";
    const locale = language && language.trim() ? language : "vn";
    const paymentUrl = createPaymentUrl(
      amount,
      orderDescription,
      orderType,
      clientIp,
      bankCode,
      locale
    );
    res.status(200).json({
      status: "success",
      message: "Create payment request successfully",
      data: paymentUrl,
    });
  } catch (error) {
    console.error("Lỗi khi tạo thanh toán VNPay:", error);
    res.status(500).json({ error: "Lỗi khi tạo thanh toán VNPay" });
  }
};

const vnPayReturn = (req, res) => {
  try {
    if (!req.query) {
      return res
        .status(400)
        .json({ status: "error", message: "Không có tham số trả về" });
    }

    const isValid = verifyPayment(req.query);
    if (isValid) {
      res.json({
        status: "success",
        message: "Thanh toán thành công!",
        data: req.query,
      });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Chữ ký không hợp lệ!" });
    }
  } catch (error) {
    console.error("Lỗi xử lý phản hồi VNPay:", error);
    res.status(500).json({ error: "Lỗi xử lý phản hồi từ VNPay" });
  }
};

module.exports = { createPayment, vnPayReturn };
