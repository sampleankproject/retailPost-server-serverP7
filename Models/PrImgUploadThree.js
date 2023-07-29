const mongoose = require('mongoose')
const schema = mongoose.Schema;

const PrImg3 = new schema({
    RPsTy2:{type:String}, /// Type  RtPst or RtAdmt
    Pr1Nm:{type:String},
    Pr1Id:{type:String},
    Pr1Pst:{type:String}, //Position
    PrDt1:{type:String},
    PrDt2:{type:String},
    PrDt3:{type:Number},
    Cnt:{type:String},
    St:{type:String},
    Ct:{type:String},
    Pin:{type:String},
    Email:{type:String},
    PhSt:{type:String},
    Ph:{type:String},
    WebSt:{type:String},
    WebTy:{type:String},
    WebLnk:{type:String},
    Img1:{type:String},
    ImgSz1:{type:String},
    Img2:{type:String},
    ImgSz2:{type:String},     

},{
    collection:'PrImgUploadThree'
})

const PrImgUploadThree = mongoose.model('PrimgUploadThree',PrImg3);
module.exports = PrImgUploadThree;