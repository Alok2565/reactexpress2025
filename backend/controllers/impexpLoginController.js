const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const UserLogin = require("../models/UserLogin");
const ImpExpModel = require("../models/ImpoterExporter");


exports.loginImpExpUser = async (req, res) => {
  const { iec_code, password } = req.body;

  if (!iec_code || !password) {
    return res.status(400).json({ message: "IEC Code and password are required." });
  }

  try {
    // console.log("🔍 Attempting login for IEC:", iec_code);

    const userLogin = await UserLogin.findOne({ iec_code }).populate({
      path: "impexp_userId",
      populate: { path: "role_id" },
    });

    if (!userLogin) {
      //console.log("❌ IEC Code not found in UserLogin");
      return res.status(401).json({ message: "Invalid credentials: IEC Code not found." });
    }

    if (!userLogin.password) {
      //console.log("❌ Password not set for this user");
      return res.status(401).json({ message: "Password not set. Please set your password first." });
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    if (userLogin.password !== hashedPassword) {
      //console.log("❌ Password mismatch");
      return res.status(401).json({ message: "Incorrect password" });
    }

    if (!userLogin.impexp_userId) {
      //console.log("❌ impexp_userId not linked in UserLogin");
      return res.status(500).json({ message: "Linked Importer Exporter user not found." });
    }

    const impexp_user = await ImpExpModel.findById(userLogin.impexp_userId._id);

    if (!impexp_user) {
      //console.log("❌ ImpExp user data not found");
      return res.status(500).json({ message: "User record missing." });
    }

    const role = userLogin.impexp_userId?.role_id?.role_slug || "guest";
    const roleName = userLogin.impexp_userId?.role_id?.role_name || "Unknown";

    if (!process.env.JWT_SECRET) {
      //console.error("❌ JWT_SECRET not defined in .env");
      return res.status(500).json({ message: "Server misconfiguration: missing JWT secret" });
    }

    const token = jwt.sign(
      {
        id: userLogin._id,
        iec_code: userLogin.iec_code,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    //console.log("✅ Login successful for IEC:", iec_code);

    return res.status(200).json({
      token,
      impexp_user: {
        iec_code: userLogin.iec_code,
        name: impexp_user.name || "",
        designation: impexp_user.designation || "",
        role: role,
        role_name: roleName,
      },
    });
  } catch (err) {
    //console.error("🔥 Login error:", err);
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};
