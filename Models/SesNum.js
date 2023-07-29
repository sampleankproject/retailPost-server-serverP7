const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Sesnum = new schema({
        SesNId:{type:String},
        CrtDtF:{type:String},
        CrtDtF2:{type:String},
        CrtDtT:{type:String},
        CrtDtT2:{type:String},
        CrtTm:{type:String}

},{
    collection:'SessionNum'
})

const sesnum = mongoose.model('SesNum',Sesnum)
module.exports = sesnum