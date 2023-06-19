const mongoose = require('mongoose')
const Schema = mongoose.Schema

const register = new Schema({
    UsrId:{type:String},
    mailId:{type:String},
    psw:{type:String},
    phnCd:{type:String},
    phno:{type:String},
    phno2:{type:String},
    usrNm:{type:String},
    fNm:{type:String},
    lNm:{type:String},
    apNm:{type:String},
    gnd:{type:String},
    rgTm:{type:String},
    rgDt1:{type:String},
    rgDt2:[{dt:{type:String},mt:{type:String},yr:{type:String}}],
    UsrImg:{type:String},
    UsrImgPt:{type:String},
    yob:{type:Number},
    dst:{type:String},
    st:{type:String},
    cntry:{type:String},
    dst2:{type:String},
    st2:{type:String},
    cntry2:{type:String},
    tkFcm:{type:String},
    tkFcmDt:{type:String},
    VlRef:{type:String}

},{
    collection:'RegistrationFull'
})

const reg = mongoose.model('registerFull',register)
module.exports = reg;