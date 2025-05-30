// // const UserLogin = require("../models/UserLogin");
// // const User = require("../models/User");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");

// // exports.registerLogin = async (req, res) => {
// //   try {
// //     const { email, password, user_id } = req.body;
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const login = new UserLogin({
// //       email,
// //       password: hashedPassword,
// //       user_id
// //     });

// //     await login.save();
// //     res.status(201).json({ message: "User login created" });
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// // };

// // exports.loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const login = await UserLogin.findOne({ email }).populate("user_id");

// //     if (!login) return res.status(404).json({ error: "User not found" });

// //     const isMatch = await bcrypt.compare(password, login.password);
// //     if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

// //     const token = jwt.sign(
// //       {
// //         id: login.user_id._id,
// //         role: login.user_id.role_id
// //       },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1h" }
// //     );

// //     res.json({ token, user: login.user_id });
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// // };

// const jwt = require("jsonwebtoken");
// const UserLogin = require("../models/UserLogin");
// const User = require("../models/User");
// require("dotenv").config();

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userLogin = await UserLogin.findOne({ email }).populate({
//       path: "user_id",
//       populate: { path: "role_id" }
//     });

//     if (!userLogin || !userLogin.password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const hashedPassword = require("crypto")
//       .createHash("sha256")
//       .update(password)
//       .digest("hex");

//     if (userLogin.password !== hashedPassword) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     const token = jwt.sign(
//       {
//         id: userLogin._id,
//         email: userLogin.email,
//         role: userLogin.user_id?.role_id?.role_slug || "guest"
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     res.status(200).json({
//       token,
//       user: {
//         email: userLogin.email,
//         role: userLogin.user_id?.role_id?.role_name
//       }
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Login failed', error: err.message });
//   }
// };



const UserLogin = require("../models/UserLogin");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;


  try {
    const userLogin = await UserLogin.findOne({ email }).populate({
      path: "user_id",
      populate: { path: "role_id" }
    });

    if (!userLogin || !userLogin.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    if (userLogin.password !== hashedPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const user = await User.findById(userLogin.user_id._id);

    const token = jwt.sign(
      {
        id: userLogin._id,
        email: userLogin.email,
        role: userLogin.user_id?.role_id?.role_slug || "guest"
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      token,
      user: {
        email: userLogin.email,
        name: user?.name || null,
        designation: user?.designation || null,
        role: userLogin.user_id?.role_id?.role_slug,
        role_name: userLogin.user_id?.role_id?.role_name
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// loginUser controller
// const UserLogin = require("../models/UserLogin");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userLogin = await UserLogin.findOne({ email }).populate({
//       path: "user_id",
//       populate: { path: "role_id" }
//     });

//     if (!userLogin || !userLogin.password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

//     if (userLogin.password !== hashedPassword) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     const token = jwt.sign(
//       {
//         id: userLogin._id,
//         email: userLogin.email,
//         role: userLogin.user_id?.role_id?.role_slug || "guest"
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     res.status(200).json({
//       token,
//       user: {
//         email: userLogin.email,
//         role: userLogin.user_id?.role_id?.role_slug,
//         roleName: userLogin.user_id?.role_id?.role_name
//       }
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Login failed", error: err.message });
//   }
// };
