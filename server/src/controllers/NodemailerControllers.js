const transporter = require("../configs/nodemailer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const cvViewed = async (req, res) => {
  const { recruiterName, applicantEmail } = req.body;
  if (!recruiterName || !applicantEmail) {
    return res.status(400).send({ message: "Missing required fields" });
  }
  try {
    await transporter.sendMail({
      from: '"Website Tuyển Dụng" <your-email@gmail.com>',
      to: applicantEmail,
      subject: "Nhà tuyển dụng đã xem CV của bạn",
      text: `Xin chào, nhà tuyển dụng ${recruiterName} đã xem CV của bạn. Chúc bạn may mắn trong hành trình tìm kiếm công việc!`,
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

    // Tạo token có thời hạn 15 phút
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
    const verificationLink = `${process.env.LOCAL_CLIENT_URL}/verify-result?token=${token}`;
    // Nội dung email
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Xác thực Email",
      html: `<p>Nhấn vào link bên dưới để xác thực email của bạn:</p>
                 <a href="${verificationLink}">${verificationLink}</a>`,
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

    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
    const resetLink = `${process.env.LOCAL_CLIENT_URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Đổi mật khẩu",
      html: `<p>Nhấn vào link bên dưới để đổi mật khẩu của bạn:</p>
                 <a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Email xác thực đã được gửi!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const verifyAccount = (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.json({
      status: "success",
      message: `Email ${decoded.email} đã xác thực thành công!`,
      data: decoded.email
    });
  } catch (error) {
    res.status(400).json({ error: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};
const verify = (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.json({
      status: "success",
      message: `Email ${decoded.email} đã xác thực thành công!`,
      data: decoded.email
    });
  } catch (error) {
    res.status(400).json({ error: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};
module.exports = {
  cvViewed,
  sendEmailVerification,
  verifyAccount,
  sendEmailChangePassword
};
