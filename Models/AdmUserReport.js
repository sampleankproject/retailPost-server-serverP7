const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const AdmUserreport = new Schema({
    PstId:{type:String},
    date1:{type:String},
    date2:{type:String},
    date3:[{dt:{type:String},mt:{type:String},yr:{type:String}}],  
    time:{type:String} 
},{
    collection:'AdmURep'
})

const report = mongoose.model('AdmUserReprt',AdmUserreport)
module.exports = report;