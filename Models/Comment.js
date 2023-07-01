const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Comment = new Schema({
    UPstId:{type:String},
    UsrId:{type:String},
    UCmt:{type:String}
},{
    collection:'comment'
})

Comment.index({UPstId:1,UsrId:1},{unique:true});
const comment = mongoose.model('comment',Comment)
module.exports = comment;