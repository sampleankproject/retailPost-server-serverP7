const mongoose = require('mongoose')
const schema = mongoose.Schema;

const RtIniReq = new schema({
    RtId:{type:String},
    RtNm:{type:String},
    RtPhn:{type:String},
    RtPin:{type:String},
    RtTlk:{type:String},
    RtDst:{type:String},
    RtStrTy:{type:String},
    RtSt:{type:String},
    RtRefCd:{type:String},
    RtOrgId:{type:String},
    RtSltId:{type:String},
    RtSts:{type:String},
    RtCmt:{type:String},
    RtDate1:{type:String},
    RtDate2:{type:String},
    RtDate3:{type:String}


},{
    collection:'RtIniReq'
})

const RtIni = mongoose.model('RtInireq',RtIniReq)
module.exports = RtIni;