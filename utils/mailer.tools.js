const nodemailer = require("nodemailer");
const debug = require("debug")("app:nodemailer");

const tranporter = nodemailer.createTransport({
  host: process.env.MAILHOST || "localhost",
  port: process.env.MAILPORT || 25,
  tls:{
    rejectUnauthorized: false
  }
});

const tools = {};

tools.sendMail = async (to, subject, message) =>{
  try {
    await tranporter.verify();

    const info = await tranporter.sendMail({
      from: process.env.MAILFROM || "dei@uca.edu.sv",
      to: to,
      subject: subject,
      html: message,
    });

    return true;

  } catch (error) {
    debug("Cannot send mail");
    return false;
  }
};

module.exports = tools;