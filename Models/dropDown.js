const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const DropDown = new Schema({
    fieldOne:{type:String},
    fieldTwo:{type:String},
    fieldThree:[{value:{type:String},label:{type:String}}]
},{
    collection:'DropDown'
})

const down = mongoose.model('dropdown',DropDown);
module.exports = down;