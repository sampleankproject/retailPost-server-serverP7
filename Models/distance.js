const mongoose = require('mongoose');
const schema = mongoose.Schema;

const distance = new schema({
    fieldOne:{type:String},
    fieldTwo:[{latitude:{type:String},longitude:{type:String},C:{type:Number}}],

},{
    collection:'Distance'
})

const distance1 = mongoose.model('distance',distance);
module.exports = distance1;