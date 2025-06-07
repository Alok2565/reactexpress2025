// const UserLogin = require("../models/UserLogin");
// const User = require("../models/User");
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
//     const user = await User.findById(userLogin.user_id._id);

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
//         name: user?.name || null,
//         designation: user?.designation || null,
//         role: userLogin.user_id?.role_id?.role_slug,
//         role_name: userLogin.user_id?.role_id?.role_name
//       }
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Login failed", error: err.message });
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

// exports.loginImpExpUser = async (req, res) => {
//   const { iec_code, password } = req.body;

//   if (!iec_code || !password) {
//     return res.status(400).json({ message: "IEC Code and password are required." });
//   }

//   try {
//     const userLogin = await UserLogin.findOne({ iec_code }).populate({
//       path: "impexp_userId",
//       populate: { path: "role_id" },
//     });

//     if (!userLogin || !userLogin.password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

//     if (userLogin.password !== hashedPassword) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     const impexp_user = await ImpExpUser.findById(userLogin.impexp_userId._id);

//     const role = userLogin.impexp_userId?.role_id?.role_slug || "guest";

//     const token = jwt.sign(
//       {
//         id: userLogin._id,
//         iec_code: userLogin.iec_code,
//         role: role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     return res.status(200).json({
//       token,
//       impexp_user: {
//         iec_code: userLogin.iec_code,
//         name: impexp_user?.name || null,
//         designation: impexp_user?.designation || null,
//         role: role,
//         role_name: userLogin.impexp_userId?.role_id?.role_name,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ message: "Login failed", error: err.message });
//   }
// };