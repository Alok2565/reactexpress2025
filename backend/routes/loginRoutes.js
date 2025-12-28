// const express = require("express");
// const router = express.Router();
// const { loginUser } = require("../controllers/LoginController");
// const {verifyOtp}   = require("../controllers/verifyOtpController");

// // POST /api/login
// router.post("/", loginUser);
// router.post("/", verifyOtp);
// module.exports = router;

const express = require("express");
const router = express.Router();

const { loginUser, logoutUser } = require("../controllers/LoginController");
const { verifyOtp } = require("../controllers/verifyOtpController");


// LOGIN
router.post("/login", loginUser);

// VERIFY OTP
router.post("/verify-otp", verifyOtp);
router.post("/logout", logoutUser);

module.exports = router;