const router = require("express").Router();
const db = require("../database");

module.exports = router.get("/userData", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.json({ err: err });
    } else {
      res.json({ result: result });
    }
  });
});
