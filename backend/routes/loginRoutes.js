const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/LoginController");

// POST /api/login
router.post("/", loginUser);
module.exports = router;