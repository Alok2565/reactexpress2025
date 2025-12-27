const express = require("express");
const router = express.Router();
const { loginImpExpUser } = require("../controllers/impexpLoginController");
const {verifyOtpImpExp} = require("../controllers/verifyOtpController");

// POST /api/login IMPEXP
router.post("/impexp_login", loginImpExpUser);
router.post("/otp-verify", verifyOtpImpExp);
module.exports = router;