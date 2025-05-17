const express = require("express");
const router = express.Router();
const { setPassword } = require("../controllers/PasswordController");

router.post("/", setPassword);

module.exports = router;