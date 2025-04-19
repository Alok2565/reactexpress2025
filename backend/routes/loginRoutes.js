const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/LoginController");

router.post("/", loginUser);

module.exports = router;
