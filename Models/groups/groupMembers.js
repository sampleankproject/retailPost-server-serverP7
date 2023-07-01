const mongoose = require('mongoose')
const Schema = mongoose.Schema
const groupMember = new Schema({
    grpId:{type:String},
    grpNm:{type:String},
    grpUNm:{type:String},
    grpAprNm:{type:String},
    grpNo:{type:String},
    grpMemId:{type:String},
    grpMemUNm:{type:String},
    grpMemFNm:{type:String},
    grpMemLNm:{type:String},
    grpMemSts:{type:String},
    recUId:{type:String},
    recUNm:{type:String},
    recFNm:{type:String},
    recLNm:{type:String},
    grpAdDt1:{type:String},
    grpAdDt2:[{dt:{type:String},mt:{type:String},yr:{type:String}}],
    grpAdTm:{type:String},
    grpImg:{type:String},
    grpImgPt:{type:String}  
},{
    collection:'GroupMems'
})
groupMember.index({grpId:1,grpMemId:1},{unique:true});
const groupMembers = mongoose.model('GroupMember',groupMember)
module.exports = groupMembers;

