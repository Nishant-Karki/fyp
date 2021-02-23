const router = require("express").Router();
const db = require("../database");

const updateData =
  "UPDATE users SET fname=?, lname=?, dob=?, phone=? WHERE user_id=?";

module.exports = router.post("/updateUser", (req, res) => {
  const id = req.body.id;
  const { firstname, lastname, dob, contact } = req.body.values;

  db.query(
    updateData,
    [firstname, lastname, dob, contact, id],
    (err, result) => {
      if (err) {
        res.json({ message: "Error Occurred", type: "error" });
      } else {
        res.json({ message: "Successfully Updated", type: "success" });
      }
    }
  );
});
