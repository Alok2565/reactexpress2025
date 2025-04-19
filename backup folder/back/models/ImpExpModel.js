const mongoose = require('mongoose');

const ImpExpSchema = new mongoose.Schema({
    role_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role', 
        sparse: true
      },
    iec_code :{
        type:String,
        required:true,
        unique:true
    },
    name :{
        type:String,
        required:true
    },
    name_ofCPerson :{
        type:String,
        required:true
    },
    designation :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    address :{
        type:String,
        required:true
    },
    address2 :{
        type:String,
        required:true
    },
    city :{
        type:String,
        required:true
    },
    state :{
        type:String,
        required:true
    },
    pincode :{
        type:String,
        required:true
    },
    mobile_number :{
        type:String,
        required:true
    },
    ip_address:{
        type:String,
        sparse: true,
    },
    status: { 
        type: String, 
        enum: ['0', '1'], 
        default: '1' 
    }
    }, {
      timestamps: true
});
module.exports = mongoose.model('imp_exp_users', ImpExpSchema);