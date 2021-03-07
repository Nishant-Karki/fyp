const router = require("express").Router();
const db = require("../database");

module.exports = router.post("/cancelAppointment", (req, res) => {
  const service = req.body.service;
  const user = req.body.user;

  db.query(
    "DELETE FROM appointment WHERE service_id = ? AND user_id = ?",
    [service, user],
    (err, result) => {
      if (err) {
        res.json({ err: err });
      } else {
        res.json({ result: result });
      }
    }
  );
});
