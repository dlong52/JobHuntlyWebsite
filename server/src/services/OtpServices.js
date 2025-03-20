const client = require("../configs/twilio");

const sendOTP = async (phoneNumber) => {
  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: phoneNumber, channel: "sms" });

    return {
      status: "success",
      message: "OTP sent successfully!",
      sid: verification.sid,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const verifyOTP = async (phoneNumber, otpCode) => {
  try {
    const verification_check = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phoneNumber, code: otpCode });

    if (verification_check.status === "approved") {
      return { status: "success", message: "OTP verified successfully!" };
    } else {
      return { status: "error", message: "Invalid OTP!" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = { sendOTP, verifyOTP };
