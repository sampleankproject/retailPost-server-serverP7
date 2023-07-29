const mongoose = require('mongoose')
const schema = mongoose.Schema

const RtPln = new schema({
    FieldOne:{type:String},
    FieldTwo:{type:String},
    FieldThree:[{PlNm:{type:String},MnLm:{type:Number},SbLm:{type:Number},Dys:{type:Number},Amt:{type:Number},DAmt:{type:Number},FAmt:{type:Number},PlCd:{type:Number}}]

},{
    collection:'RtPlnTy1'
})
const AddRtPln = mongoose.model('RtplnTy',RtPln)
module.exports = AddRtPln