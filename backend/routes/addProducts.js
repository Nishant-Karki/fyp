const express = require("express");
const addProductsAPI = require("../services/addProductsAPI");
const router = express.Router();
const multer = require("multer");
const path = require("path");

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

router
  .route("/addProducts")
  .get(addProductGET)
  .all(upload)
  .post(addProductPOST);

module.exports = router;
