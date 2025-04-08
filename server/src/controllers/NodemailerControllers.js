const transporter = require("../configs/nodemailer");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ChangePasswordUi = require("../email_ui/ChangePassword");
const VerifyAccountUi = require("../email_ui/VerifyAccount");
const ViewedResume = require("../email_ui/ViewedResume");
const Invoice = require("../email_ui/Invoice");
dotenv.config();

const cvViewed = async (req, res) => {
  const {
    recruiterName,
    companyName,
    jobTitle,
    applicantName,
    applicantEmail,
  } = req.body;

  if (
    !recruiterName ||
    !companyName ||
    !jobTitle ||
    !applicantName ||
    !applicantEmail
  ) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    await transporter.sendMail({
      from: '"Website Tuyển Dụng" <your-email@gmail.com>',
      to: applicantEmail,
      subject: "Nhà tuyển dụng đã xem CV của bạn",
      html: ViewedResume(applicantName, recruiterName, companyName, jobTitle),
    });

    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to send email" });
  }
};

const sendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email là bắt buộc!" });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Email không tồn tại!" });
    // Tạo token có thời hạn 15 phút
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
    const verificationLink = `${process.env.LOCAL_CLIENT_URL}/verify-result?token=${token}`;
    // Nội dung email
    const mailOptions = {
      from: "Website tuyển dụng JobHuntly",
      to: email,
      subject: "Xác thực Email",
      html: VerifyAccountUi(verificationLink, user?.profile?.name),
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Email xác thực đã được gửi!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const sendEmailChangePassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email là bắt buộc!" });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Email không tồn tại!" });

    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
    const resetLink = `${process.env.LOCAL_CLIENT_URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: "Website tuyển dụng JobHuntly",
      to: email,
      subject: "Đổi mật khẩu",
      html: ChangePasswordUi(resetLink, user?.profile?.name),
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Email xác thực đã được gửi!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const verifyAccount = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Tìm user theo email
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại!" });
    }

    user.is_verified = true;
    await user.save();

    res.json({
      status: "success",
      message: `Email ${decoded.email} đã xác thực thành công!`,
      data: decoded.email,
    });
  } catch (error) {
    res.status(400).json({ error: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};
const sendInvoice = async (req, res) => {
  try {
    const { email, invoice } = req.body;
    if (!email || !invoice) {
      return res.status(400).json({ error: "Email và hóa đơn là bắt buộc!" });
    }

    const mailOptions = {
      from: "Website tuyển dụng JobHuntly",
      to: email,
      subject: "Hóa đơn của bạn",
      html: Invoice(invoice),
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Hóa đơn đã được gửi qua email!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  cvViewed,
  sendEmailVerification,
  verifyAccount,
  sendEmailChangePassword,
  sendInvoice
};
