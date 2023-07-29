const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const DropDown = new Schema({
    fieldOne:{type:String},
    fieldTwo:{type:String},
    fieldThree:{type:String},
    fieldFour:[{value:{type:String},label:{type:String}}]
},{
    collection:'RtDropDown3' // select for Clothwear type
})

const down = mongoose.model('dropdown3',DropDown);
module.exports = down;