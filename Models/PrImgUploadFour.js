const mongoose = require('mongoose')
const schema = mongoose.Schema;

const PrImg4 = new schema({
    PsTp:{type:String}, /// Type  UPst or UAdmt
    Pr2Nm:{type:String},
    Pr2Id:{type:String},
    Pr2Pst:{type:String}, //Position
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
    collection:'PrImgUploadFour'
})

const PrImgUploadFour = mongoose.model('PrimgUploadFour',PrImg4);
module.exports = PrImgUploadFour;