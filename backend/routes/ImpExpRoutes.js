// const express = require("express");
// const router = express.Router();
// const {createImpExp, getImpExpData, getImpExpById} = require('../controllers/ExporterAppController');

// router.post("/", createImpExp);
// router.get("/", getImpExpData);
// router.get("/:id", getImpExpById);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { createImpExp, getImpExpData, getImpExpById } = require("../controllers/ImpExpRegistrationController");

router.post("/", createImpExp);
router.get("/", getImpExpData);
router.get("/:id", getImpExpById);

module.exports = router;