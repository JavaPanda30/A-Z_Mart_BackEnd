const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.SMTP_SERVICE,
    port: 465,
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    form: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.mailmsg,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
