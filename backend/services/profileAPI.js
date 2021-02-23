const db = require("../database");
const fs = require("fs");

const dbQueryPOST = "UPDATE users SET image=?";
const dbSelectQuery = "SELECT image from users WHERE user_id=?";

const dbUserDetailsQuery = "SELECT * FROM users WHERE user_id=?";

module.exports = profilePOST = (req, res) => {
  const id = req.body.id;
  const { filename } = req.file;

  db.query(dbSelectQuery, id, (err, result) => {
    if (result.lenth > 0) {
      fs.unlink(`../frontend/src/images/profile/${image}`, (err) =>
        res.send(err)
      );
    } else {
      db.query(dbQueryPOST, filename, (err, result) => {
        if (!err) {
          db.query(dbUserDetailsQuery, id, (err, response) => {
            if (!err) {
              res.json({ result: response });
            }
          });
        }
      });
    }
  });
};
