// routes/icmrRoutes.js
// const express = require("express");
// const router = express.Router();
// const authenticateToken = require("../middlewares/authMiddleware");

// router.get("/dashboard", authenticateToken, (req, res) => {
//     res.json({ message: "ICMR Dashboard Data", user: req.user });
// });

// router.get("/profile", authenticateToken, (req, res) => {
//     res.json({ message: "ICMR Profile Info", user: req.user });
// });

// router.get("/exporters", authenticateToken, (req, res) => {
//     res.json({ message: "List of Exporters", user: req.user });
// });

// router.get("/rejct-applications", authenticateToken, (req, res) => {
//     res.json({ message: "Rejected Applications", user: req.user });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/dashboard", authenticateToken, (req, res) => {
    if (req.user.role === "icmr") {
        res.json({ message: `Welcome to Icmr Official dashboard, ${req.user.email}` });
    } else {
        res.status(403).json({ message: "Access denied" });
    }
});

module.exports = router;