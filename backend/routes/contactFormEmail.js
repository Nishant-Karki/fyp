const router = require("express").Router();
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

module.exports = router.post("/contactForm", (req, res) => {
  const { name, phone, email, message } = req.body;
  let reply = `Name: ${name} 
Phone: ${phone}
Email: ${email} 
Message: ${message}`;
  const mail = {
    from: email,
    to: process.env.EMAIL,
    subject: "Contact Form Nepa De Salon",
    text: reply,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});
