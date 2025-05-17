const UserLogin = require("../models/UserLogin");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerLogin = async (req, res) => {
  try {
    const { email, password, user_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const login = new UserLogin({
      email,
      password: hashedPassword,
      user_id
    });

    await login.save();
    res.status(201).json({ message: "User login created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await UserLogin.findOne({ email }).populate("user_id");

    if (!login) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, login.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: login.user_id._id,
        role: login.user_id.role_id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: login.user_id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
