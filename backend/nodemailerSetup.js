const nodemailer = require("nodemailer");
require("dotenv").config;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//verify connection configuration
transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is ready to take our message");
  }
});

module.exports = transporter;
