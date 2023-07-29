const mongoose = require('mongoose')
const schema = mongoose.Schema

const Transaction = new schema({
    RtId:{type:String},
    TranId:{type:String},
    OrderId:{type:String},
    DateA1:{type:String},
    DateA2:{type:String},
    DateA3:{type:String},
    DateB1:{type:String},
    DateB2:{type:String},
    DateB3:{type:String},
    TimeA1:{type:String},
    TimeA2:{type:String},
    TimeB1:{type:String},
    TimeB2:{type:String},
    Amt:{type:String},
    PlnNm:{type:String},
    TranTy:{type:String},
    TranSts:{type:String},
    RzPayId:{type:String},
    RecptNo:{type:String}

},{
    collection:'RtTransaction'
})
const trans = mongoose.model('transaction',Transaction)
module.exports = trans;