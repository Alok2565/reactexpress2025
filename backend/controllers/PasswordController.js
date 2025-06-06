// controllers/passwordController.js
const UserLogin = require("../models/UserLogin");
const crypto = require("crypto");

exports.setPassword = async (req, res) => {
  const { email, token, password } = req.body;

  if (!email || !token || !password) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Find user login by email
    const userLogin = await UserLogin.findOne({ email });

    if (!userLogin) {
      return res.status(404).json({ message: "User login not found." });
    }

    // (Optional) You can verify if the token is valid
    // For now, assume the token is trusted (already validated or passed as a one-time use)

    // Hash the password using SHA-256
    const remember_token = crypto.randomBytes(32).toString("hex");
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    // Update the user's password and optionally the token field or IP
    userLogin.password = hashedPassword;
    userLogin.remember_token = remember_token; // optional: invalidate the token
    userLogin.ip_address = req.ip || null; // optional: log IP
    await userLogin.save();

    return res.status(200).json({ message: "Password set successfully." });
    
  } catch (error) {
    console.error("Error setting password:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/* ------------------------------------------------- *
 * 2. Importer / Exporter users (IEC code)           *
 * ------------------------------------------------- */
exports.setImpexpPassword = async (req, res) => {
  const { iec_code, token, password } = req.body;

  if (![iec_code, token, password].every(v => typeof v === "string" && v.trim())) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const userLogin = await UserLogin.findOne({ iec_code });
    if (!userLogin) return res.status(404).json({ message: "User login not found." });

    userLogin.password       = crypto.createHash("sha256").update(password).digest("hex");
    userLogin.remember_token = crypto.randomBytes(32).toString("hex");
    userLogin.ip_address     = req.ip || req.headers["x-forwarded-for"] || null;

    await userLogin.save();
    res.status(200).json({ message: "Password set successfully." });
  } catch (err) {
    console.error("Error setImpexpPassword:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};