const router = require("express").Router();
const transporter = require("../nodemailerSetup");

module.exports = router.post("/confirmation", (req, res) => {
  console.log(req.body);
  const { email, cart, bookingCart } = req.body;

  let productDetails =
    cart?.length > 0
      ? cart.map((item) => `Bought ${item.qty} * ${item.name}.`)
      : "You have no current bookings.";

  let bookingDetails =
    bookingCart?.length > 0
      ? bookingCart.map(
          (item) =>
            `Booked ${item.name} with staff ${item.specialist} on ${item.date} ${item.time}`
        )
      : "You have not booked any products yet.";

  let reply = `Thankyou for choosing Us.
  Your Bookings:
  ${productDetails}
  
  Your Products:
  ${bookingDetails}
  `;

  let mail = {
    from: `Nepa De Salon`,
    to: `${email}`,
    subject: `${subject} ${email}`,
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
      });
    }
  });
});
