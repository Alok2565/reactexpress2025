const express = require('express');
const router = express.Router();
const { registerLogin, login } = require('../controllers/LoginController');

router.post('/register', registerLogin);
router.post('/login', login);

module.exports = router;
