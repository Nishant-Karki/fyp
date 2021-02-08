const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//to check user in db
const dbQuery = "SELECT * FROM users WHERE email=?";

module.exports = loginPOST = (req, res) => {
  const { email, password } = req.body.values;

  db.query(dbQuery, email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        // if (result[0].password === password) {
        if (response) {
          const id = result[0].id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: 300, // expires in 5 mintes
          });
          req.session.user = result;

          res.json({ auth: true, token: token, result: result });
        } else {
          res.json({ auth: false, message: "Wrong Email/Password" });
        }
      });
    } else {
      res.json({ auth: false, message: "no user exists!!" });
    }
  });
};

module.exports = loginGET = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
    console.log("true session");
  } else {
    res.send({ loggedIn: false });
    console.log("false session");
  }
};
