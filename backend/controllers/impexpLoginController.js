const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const ImpExpUserLoginModel = require("../models/ImpExpUserLogin");
const ImpExpModel = require("../models/ImpExpUser");

exports.loginImpExpUser = async (req, res) => {
  const { iec_code, password } = req.body;

  if (!iec_code || !password) {
    return res.status(400).json({
      message: "IEC Code and password are required.",
    });
  }

  try {
    const impexpLogin = await ImpExpUserLoginModel
      .findOne({ iec_code })
      .populate({
        path: "impexp_userId",
        populate: { path: "role_id" },
      });

    if (!impexpLogin) {
      return res.status(401).json({
        message: "Invalid credentials: IEC Code not found.",
      });
    }

    if (!impexpLogin.password) {
      return res.status(401).json({
        message: "Password not set. Please set your password first.",
      });
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (impexpLogin.password !== hashedPassword) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    if (!impexpLogin.impexp_userId) {
      return res.status(500).json({
        message: "Linked Importer Exporter user not found.",
      });
    }

    const impexp_user = await ImpExpModel.findById(
      impexpLogin.impexp_userId._id
    );

    if (!impexp_user) {
      return res.status(500).json({
        message: "User record missing.",
      });
    }

    const role =
      impexpLogin.impexp_userId?.role_id?.role_slug || "guest";
    const roleName =
      impexpLogin.impexp_userId?.role_id?.role_name || "Unknown";

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "Server misconfiguration: missing JWT secret",
      });
    }

    const token = jwt.sign(
      {
        id: impexpLogin._id,
        iec_code: impexpLogin.iec_code,
        role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      token,
      impexp_user: {
        iec_code: impexpLogin.iec_code,
        name: impexp_user.name || "",
        designation: impexp_user.designation || "",
        role,
        role_name: roleName,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
};
