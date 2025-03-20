const ViewedResumeUi = (
  applicantName,
  recruiterName,
  companyName,
  jobTitle
) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nhà tuyển dụng đã xem CV của bạn</title>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #172554; padding: 20px; color: white;">
      <tr>
        <td align="center">
          <table role="presentation" width="600px" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img src="https://i.imgur.com/I2P4dU2.png" alt="Company Logo" width="120" style="display: block; margin: auto;">
              </td>
            </tr>

            <!-- Tiêu đề -->
            <tr>
              <td align="center">
                <h2 style="color: #333333; margin: 0;">Nhà tuyển dụng đã xem CV của bạn!</h2>
                <p style="color: #555555; font-size: 16px; margin: 10px 0;">Cơ hội việc làm đang đến gần với bạn.</p>
              </td>
            </tr>

            <!-- Nội dung -->
            <tr>
              <td style="padding: 20px; text-align: left; color: #333333; font-size: 16px;">
                <p>Xin chào <strong>${applicantName}</strong>,</p>
                <p>Chúng tôi vui mừng thông báo rằng nhà tuyển dụng <strong>${recruiterName}</strong> từ công ty <strong>${companyName}</strong> đã xem CV của bạn cho vị trí <strong>${jobTitle}</strong>.</p>
                <p>Hãy kiểm tra email hoặc tài khoản của bạn thường xuyên để không bỏ lỡ cơ hội phỏng vấn!</p>
              </td>
            </tr>

            <!-- Nút CTA -->
            <tr>
              <td align="center" style="padding: 20px;">
                <a href="http://localhost:8000/viewed-resume" style="background-color: #007bff; color: #ffffff; padding: 12px 24px; font-size: 16px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Xem chi tiết
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 20px; font-size: 14px; color: #888888;">
                <p>Trân trọng,</p>
                <p><strong>Đội ngũ hỗ trợ - <a href="https://jobhuntlyclient.vercel.app/" style="color: #4527a0;">JobHuntly</a></strong></p>
                <p style="font-size: 12px; color: #aaaaaa;">Bạn nhận được email này vì đã ứng tuyển trên nền tảng của chúng tôi.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};
module.exports = ViewedResumeUi;
