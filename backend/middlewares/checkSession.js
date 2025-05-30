function checkSession(req, res, next) {
    if (req.session && req.session.user) {
        next(); // User is logged in
    } else {
        res.status(401).json({ message: 'Unauthorized: Please log in' });
    }
}

module.exports = checkSession;
