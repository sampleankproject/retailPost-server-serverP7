const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LIKE = new Schema({
   UPstId:{type:String},
    UsrId:{type:String},
},{
    collection:'Like'
})
LIKE.index({UPstId:1,UsrId:1},{unique:true});
const Like1 = mongoose.model('like',LIKE)
module.exports = Like1;