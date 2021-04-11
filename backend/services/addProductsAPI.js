const db = require("../database");
const fs = require("fs");
const path = require("path");
const dbQueryPOST =
  "INSERT INTO product (name,price,description,image) VALUES (?,?,?,?)";
const dbQueryGET = "SELECT * FROM product";

module.exports = addProductPOST = (req, res) => {
  const { name, description, price } = req.body;
  // const { filename } = req.file;

  // const pathToFile=path.join()
  //copy image for mobile

  console.log(req.body);
  // to pass the path to the database
  // const image_path = `${filename}`;

  // try {
  //   if (!req.file) {
  //     console.log("No file received");
  //     message = "Error while image upload";
  //     res.send({ message: message, status: "danger" });
  //   } else {
  //     console.log("file received");
  //     db.query(
  //       dbQueryPOST,
  //       [name, price, description, image_path],
  //       (err, result) => {
  //         err && console.log(err);
  //         result && res.send({ message: "successfully added to database" });
  //       }
  //     );
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
};

module.exports = addProductGET = (req, res) => {
  db.query(dbQueryGET, (err, result) => {
    if (!err) {
      res.json({ result: result });
    }
  });
};
