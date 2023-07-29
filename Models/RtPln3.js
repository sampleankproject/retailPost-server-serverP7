const mongoose = require('mongoose')
const schema = mongoose.Schema

const RtPln3 = new schema({
    FieldOne:{type:String},
    FieldTwo:{type:String},
    FieldThree:[{PlNm:{type:String},MnLm:{type:Number},SbLm:{type:Number},Dys:{type:Number},Amt:{type:Number},DAmt:{type:Number},FAmt:{type:Number},PlCd:{type:Number}}]

},{
    collection:'RtPlnTy3'
})
const AddRtPln3 = mongoose.model('RtplnTy3',RtPln3)
module.exports = AddRtPln3