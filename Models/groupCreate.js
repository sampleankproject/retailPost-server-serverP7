const mongoose = require('mongoose')
const Schema = mongoose.Schema

const group = new Schema({
    grpId:{type:String},
    grpNm:{type:String},
    grpUNm:{type:String,unique:true},
    grpSts:{type:String},
    grpAprNm:{type:String},
    gcrtDt1:{type:String},
    gcrtTm:{type:String},
    gcrtUId:{type:String},
    gcrtUNm:{type:String},
    gcrtFNm:{type:String},
    gcrtLNm:{type:String},
    gcrtDt2:[{dt:{type:String},mt:{type:String},yr:{type:String}}],
    grpImg:{type:String},
    grpImgPt:{type:String}
    
},{
    collection:'GroupCreate'
})
group.index({grpNm:'text',grpUNm:'text'})
const groupCreate = mongoose.model('GroupCreate',group)
module.exports = groupCreate;

