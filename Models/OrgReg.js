const mongoose = require('mongoose')
const schema = mongoose.Schema;

const OrgReg = new schema({
        OrgId:{type:String},
        OrgUNm:{type:String},
        OrgPwd:{type:String},
        OrgNm:{type:String},
        OrgPh:{type:String},
        OrgEml:{type:String},
        OrgImg:{type:String},
        OrgAddr:{type:String},
        OrgRegDt:{type:String},

},{
    collection:'OrgRegistration'
})

const orgReg = mongoose.model('orgreg',OrgReg)
module.exports = orgReg