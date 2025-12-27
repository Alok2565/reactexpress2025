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
const ImpExpUserLogin = require("../models/ImpExpUserLogin");
const ImpExpUser = require("../models/ImpExpUser");
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


exports.verifyOtpImpExp = async (req, res) => {
  try {
    const { otp, otp_token } = req.body;

    /* 1️⃣ Validate input */
    if (!otp || !otp_token) {
      return res.status(400).json({
        message: "OTP and token are required",
      });
    }

    /* 2️⃣ Verify OTP token */
    const decoded = jwt.verify(otp_token, process.env.JWT_SECRET);

    /* 3️⃣ Compare OTP */
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp.trim())
      .digest("hex");

    if (hashedOtp !== decoded.otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    /* 4️⃣ Fetch login record */
    const impExpLogin = await ImpExpUserLogin.findById(decoded.uid);

    if (!impExpLogin) {
      return res.status(404).json({ message: "Login record not found" });
    }

    if (!impExpLogin.impexp_userId) {
      return res.status(500).json({
        message: "ImpExp user not linked with login record",
      });
    }

    /* 5️⃣ Fetch actual ImpExp user + role */
    const impExpUser = await ImpExpUser
      .findById(impExpLogin.impexp_userId)
      .populate("role_id");

    if (!impExpUser || !impExpUser.role_id) {
      return res.status(500).json({
        message: "Role not assigned to Importer Exporter",
      });
    }

    /* 6️⃣ Mark OTP verified */
    impExpLogin.otp_verified = true;
    await impExpLogin.save();

    /* 7️⃣ Generate final auth token */
    const token = jwt.sign(
      {
        id: impExpLogin._id,
        iec_code: impExpLogin.iec_code,
        role: impExpUser.role_id.role_slug,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    logger.info(`OTP verified | IEC: ${impExpLogin.iec_code}`);

    /* 8️⃣ Send response */
    return res.status(200).json({
      token,
      user: {
        iec_code: impExpLogin.iec_code,
        email: impExpLogin.email,
        name: impExpUser.name || null,
        designation: impExpUser.designation || null,
        role: impExpUser.role_id.role_slug,
        role_name: impExpUser.role_id.role_name,
      },
    });

  } catch (err) {
    logger.error("OTP verification failed", err);
    return res.status(401).json({
      message: "OTP expired or invalid",
    });
  }
};


