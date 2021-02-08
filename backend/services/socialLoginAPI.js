const db = require("../database");

const googleQuery = "INSERT INTO users (name, email,social_id) VALUES (?,?,?)";
const fbQuery = "INSERT INTO users (name, social_id) VALUES (?,?,?)";

module.exports = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const googleId = req.body.googleId;
  const facebookId = req.body.facebookId;
  try {
    if (googleId.length > 0) {
      //for google login
      db.query(googleQuery, [name, email, googleId], (err, result) =>
        console.log(err)
      );
      res.send("Add to the database");
    } else {
      //for facebook login
      db.query(fbQuery, [name, facebookId], (err, result) => console.log(err));
      res.send("Add to the database");
    }
  } catch (err) {
    res.send({ err: err });
  }
};
