const mongoose = require('mongoose')
const schema = mongoose.Schema

const RTreport = new schema({
    RPsId:{type:String},
    UsrId:{type:String},
    RtRepTy:{type:String}

},{
    collection:'RtReport'
})
RTreport.index({RPsId:1,UsrId:1},{unique:true});
const report1 = mongoose.model('RTreport',RTreport);
module.exports = report1;