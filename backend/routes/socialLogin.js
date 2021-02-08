const express = require("express");
const router = express.Router();
const socialLoginAPI = require("../services/socialLoginAPI");

module.exports = router.post("/social-login", socialLoginAPI);
