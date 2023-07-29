const mongoose = require('mongoose')
const schema = mongoose.Schema;

const RtPlnData = new schema({
    FieldOne:{type:String},
    FieldTwo:[{label:{type:String},value:{type:String}}]
},{
    collection:'RtPln0'
})

const RtData = mongoose.model('Rtpln0',RtPlnData)
module.exports = RtData;