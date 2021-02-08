const db = require("../database");
const bcrypt = require("bcrypt");
const saltrounds = 10;

const SelectQuery = "SELECT email FROM users WHERE email=?";
const InsertQuery =
  "INSERT INTO users (fname,lname, email, password, phone, dob, gender) VALUES (?,?,?,?,?,?)";

module.exports = (req, res) => {
  const { fname, lname, email, password, phone, dob, gender } = req.body.values;

  try {
    db.query(SelectQuery, email, (err, result) => {
      if (result.length > 0) {
        res.send({ message: "user already exists." });
      } else {
        bcrypt.hash(password, saltrounds, (err, hash) => {
          err
            ? err && console.log(err)
            : db.query(
                InsertQuery,
                [fname, lname, email, hash, phone, dob, gender],
                (err, result) => console.log(err)
              );
          res.send("Add to the database");
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
