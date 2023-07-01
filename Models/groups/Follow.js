const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FOLLOW = new Schema({
   UGrpId:{type:String},
    UsrId:{type:String},
},{
    collection:'Follow'
})
FOLLOW.index({UGrpId:1,UsrId:1},{unique:true});
const Follow1 = mongoose.model('follow',FOLLOW)
module.exports = Follow1;