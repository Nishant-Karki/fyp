const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const profileAPI = require("../services/profileAPI");

const DIR = "../frontend/src/images/profile";

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

const upload = multer({ storage: storage }).single("profile");

router.route("/profileImage").all(upload).post(profileAPI);

module.exports = router;
