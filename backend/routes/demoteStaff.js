const router = require("express").Router();
const db = require("../database");

module.exports = router.post("/demoteStaff", (req, res) => {
  const id = req.body.id;
  const role = "C";
  db.query("DELETE FROM staff WHERE user_id=?", id, (err, result) => {
    if (!err) {
      db.query(
        "UPDATE users SET role= ? WHERE user_id = ?",
        [role, id],
        (err, result) => {
          if (err) {
            res.json({ message: "Error Occurred", type: "error" });
          } else {
            res.json({ message: "Demote Successful", type: "success" });
          }
        }
      );
    }
  });
});
