const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const DropDown5 = new Schema({
    fieldOne:{type:String},
    fieldTwo:{type:String},
    fieldThree:{type:String},
    fieldFour:[{value:{type:String},label:{type:String}}]
},{
    collection:'RtDropDown5' // select for product type
})

const down5 = mongoose.model('dropdown5',DropDown5);
module.exports = down5;