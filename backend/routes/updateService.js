const router = require("express").Router();
const db = require("../database");
const multer = require("multer");
const path = require("path");

const withoutImageQuery =
  "UPDATE service SET name=?,price=?,description=? WHERE service_id =?";

const withImageQuery =
  "UPDATE service SET name=?,price=?,description=?, image=? WHERE service_id =?";

const DIR = "../frontend/src/images/services";

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

module.exports = router.post("/updateService", upload, (req, res) => {
  const { name, price, description, id } = req.body;
  console.log(req.file);
  if (req.file.image === null) {
    db.query(
      withoutImageQuery,
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
  } else {
    db.query(
      withImageQuery,
      [name, price, description, req.body.filename, id],
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
  }
});
