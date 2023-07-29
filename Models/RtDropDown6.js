const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const DropDown6 = new Schema({
    fieldOne:{type:String},
    fieldTwo:{type:String},
    fieldThree:[{value:{type:String},label:{type:String}}]
    
},{
    collection:'RtDropDown6' // select for Measure Type
})

const down6 = mongoose.model('dropdown6',DropDown6);
module.exports = down6;