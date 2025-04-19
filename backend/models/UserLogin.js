const mongoose = require("mongoose");

const userLoginSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    sparse: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    sparse: true 
},
password: { 
    type: String,
    default: null, 
    sparse: true // Needed to allow multiple docs with null values and still enforce uniqueness
  }, // SHA-256 hashed
remember_token:{ 
    type: String,
    default: null, 
    sparse: true 
  },
  ip_address:{
    type:String,
    default: null,
    sparse:true
  },
 
},{
    timestamps: true
});

module.exports = mongoose.model("User_Login", userLoginSchema);
