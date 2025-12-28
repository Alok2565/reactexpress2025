const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true only for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // prevents socket close
  },
});

const sendMail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"User Auth" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendMail;
