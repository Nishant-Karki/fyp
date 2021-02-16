const { reset } = require("nodemon");
const db = require("../database");

const googleQuery = "INSERT INTO users (name, email,social_id) VALUES (?,?,?)";
const SelectQuery = "SELECT email FROM users WHERE email=?";
const fbQuery = "INSERT INTO users (name, social_id) VALUES (?,?,?)";

module.exports = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const googleId = req.body.googleId;
  const facebookId = req.body.facebookId;
  console.log(email);
  try {
    if (googleId.length > 0) {
      //for google login

      db.query(SelectQuery, email, (err, result) => {
        if (result.length > 0) {
          res.json({ message: "Email already exists", exists: true });
        } else {
          db.query(googleQuery, [name, email, googleId], (err, result) =>
            res.json({ message: "Added to the database", exists: false })
          );
        }
      });
    } else {
      //for facebook login
      db.query(fbQuery, [name, facebookId], (err, result) => console.log(err));
      res.send("Add to the database");
    }
  } catch (err) {
    res.send({ err: err });
  }
};
