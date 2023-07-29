const mongoose = require('mongoose')
const schema = mongoose.Schema

const RTlike = new schema({
    RPsId:{type:String},
    UsrId:{type:String}

},{
    collection:'RtLike'
})
RTlike.index({RPsId:1,UsrId:1},{unique:true});
const like1 = mongoose.model('RTlike',RTlike);
module.exports = like1;