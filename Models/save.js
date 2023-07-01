const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SAVE = new Schema({
   UPstId:{type:String},
    UsrId:{type:String},
},{
    collection:'save'
})
SAVE.index({UPstId:1,UsrId:1},{unique:true});
const Save1 = mongoose.model('save',SAVE)
module.exports = Save1;