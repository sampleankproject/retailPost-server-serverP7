const mongoose = require('mongoose')
const schema = mongoose.Schema

const RTfollow = new schema({
    RtId:{type:String},
    UsrId:{type:String}

},{
    collection:'RtFollow'
})
RTfollow.index({RtId:1,UsrId:1},{unique:true});
const Follow1 = mongoose.model('RTfollow',RTfollow);
module.exports = Follow1;