const router = require("express").Router();
const db = require("../database");
const moment = require("moment");

module.exports = router.post("/productBooking", (req, res) => {
  const newCart = req.body.cart;
  const dateToday = moment(new Date()).format("YYYY-MM-DD");

  let sql = `INSERT INTO orderdetails (user_id,product_id,date,quantity,total) VALUES `;

  for (let i = 0; i < newCart.length; i++) {
    sql += `(${newCart[i].userId},${
      newCart[i].product_id
    },'${dateToday}',${Math.round(
      newCart[i].qty * newCart[i].price * 0.13 +
        newCart[i].qty * newCart[i].price
    )},${newCart[i].total})`;

    if (i < newCart.length - 1) {
      sql += ",";
    }
  }

  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ err: err });
    } else {
      res.json({ result: result });
    }
  });
});

//To check before inserting query to database
//error in select query

// const newCart = req.body.cart;
// const dateToday = moment(new Date()).format("YYYY-MM-DD");
// console.log(newCart);
// let sql = `INSERT INTO orderdetails (user_id,product_id,date,quantity,total) VALUES `;
// let selectQuery =
//   "SELECT user_id, product_id, date FROM orderdetails WHERE user_id = ? AND product_id = ?";

// for (let i = 0; i < newCart.length; i++) {
//   console.log("here");
//   db.query(
//     selectQuery,
//     [newCart[i].userId, newCart[i].product_id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         console.log(result);
//       } else {
//         if (result?.length > 0) {
//           console.log("checking result");
//           // let [newUserId] = result.map((item) => item.user_id);
//           let [orderData] = result;
//           if (
//             orderData.user_id === newCart[i].userId &&
//             orderData.product_id === newCart[i].product_id &&
//             moment(orderData.date).format("YYYY-MM-DD") === dateToday
//           ) {
//             res.json({ message: "already in the database" });
//           } else {
//             sql += `(${newCart[i].userId},${
//               newCart[i].product_id
//             },'${dateToday}',${Math.round(
//               newCart[i].qty * newCart[i].price * 0.13 +
//                 newCart[i].qty * newCart[i].price
//             )},${newCart[i].total})`;

//             db.query(sql, (err, result) => {
//               if (err) {
//                 res.json({ message: "Error while storing in the database" });
//               } else {
//                 res.json({ message: "Stored in the database" });
//               }
//             });
//           }
//           // let [newUserId] = result.map((item) => item.user_id)
//           if (i < newCart.length - 1) {
//             sql += ",";
//           }
//         }
//       }
//     }
//   );
// }

module.exports = router.get("/productBooking", (req, res) => {
  db.query(
    "SELECT orderdetails.total, orderdetails.date, users.fname as client, users.lname as lastname, users.phone as phone,product.name as productName, product.price as productPrice FROM orderdetails JOIN users ON orderdetails.user_id = users.user_id JOIN product ON orderdetails.product_id",
    (err, result) => {
      if (err) {
        res.json({ err: err });
      } else {
        res.json({ result: result });
      }
    }
  );
});

module.exports = router.post("/orderDetails", (req, res) => {
  const id = req.body.id;
  db.query(
    "SELECT * FROM orderdetails WHERE user_id = ?",
    id,
    (err, result) => {
      if (err) {
        res.json({ err: err });
      } else {
        res.json({ result: result });
      }
    }
  );
});
