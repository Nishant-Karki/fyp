const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const updateServiceAPI = require("../services/updateServiceAPI");
const db = require("../database");
const fs = require("fs");

const withoutImageQuery =
  "UPDATE service SET name=?,price=?,description=? WHERE service_id =?";

// const withImageQuery =
//   "UPDATE service SET name=?,price=?,description=?,image=? WHERE service_id =?";

// const getPrevImageQuery = "SELECT image FROM service WHERE service_id = ?";

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
  const { name, price, description } = req.body.values;
  const id = req.body.id;
  try {
    // if (image !== "old") {
    //   // console.log(req.file.filename);
    //   let image_name = req.file.filename;
    //   db.query(getPrevImageQuery, id, (err, result) => {
    //     [prevImage] = result.map((item) => item.image);
    //     if (!err) {
    //       db.query(
    //         withImageQuery,
    //         [name, price, description, image_name, id],
    //         (err, result) => {
    //           if (err) {
    //             console.log(err);
    //             res.json({ message: "Error Occurred", type: "error" });
    //           } else {
    //             fs.unlink(
    //               `../frontend/src/images/services/${prevImage}`,
    //               (err) => {
    //                 if (!err) {
    //                   res.json({
    //                     message: "Successfully Updated",
    //                     type: "success",
    //                     image: image_name,
    //                     id: id,
    //                   });
    //                 } else {
    //                   res.json({ err: err });
    //                 }
    //               }
    //             );
    //           }
    //         }
    //       );
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
          res.json({
            message: "Successfully Updated",
            type: "success",
            image: null,
            id: null,
          });
        }
      }
    );
    // }
  } catch (err) {
    console.log(err);
  }
});
