const mongoose = require('mongoose');

const UserLoginSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: null,
    sparse: true 
  },
  role_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Role',
    default: null, 
    sparse: true
  },
  iec_codeid: { 
    type: String, 
    unique: true,
    sparse: true // Needed to allow multiple docs with null values and still enforce uniqueness
  },
  // username: { 
  //   type: String,
  //   unique: true,
  //   sparse: true // Same as above
  // },
  email: { 
    type: String, 
    required: true,
    default: null, 
    unique: true 
  },
  password: { 
    type: String,
    default: null, 
    sparse: true // Needed to allow multiple docs with null values and still enforce uniqueness
  }, // SHA-256 hashed
  remember_token: 
  { type: String,
    default: null, 
    sparse: true 
  },
  ip_address:{
    type:String,
    default: null,
    sparse:true
  },
  created_at: { 
    type: Date, 
    default: Date.now }
});

module.exports = mongoose.model('User_Login', UserLoginSchema);
