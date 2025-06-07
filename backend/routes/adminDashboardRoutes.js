const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/dashboard", authenticateToken, (req, res) => {
    if (req.user.role === "admin") {
        res.json({ message: `Welcome to Admin dashboard, ${req.user.email}` });
    } else {
        res.status(403).json({ message: "Access denied" });
    }
});

module.exports = router;