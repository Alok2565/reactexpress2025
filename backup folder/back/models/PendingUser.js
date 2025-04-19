const mongoose = require('mongoose');

const PendingUserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true,
    unique: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Role' 
  },
  status: { 
    type: String, 
    required: true 
  },
  token: { 
    type: String, 
    required: true,
    unique: true
  },
  expires_at: { 
    type: Date, 
    required: true 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

// Add index for token and expires_at for faster queries
PendingUserSchema.index({ token: 1 });
PendingUserSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Pending_User', PendingUserSchema);
