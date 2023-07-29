const mongoose = require('mongoose')
const schema = mongoose.Schema;

const RtRating = new schema({
    RtId:{type:String},
    RtUNm:{type:String},
    UsrId:{type:String},
    RtRtng1:{type:String},
    RtRtng2:{type:String},
    RtRtng3:{type:String},
    RtRtng4:{type:Number},
    RtDt1:{type:Number},
    RtDt2:{type:String}

},{
    collection:'RtRating'
})

const Rating = mongoose.model('RTRating',RtRating);
module.exports = Rating;