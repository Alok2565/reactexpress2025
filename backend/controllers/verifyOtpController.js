// const jwt = require("jsonwebtoken");
// const UserLogin = require("../models/UserLogin");
// const User = require("../models/User");
// const crypto = require("crypto");
// const logger = require("../utils/logger");

// exports.verifyOtp = async (req, res) => {
//   const { otp, otp_token } = req.body;

//   if (!otp || !otp_token) {
//     return res.status(400).json({ message: "OTP required" });
//   }

//   try {
//     // 🔓 Verify OTP token
//     const decoded = jwt.verify(otp_token, process.env.JWT_SECRET);

//     // 🔐 Hash entered OTP
//     const hashedOtp = crypto
//       .createHash("sha256")
//       .update(otp)
//       .digest("hex");

//     // ❌ OTP mismatch
//     if (hashedOtp !== decoded.otp) {
//       logger.warn("Invalid OTP attempt");
//       return res.status(401).json({ message: "Invalid OTP" });
//     }

//     // ✅ OTP verified — fetch user
//     const userLogin = await UserLogin.findById(decoded.uid).populate({
//       path: "user_id",
//       populate: { path: "role_id" },
//     });

//     if (!userLogin) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const user = await User.findById(userLogin.user_id._id);

//     // 🔑 FINAL LOGIN TOKEN
//     const token = jwt.sign(
//       {
//         id: userLogin._id,
//         email: userLogin.email,
//         role: userLogin.user_id.role_id.role_slug,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     logger.info(`OTP verified for ${userLogin.email}`);

//     return res.json({
//       token,
//       user: {
//         email: userLogin.email,
//         name: user?.name,
//         designation: user?.designation,
//         role: userLogin.user_id.role_id.role_slug,
//         role_name: userLogin.user_id.role_id.role_name,
//       },
//     });
//   } catch (err) {
//     logger.error("OTP verification failed", err);
//     return res.status(401).json({ message: "OTP expired or invalid" });
//   }
// };
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const UserLogin = require("../models/UserLogin");
const User = require("../models/User");
const logger = require("../utils/logger");

exports.verifyOtp = async (req, res) => {
  try {
    const { otp, otp_token } = req.body;

    if (!otp || !otp_token) {
      return res.status(400).json({ message: "OTP required" });
    }

    // 🔓 VERIFY OTP TOKEN
    const decoded = jwt.verify(otp_token, process.env.JWT_SECRET);

    // 🔐 HASH USER ENTERED OTP
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (hashedOtp !== decoded.otp) {
      logger.warn("Invalid OTP attempt");
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // 👤 FETCH USER
    const userLogin = await UserLogin.findById(decoded.uid).populate({
      path: "user_id",
      populate: { path: "role_id" },
    });

    if (!userLogin) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await User.findById(userLogin.user_id._id);

    // 🔑 FINAL LOGIN JWT
    const token = jwt.sign(
      {
        id: userLogin._id,
        email: userLogin.email,
        role: userLogin.user_id.role_id.role_slug,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    logger.info(`OTP verified successfully for ${userLogin.email}`);

    return res.status(200).json({
      token,
      user: {
        email: userLogin.email,
        name: user?.name || null,
        designation: user?.designation || null,
        role: userLogin.user_id.role_id.role_slug,
        role_name: userLogin.user_id.role_id.role_name,
      },
    });
  } catch (err) {
    logger.error("OTP verification failed", err);
    return res.status(401).json({ message: "OTP expired or invalid" });
  }
};
