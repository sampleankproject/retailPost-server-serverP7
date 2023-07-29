const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Sesty = new schema({
        SesNId:{type:String},
        SesTy:{type:String},
        CrtDtF:{type:String},
        CrtDtF2:{type:String},
        CrtDtT:{type:String},
        CrtDtT2:{type:String},
        CrtTm:{type:String}

},{
    collection:'SessionTy'
})

const sesty = mongoose.model('SesTyp',Sesty)
module.exports = sesty