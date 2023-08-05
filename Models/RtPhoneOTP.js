const mongoose = require('mongoose')
const schema = mongoose.Schema;

const RtPhOTP = new schema({
    RtId:{type:String},
    RtPhNo:{type:Number},
    RtPhOtp:{type:Number},
    createdAt: { type: Date, expires: '15m', default: Date.now },

},{
    collection:'RtPhoneOTP'
})

const RtphoneOtp = mongoose.model('RtPhOtp',RtPhOTP)
module.exports = RtphoneOtp;