const UserLogin = require('../models/UserLogin');
const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const login = await UserLogin.findOne({ username }).populate({
      path: 'user_id',
      populate: { path: 'role_id' }
    });

    if (!login || login.password !== hashedPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({
      userId: login.user_id._id,
      role: login.user_id.role_id.name
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, role: login.user_id.role_id.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
