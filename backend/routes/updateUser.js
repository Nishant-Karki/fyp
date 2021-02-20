const router = require("express").Router();

const updateName = "UPDATE users SET name=? WHERE user_id=?";
const updateContact = "UPDATE users SET name=? WHERE user_id=?";
const updateDob = "UPDATE users SET name=? WHERE user_id=?";

const updateDetail = (value, id, queryName) => {
  db.query(queryName, [value, id], (err, result) => {
    if (err) {
      res.json({ err: err, message: "Error Occured", type: "error" });
    } else {
      res.json({ message: "Details Successfully Updated", type: "success" });
    }
  });
};

module.exports = router.post("/updateUser", (req, res) => {
  const { username, dob, contact } = req.body.values;
  const id = req.body.id;

  if (username.length > 0) {
    updateDetail(username, id, updateName);
  } else if (contact.length > 0) {
    updateDetail(contact, id, updateContact);
  } else if (dob.length > 0) {
    updateDetail(dob, id, updateDob);
  } else {
    null;
  }
});
