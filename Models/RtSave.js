const mongoose = require('mongoose')
const schema = mongoose.Schema

const RTsave = new schema({
    RPsId:{type:String},
    UsrId:{type:String},
    RPsLDt:{type:Number}

},{
    collection:'RtSave'
})
RTsave.index({RPsId:1,UsrId:1},{unique:true});
const save1 = mongoose.model('RTsave',RTsave);
module.exports = save1;