const mongoose = require("mongoose");

const UserLoginHistorySchema = new mongoose.Schema(
  {
    login_type: {
      type: String,
      enum: ["USER", "IMPEXP"], // USER = admin/icmr/committee
      required: true,
    },

    // role For admin / icmr / committee
    user_loginId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User_Login",
      default: null,
    },
    email: {
      type: String,
      default: null,
    },

    // For importer-exporter role imp-exp
    impexp_user_loginId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Imp_Exp_User_Logins",
      default: null,
    },
    iec_code: {
      type: String,
      default: null,
    },

    ip_address: {
      type: String,
      default: null,
    },
    browser: {
      type: String,
      default: null,
    },
    platform: {
      type: String,
      default: null,
    },

    login_datetime: {
      type: Date,
      default: Date.now,
    },
    logout_datetime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("User_Login_Histories",UserLoginHistorySchema);
