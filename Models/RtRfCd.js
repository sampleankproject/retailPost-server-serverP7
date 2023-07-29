const mongoose = require('mongoose')
const schema = mongoose.Schema

const RtRfCd = new schema({
    RtId:{type:String},
    RtPlNm:{type:String},
    RfRtCd:{type:String},
    RfPlCd:{type:Number}

},{
    collection:'RtRefCd'
})

const rtrfcd = mongoose.model('RfRtCd',RtRfCd)
module.exports = rtrfcd;