const mongoose = require('mongoose')
const schema = mongoose.Schema

const sltReg = new schema({

    SltId:{type:String},
    SltUNm:{type:String},
    SltPwd:{type:String},
    SltFNm:{type:String},
    SltLNm:{type:String},
    SltGnd:{type:String},
    SltDob:{type:String},
    SltOrgNm:{type:String},
    SltOrgId:{type:String},
    SltIdTy:{type:String},
    SltIdNo:{type:String},
    SltPh:{type:String},
    SltEml:{type:String},
    SltImg:{type:String},
    SltAddr:{type:String},
    SltRegDt:{type:String},
    SltAccTy:{type:String}


},{
    collection:'SltReg'
})

const sltreg = mongoose.model('SLTReg',sltReg)
module.exports = sltreg;