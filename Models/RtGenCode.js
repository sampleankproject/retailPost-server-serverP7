const mongoose = require('mongoose')
const schema = mongoose.Schema;

const RtGenCode = new schema({
    RtId:{type:String},
    RtUNm:{type:String},
    RtCd:{type:String},
    RtSts:{type:String},
    RtDt1:{type:Number},
    RtDt2:{type:String}

},{
    collection:'RtCodeGenerate'
})

const RtGen = mongoose.model('RTGenCode',RtGenCode);
module.exports = RtGen;