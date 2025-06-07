const express = require("express");
const router = express.Router();
const { loginImpExpUser } = require("../controllers/impexpLoginController");

router.post("/", loginImpExpUser);

module.exports = router;
