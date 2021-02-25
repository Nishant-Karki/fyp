const router = require("express").Router();
const db = require("../database");
const multer = require("multer");
const path = require("path");

const updateProductQuery =
  "UPDATE service SET name=?,price=?,description=? WHERE product_id =?";

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
  const id = req.body.product_id;
  console.log(req.body);

  db.query(
    updateProductQuery,
    [name, price, description, id],
    (err, result) => {
      if (err) {
        res.json({ message: "Error Occurred", type: "error" });
      } else {
        res.json({
          message: "Successfully Updated",
          type: "success",
        });
      }
    }
  );
});
