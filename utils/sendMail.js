const nodemailer = require("nodemailer");
const config = require("../config/config");

const sendEmail = async (email, subject, text) => {
  const { service, user, pass, from } = config.nodeMailer;
  try {
    const transporter = nodemailer.createTransport({
      service: config.nodeMailer.service,
      auth: {
        user: config.nodeMailer.user,
        pass: config.nodeMailer.pass,
      },
    });

    const info = await transporter.sendMail({
      from: config.nodeMailer.from,
      to: email, // list of receivers
      subject: subject,
      text: text,
    });
    nodemailer.getTestMessageUrl(info);
    console.log("email sent successfully");
  } catch (error) {
    console.log("email sent error: " + error);
  }
};

module.exports = sendEmail;
