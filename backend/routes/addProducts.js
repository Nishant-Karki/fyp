const express = require("express");
const addProductsAPI = require("../services/addProductsAPI");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const DIR_Web = "../frontend/src/images/products";
const DIR_Mobile = "../mobile/images/products";

const storageWeb = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR_Web);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${path.extname(file.originalname)}`);
  },
});

const storageMobile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR_Mobile);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}${path.extname(file.originalname)}`);
  },
});

const fileUpload = () => {
  multer({ storage: storageWeb }).single("image");
  multer({ storage: storageMobile }).single("image");
};

router
  .route("/addProducts")
  .get(addProductGET)
  .all(fileUpload)
  .post(addProductPOST);

module.exports = router;
