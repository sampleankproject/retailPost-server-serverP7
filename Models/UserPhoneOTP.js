const mongoose = require('mongoose')
const schema = mongoose.Schema;

const UsrPhOTP = new schema({
  
    UsrPhNo:{type:Number},
    UsrPhOtp:{type:Number},
    createdAt: { type: Date, expires: '15m', default: Date.now },

},{
    collection:'UsrPhoneOTP'
})

const UsrphoneOtp = mongoose.model('UsrPhNoOTP',UsrPhOTP)
module.exports = UsrphoneOtp;