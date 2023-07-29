const mongoose = require('mongoose')
const RtReportDt = mongoose.Schema

const RtRepDt = new RtReportDt({
    RtRepId:{type:String},
    RtId:{type:String},
    RtMlId:{type:String},
    RtPhn:{type:String},
    Value1:{type:String},
    Value2:{type:String},
    Date1:{type:String},
    Date2:{type:String},
    Date3:{type:Number},
    RtRepSts:{type:String}

},{
    collection:'RtReportAN'
})
const accessData = mongoose.model('RTAnReport',RtRepDt) 
module.exports = accessData;