const mongoose = require('mongoose')
const schema = mongoose.Schema;

const SltAccTy = new schema({
    FieldOne:{type:String},
    FieldTwo:[{label:{type:String},value:{type:String}}]


},{
    collection:'SltAccTy'
})

const AccTy = mongoose.model('SltAccty',SltAccTy)
module.exports = AccTy;