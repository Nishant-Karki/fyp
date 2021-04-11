const router = require("express").Router();

module.exports = router.post("/productBooking", (req, res) => {
  const { name, price, description, qty, userId } = req.body.cart;
  console.log(req.body);
});

module.exports = router.get("/productBooking", (req, res) => {});
