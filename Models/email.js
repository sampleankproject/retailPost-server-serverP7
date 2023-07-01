const  mongoose  = require('mongoose');
const Schema = mongoose.Schema

const memberSchema = new Schema({
    email:{type:String},
    userotp:{type:String},
    createdAt: { type: Date, expires: '15m', default: Date.now },
},{
    
    collection:'emailOtp'

});

const member = mongoose.model('Member',memberSchema)
module.exports = member;