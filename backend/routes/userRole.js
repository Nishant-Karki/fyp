const e = require("express");
const db = require("../database");

const router = require("express").Router();

const dbQuery = "SELECT * FROM users WHERE email=?";

module.exports = router.post("/userRole", (req, res) => {
  const email = req.body.email;
  db.query(dbQuery, email, (err, result) => {
    if (err) {
      res.json({ err: err });
    } else {
      if (result.length > 0) {
        res.json({
          result: result,
          message: "User found sucessfully",
          type: "success",
        });
      } else {
        res.json({ message: "Please provide valid Email Id", type: "warning" });
      }
    }
  });
});
