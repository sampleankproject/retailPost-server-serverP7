const mongoose = require('mongoose')
const schema = mongoose.Schema

const RtPln2 = new schema({
    FieldOne:{type:String},
    FieldTwo:[{label:{type:String},value:{type:String}}]

},{
    collection:'RtPlnTy2'
})
const AddRtPln2 = mongoose.model('RtplnTy2',RtPln2)
module.exports = AddRtPln2