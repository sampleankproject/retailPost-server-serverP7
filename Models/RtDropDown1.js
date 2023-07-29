const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const DropDown1 = new Schema({
    fieldOne:{type:String},  
    fieldTwo:[{value:{type:String},label:{type:String}}]
},{
    collection:'RtDropDown1'
})

const down1 = mongoose.model('dropdown1',DropDown1);
module.exports = down1;