const mongoose = require('mongoose')
const Schema = mongoose.Schema
const requestSendReceive = new Schema({
    ReqSRId:{type:String},
    rUsrIdF:{type:String},
    rUsrAprNmF:{type:String},
    rUsrIdT:{type:String},
    grpId:{type:String},
    status:{type:String},
    rPhnoF:{type:String},
    rPhnoT:{type:String},
    rUsrNmF:{type:String},
    rUsrFNmF:{type:String},
    rUsrLNmF:{type:String},
    grpNm:{type:String},                      
    grpUNm:{type:String},  
    delT:{type:String},
    delF:{type:String},
    date:{type:String},
    time:{type:String},
    grpImg:{type:String}                                                                   
},{
    collection:'requestSR'
})
const Request = mongoose.model('requestSendReceive',requestSendReceive)
module.exports = Request;