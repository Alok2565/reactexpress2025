const express = require("express");
const router = express.Router();
const {impExpUserLogin} = require("../controllers/impexpLoginController");

// POST /api/login IMPEXP
router.post("/", impExpUserLogin);
module.exports = router;