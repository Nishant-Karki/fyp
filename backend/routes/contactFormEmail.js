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
  const { name, phone, email, message } = req.body.values;
  const { subject } = req.body;
  const { staff } = req.body;
  console.log(req.body);

  let reply = `
  Name: ${name}
  Phone: ${phone}
  Email: ${email}
  Message: ${message}`;
  let mail = {
    from: `${name}`,
    to: process.env.EMAIL,
    subject: `${subject} ${email}`,
    text: reply,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
        type: "error",
        message: "An Error Occurred.",
      });
    } else {
      if (!staff === "true") {
        res.json({
          type: "success",
          message: "We'll contact you ASAP.",
        });
      } else {
        res.json({
          type: "success",
          message: "Thankyou for your feedback.",
        });
      }
    }
  });
});
