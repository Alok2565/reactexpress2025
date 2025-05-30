// routes/committeeRoutes.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/dashboard", authenticateToken, (req, res) => {
    if (req.user.role === "committee") {
        res.json({ message: `Welcome to committee dashboard, ${req.user.email}` });
    } else {
        res.status(403).json({ message: "Access denied" });
    }
});

module.exports = router;