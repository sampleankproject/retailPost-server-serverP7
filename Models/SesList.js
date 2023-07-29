const mongoose = require('mongoose')
const schema = mongoose.Schema;

const Seslst = new schema({
        SesNId:{type:String},
        SesTy:{type:String},
        SesRnk:{type:String},
        UsrID:{type:String},
        UsPsID:{type:String},
        UsPsBGID:{type:String},
        LkCnt:{type:String},
        UsrAprNm:{type:String},
        UsrUNm:{type:String},
        CrtDtF:{type:String},
        CrtDtF2:{type:String},
        CrtDtT:{type:String},
        CrtDtT2:{type:String},
        CrtTm:{type:String}

},{
    collection:'SessionLst'
})

const seslst = mongoose.model('SesLst',Seslst)
module.exports = seslst