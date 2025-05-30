

// const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];

//     if (!token) return res.status(401).json({ loggedIn: false, message: "Token missing" });

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ loggedIn: false, message: "Invalid token" });
//         req.user = user; // This will be accessible in route
//         next();
//     });
// };

// module.exports = authenticateToken;

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ loggedIn: false, message: "Token missing" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ loggedIn: false, message: "Invalid token" });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;




