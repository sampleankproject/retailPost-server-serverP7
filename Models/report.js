const mongoose = require('mongoose');
const Schema = mongoose.Schema

const report = new Schema({
    PstId:{type:String},
    UsrId:{type:String},
    RepTy:{type:String},
},{
    collection:'Report'
})

report.index({PstId:1,UsrId:1},{unique:true});
const reporting = mongoose.model('report',report);
module.exports = reporting;