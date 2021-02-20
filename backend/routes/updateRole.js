const db = require("../database");

const router = require("express").Router();

const updateQuery = "UPDATE users SET role = ? WHERE user_id = ?";

module.exports = router.post("/updateRole", (req, res) => {
  const { id, role } = req.body;

  db.query(updateQuery, [role, id], (err, result) => {
    if (err) {
      res.json({ err: err, message: "Error Occurred", type: "error" });
    } else {
      res.json({
        message: "Role Successfully Updated",
        type: "success",
        result: result,
      });
    }
  });
});
