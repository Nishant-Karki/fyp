const express = require("express");
const addServicesAPI = require("../services/addServicesAPI");
const router = express.Router();
const multer = require("multer");
const path = require("path");

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

router
  .route("/addServices")
  .get(addServiceGET)
  .all(upload)
  .post(addServicePOST);

module.exports = router;
