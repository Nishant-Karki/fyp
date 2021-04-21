const router = require("express").Router();
const transporter = require("../nodemailerSetup");
const moment = require("moment");

module.exports = router.post("/confirmation", (req, res) => {
  const { email, cart, bookingCart } = req.body;

  let productDetails =
    cart?.length > 0
      ? cart.map((item) => `Bought ${item.qty} * ${item.name}. \n`)
      : "You have not booked any products yet.";

  let bookingDetails =
    bookingCart?.length > 0
      ? bookingCart.map(
          (item) =>
            `Booked ${item.name} with staff ${item.specialist} on ${moment(
              item.date
            ).format("YYYY-MM-DD")} at ${item.time}. \n`
        )
      : "You have no current bookings.";

  let reply = `Thankyou for choosing Us.

  Your Products:
  ${productDetails}
  
  Your Bookings:
  ${bookingDetails}
  `;

  let mail = {
    from: `Nepa De Salon ${email}`,
    to: `karkinishant14@gmail.com`,
    subject: `Thankyou for connecting with us.`,
    text: reply,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "failed",
        type: "error",
        message: "An Error Occurred.",
      });
    } else {
      res.json({
        type: "success",
        message: "Mail sent.",
        reply: reply,
      });
    }
  });
});
