const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const DropDown2 = new Schema({
    fieldOne:{type:String},
    fieldTwo:{type:String},
    fieldThree:[{value:{type:String},label:{type:String},a:{type:String},b:{type:String},c:{type:String}}],
    // fieldTwo:[{value:{a:{type:String},b:{type:String}},label:{type:String}}]
},{
    collection:'DropDown2'
})

const down2 = mongoose.model('dropdown2',DropDown2);
module.exports = down2;