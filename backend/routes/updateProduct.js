const router = require("express").Router();
const db = require("../database");
const multer = require("multer");
const path = require("path");

const withoutImageQuery =
  "UPDATE product SET name=?,price=?,description=? WHERE product_id = ?";

const withImageQuery =
  "UPDATE product SET name=?,price=?,description=?,image=? WHERE product_id =?";

const getPrevImageQuery = "SELECT image FROM product WHERE product_id = ?";

const DIR = "../frontend/src/images/products";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage }).single("image");

module.exports = router.post("/updateProduct", upload, (req, res) => {
  const { name, price, description } = req.body.values;
  console.log(req.body.id);
  const id = req.body.id;
  try {
    // if (image !== "old") {
    //   // console.log(req.file.filename);
    //   let image_name = req.file.filename;
    //   db.query(getPrevImageQuery, id, (err, result) => {
    //     [prevImage] = result.map((item) => item.image);
    //     if (!err) {
    //       fs.unlink(`../frontend/src/images/products/${prevImage}`, (err) => {
    //         if (!err) {
    //           db.query(
    //             withImageQuery,
    //             [name, price, description, image_name, id],
    //             (err, result) => {
    //               if (err) {
    //                 console.log(err);
    //                 res.json({ message: "Error Occurred", type: "error" });
    //               } else {
    //                 res.json({
    //                   message: "Successfully Updated",
    //                   type: "success",
    //                   image: image_name,
    //                   id: id,
    //                 });
    //               }
    //             }
    //           );
    //         }
    //       });
    //     }
    //   });
    // } else {
    db.query(
      withoutImageQuery,
      [name, price, description, id],
      (err, result) => {
        if (err) {
          res.json({ message: "Error Occurred", type: "error" });
        } else {
          console.log(result);
          res.json({
            message: "Successfully Updated",
            type: "success",
          });
        }
      }
    );
    // }
  } catch (err) {
    console.log(err);
  }
});
