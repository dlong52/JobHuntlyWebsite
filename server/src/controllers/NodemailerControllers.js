const transporter = require("../configs/nodemailer");

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
module.exports = {
  cvViewed,
};
