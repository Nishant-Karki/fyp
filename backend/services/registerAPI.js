const db = require("../database");
const bcrypt = require("bcrypt");
const saltrounds = 10;

const SelectQuery = "SELECT email FROM users WHERE email=?";
const InsertQuery =
  "INSERT INTO users (fname,lname, email, password, phone, dob, gender,role) VALUES (?,?,?,?,?,?,?,?)";

module.exports = (req, res) => {
  const { fname, lname, email, password, phone, dob, gender } = req.body.values;
  console.log(dob);
  const role = "C";
  try {
    db.query(SelectQuery, email, (err, result) => {
      if (result.length > 0) {
        res.send({ message: "User already exists.", type: "warning" });
      } else {
        bcrypt.hash(password, saltrounds, (err, hash) => {
          err && res.json({ message: "Error Occurred.", type: "error" });
          if (!err) {
            db.query(
              InsertQuery,
              [fname, lname, email, hash, phone, dob, gender, role],
              (err, result) => {
                if (err) {
                  res.json({ message: "Error Occurred.", type: "error" });
                } else {
                  res.json({
                    message: "Please login to continue.",
                    type: "success",
                  });
                }
              }
            );
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
