const express = require("express");
const router = express.Router();
const { registerLogin, loginUser } = require("../controllers/LoginController");

router.post("/register-login", registerLogin);
router.post("/login", loginUser);

module.exports = router;
