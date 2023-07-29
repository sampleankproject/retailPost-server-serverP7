const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const DropDown2 = new Schema({
    fieldOne:{type:String},  
    fieldTwo:[{value:{type:String},label:{type:String}}]
},{
    collection:'RtDropDown2' // select for type 1 sub catagories
})

const down2 = mongoose.model('dropdown2Rt',DropDown2);
module.exports = down2;