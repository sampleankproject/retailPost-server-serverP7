const mongoose = require('mongoose')
const schema = mongoose.Schema

const RtRnwl = new schema({
   RtId:{type:String},
   RtTranId:{type:String},
   RtPlNm:{type:String},
   RtPlnTy:{type:String},
   RtMLlmt:{type:String},
   RtSLmt:{type:String},
   RtAmt1:{type:String},
   RtAmt2:{type:String},
   RtDys:{type:String},
   DateA1:{type:String},
   DateA2:{type:String},
   DateA3:{type:String},
   DateB1:{type:String},
   DateB2:{type:String},
   DateB3:{type:String},
   TimeA:{type:String},
   TimeB:{type:String},
   RnwlSts:{type:String},
   RcptId:{type:String},
   RzOrdId:{type:String},
   RzPayId:{type:String},
 

},{
    collection:'RtRnwl'
})
const Rtn = mongoose.model('RTRnwl',RtRnwl)
module.exports = Rtn;