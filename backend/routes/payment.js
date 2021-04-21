const router = require("express").Router();
const db = require("../database");

module.exports = router.post("/payment", (req, res) => {
  const id = req.body.id;
  const option = req.body.option;
  db.query(
    "UPDATE appointment SET payment=? WHERE user_id=?",
    [option, id],
    (err, result) => {
      if (!err) {
        // db.query(
        //   "INSERT INTO appointment (payment) VALUES (?) WHERE user_id=?",
        //   [id, option],
        //   (err, result) => {}
        // );
        console.log(result);
      } else {
        console.log(err);
      }
    }
  );
  db.query(
    "UPDATE orderdetails SET payment=? WHERE user_id=?",
    [option, id],
    (err, result) => {
      if (!err) {
        // db.query(
        //   "INSERT INTO appointment (payment) VALUES (?) WHERE user_id=?",
        //   [id, option],
        //   (err, result) => {}
        // );
        console.log(result);
      } else {
        console.log(err);
      }
    }
  );
  res.json({ message: "Payment Complete" });
});
