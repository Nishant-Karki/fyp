const db = require("../database");

const router = require("express").Router();

const updateQuery = "UPDATE users SET role = ? WHERE user_id = ?";

const checkQuery = "SELECT * FROM staff WHERE user_id=?";

const insertIntoStaffQuery = "INSERT INTO staff (user_id,name) VALUES (?,?)";

module.exports = router.post("/updateRole", (req, res) => {
  const { id, role } = req.body;

  db.query(updateQuery, [role, id], (err, result) => {
    // db.query(
    //   "SELECT *  FROM staff JOIN users ON staff.user_id = users.user_id",
    //   (err, result) => {
    //     console.log(result);
    //     console.log(err);
    //   }
    // );

    if (role === "S") {
      db.query(checkQuery, id, (err, result) => {
        if (!result.length > 0) {
          db.query(
            "SELECT fname FROM users WHERE user_id=?",
            id,
            (err, result) => {
              if (!err) {
                let [name] = result;
                let fname = name.fname;
                db.query(insertIntoStaffQuery, [id, fname], (err, result) => {
                  if (!err) {
                    res.json({
                      message: "Role Successfully Updated",
                      type: "success",
                      result: result,
                    });
                  }
                });
              }
            }
          );
        }
      });
    }
  });
});
