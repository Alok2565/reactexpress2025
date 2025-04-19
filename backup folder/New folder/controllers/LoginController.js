const UserLogin = require('../models/UserLogin');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.registerLogin = async (req, resp) => {
  const { email, password, user_id } = req.body;

  try {
    const hashedPassword = crypto.createHash('sha256').update(password).digest('base64');

    const login = new UserLogin({ email, password: hashedPassword, user_id });
    await login.save();

    resp.status(201).json(login);
  } catch (err) {
    resp.status(400).json({ error: err.message });
  }
};

exports.login = async (req, resp) => {
  const { email, password } = req.body;

  try {
    const login = await UserLogin.findOne({ email }).populate({
      path: 'user_id',
      populate: { path: 'role_id' }
    });

    if (!login) return resp.status(404).json({ error: 'User not found' });

    const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
    if (login.password !== hashedInput) return resp.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign(
      {
        user_id: login.user_id._id,
        role: login.user_id.role_id.role_name
      },
      process.env.JWT_SECRET,
      { expirespIn: '1h' }
    );

    resp.json({ token, role: login.user_id.role_id.role_name });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};
