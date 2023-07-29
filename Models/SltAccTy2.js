const mongoose = require('mongoose')
const schema = mongoose.Schema;

const SltAccTy2 = new schema({
    FieldOne:{type:String},
    FieldTwo:[{label:{type:String},value:{type:String}}]


},{
    collection:'SltAccTy2'
})

const AccTy2 = mongoose.model('SltAccty2',SltAccTy2)
module.exports = AccTy2;