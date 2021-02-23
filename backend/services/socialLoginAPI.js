const { reset } = require("nodemon");
const db = require("../database");

const googleQuery =
  "INSERT INTO users (fname,lname, email,social_id,role) VALUES (?,?,?,?,?)";
const SelectQuery = "SELECT email FROM users WHERE email=?";
const fbQuery = "INSERT INTO users (name, social_id) VALUES (?,?)";

module.exports = (req, res) => {
  const {
    givenName: fname,
    familyName: lname,
    email,
    imageUrl: image,
    googleId,
  } = req.body;
  const role = "C";
  const facebookId = req.body.facebookId;
  try {
    if (googleId.length > 0) {
      //for google login

      db.query(SelectQuery, email, (err, result) => {
        if (result.length > 0) {
          db.query(
            "SELECT * FROM users WHERE email=?",
            email,
            (err, response) => {
              if (err) {
                res.json({
                  message: "Error Occurred",
                  type: "error",
                  exists: true,
                });
              } else {
                res.json({
                  message: "Welcome back",
                  type: "success",
                  exists: true,
                  result: response,
                });
              }
            }
          );
        } else {
          db.query(
            googleQuery,
            [fname, lname, email, googleId, role],
            (err, result) => {
              if (!err) {
                db.query(
                  "SELECT * FROM users WHERE email=?",
                  email,
                  (err, result) => {
                    if (!err) {
                      res.json({
                        message: "Welcome",
                        type: "success",
                        exists: false,
                        result: result,
                      });
                    }
                  }
                );
              }
            }
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
