const router = require("express").Router();
const { setImpexpPassword } = require("../controllers/PasswordController");

router.post("/", setImpexpPassword);

module.exports = router;
