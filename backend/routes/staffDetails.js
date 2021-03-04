const router = require("express").Router();
const db = require("../database");

const getQuery = "SELECT * FROM users WHERE role = ?";

const insertQuery = "INSERT INTO staff (user_id) VALUES (?)";

module.exports = router.get("/getStaffs", (req, res) => {
  const role = "S";
  db.query(getQuery, role, (err, result) => {
    if (err) {
      res.json({ err });
    } else {
      res.json({ result: result });
      // console.log(result);
    }
    // } else {
    //   let value;
    //   result.map((user) => {
    //     value = user.user_id;
    //     db.query(
    //       "SELECT staff_id FROM staff WHERE user_id = ?",
    //       value,
    //       (err, returnValue) => {
    //         if (err) {
    //           res.json({ err: err });
    //         } else {
    //           if (returnValue) {
    //             db.query(insertQuery, value, (err, res) => {
    //               if (err) {
    //                 res.json({ err: err });
    //               } else {
    //                 res.json({ result: result });
    //                 console.log(result);
    //               }
    //             });
    //           }
    //         }

    //         // let [{ staff_id }] = result;
    //         // result && console.log(staff_id);
    //       }
    //     );
    //   });

    //   // db.query(checkQuery, (err, response) => {
    //   //   console.log(response);
    //   //   const ress = response.map((item) => {
    //   //     if (item.user_id !== value) {
    //   //       console.log("chalyo");
    //   //     }
    //   //   });
    //   // });

    //   // db.query(insertQuery, item.user_id, (err, result) => {
    //   //   if (err) {
    //   //     console.log(err);
    //   //   } else {
    //   //     console.log(result);
    //   //   }
    //   // });
    //   // console.log(id);
    //   // db.query();
    //   // res.json({ result: result });
    //   // db.query(staffs_to_new_tableQuery, role, (err, result) => {
    //   //   if (err) {
    //   //     console.log(err);
    //   //   } else {
    //   //     console.log(result);
    //   //   }
    //   // });
    // }
  });
});
