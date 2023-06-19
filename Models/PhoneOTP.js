const mongoose = require('mongoose')
const schema = mongoose.Schema;

const PhOTP = new schema({
    UsrId:{type:String},
    PhNo:{type:Number},
    PhOtp:{type:Number},
    createdAt: { type: Date, expires: '15m', default: Date.now },

},{
    collection:'UsrResetPhOTP'
})

const phoneOtp = mongoose.model('PhOtp',PhOTP)
module.exports = phoneOtp;