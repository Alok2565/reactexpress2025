const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/dashboard", authenticateToken, (req, res) => {
  if (req.user.role === "imp-exp") {
    return res.json({ message: `Welcome to Importer Exporter dashboard, ${req.user.iec_code}` });
  }
  return res.status(403).json({ message: "Access denied" });
});

module.exports = router;
