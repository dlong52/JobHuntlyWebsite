const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: "dlong.work23@gmail.com",
    pass: "pdac lrvf qikp irzj",
  },
  debug: true,
  logger: true, 
});


module.exports = transporter;
