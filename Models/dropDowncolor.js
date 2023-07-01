const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const dropDown = new Schema({
    fieldOne:{type:String},
    fieldTwo:{type:String},
    fieldThree:[{value:{type:String},label:{type:String},icon:{type:String}}]

},{
    collection:'DropDownColor'
})
const DropDownColor = mongoose.model('DropDown',dropDown)
module.exports = DropDownColor;