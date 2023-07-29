const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const DropDown4 = new Schema({
    fieldOne:{type:String},  
    fieldTwo:{type:String},  
    fieldThree:{type:String},
    fieldFour:[{id:{type:String},value:{type:String}}]
},{
    collection:'RtDropDown4'
})

const down4 = mongoose.model('dropdown4',DropDown4);
module.exports = down4;