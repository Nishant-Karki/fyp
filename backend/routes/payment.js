const router = require("express").Router();
const db = require("../database");

module.exports = router.post("/payment", (req, res) => {
  const id = req.body.id;
  const option = req.body.option;
  console.log(id);
  db.query(
    "UPDATE appointment SET payment=? WHERE user_id=?",
    [id, option],
    (err, result) => {
      console.log(err);
      if (!err) {
        // db.query("INSERT INTO appointment (payment) VALUES (?) WHERE user_id=?", [id,option],(err,result)=>{

        // })
        console.log(result);
      }
    }
  );
});
