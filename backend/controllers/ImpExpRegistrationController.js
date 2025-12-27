const ImpExpModel = require("../models/ImpExpUser");
const UserLogin = require("../models/ImpExpUserLogin");
const logger = require("../utils/logger");
const crypto = require("crypto");

exports.createImpExp = async (req, resp) => {
  const APP_BASE_URL = process.env.APP_BASE_URL || "http://localhost:3000/";

  try {
    const userData = {
      ...req.body,
      ip_address: req.body.ip_address || req.ip,
    };
    const imp_exp_user = new ImpExpModel(userData);
    await imp_exp_user.save();

    const user_login = new UserLogin({
      impexp_userId: imp_exp_user._id,
      iec_code: imp_exp_user.iec_code,
      email: imp_exp_user.email,
      ip_address: req.body.ip_address || req.ip
    });
    await user_login.save();

    const populatedUser = await ImpExpModel.findById(imp_exp_user._id).populate("role_id");
    const roleName = populatedUser.role_id.role_slug;

    const token = crypto.randomBytes(42).toString("hex");
    const passwordSetupLink = `${APP_BASE_URL}${roleName}/impexp-pasword-generate?token=${token}&iec_code=${encodeURIComponent(req.body.iec_code)}`;

    logger.info(`User and login created successfully", ${JSON.stringify({
      impexp_userId: imp_exp_user._id,
      email: imp_exp_user.email,
      role_id: imp_exp_user.role_id,
      ip_address: user_login.ip_address,
      password_link: passwordSetupLink,
       status: 201,
      })}`,
      { code: "201" }
    );

    return resp.status(201).json({
      message: "Importr Exporter and Importr Exporter login created successfully",
      imp_exp_user: populatedUser,
      login: user_login,
      password_link: passwordSetupLink
    });

  } catch (err) {
        console.error("Error creating user and login:", err);
    logger.error(
      `Failed to create user and login: ${JSON.stringify({
        error: err.message,
        body: req.body,
        ip_address: req.ip,
      })}`,
      { code: "500" }
    );
    return resp.status(500).json({ message: err.message });
  }
};

exports.getImpExpData = async (req, resp) => {
    try {
      const imp_exp_users = await ImpExpModel.find().sort({ createdAt: -1 });
      logger.info(
        `Importer-Exporter fetched successfully: ${JSON.stringify({ImpExpModel})}`, 
        {code:201}
      );
      resp.status(200).json(imp_exp_users);
    } catch (err) {
      logger.error(`Importer-Exporter fetched failed: ${err.message}`);
      resp.status(500).json({ error: err.message });
    }
  }; 
  exports.getImpExpById = async (req, resp) => {
    try {
      const imp_exp_user = await ImpExpModel.findById(req.params.id);
      if (!imp_exp) {
        return resp.status(404).json({ error: "Importer-Exporter not found" });
      }
      resp.status(200).json(imp_exp_user);
    } catch (err) {
      resp.status(400).json({ error: err.message });
    }
  };