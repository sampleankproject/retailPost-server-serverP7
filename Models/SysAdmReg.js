const mongoose = require('mongoose')
const schema = mongoose.Schema;

const SysAdm = new schema({
    SysAdmId:{type:String},
    SysAdmUNm:{type:String},
    SysAdmPwd:{type:String},

},{
    collection:'SysAdmReg'
})

const SysAdmReg = mongoose.model('SysAdmReg',SysAdm)
module.exports = SysAdmReg;