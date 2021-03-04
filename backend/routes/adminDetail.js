const router = require("express").Router();
const db = require("../database");

const getQuery = "SELECT * FROM users WHERE role = ?";

// const insertQuery = "INSERT INTO staff (user_id) VALUES (?)";

module.exports = router.get("/getAdmin", (req, res) => {
  const role = "A";
  db.query(getQuery, role, (err, result) => {
    if (err) {
      res.json({ err });
    } else {
      res.json({ result: result });
      // console.log(result);
    }
  });
});
