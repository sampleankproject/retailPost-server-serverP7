const mongoose = require('mongoose')
const schema = mongoose.Schema
const TransactionFail = new schema({

    RtId:{type:String},
    RtTranId:{type:String},
    RtRpPymId:{type:String},
    RtRpOrdId:{type:String},
    RtPlnNm:{type:String},
    RpErrCd:{type:String},
    RpErrDis:{type:String},
    RtTranDate:{type:String}

},{
    collection:"RtTransactionFail"
})

const transFail = mongoose.model('FailTrans',TransactionFail)
module.exports = transFail;