const mongoose = require('mongoose')
const schema = mongoose.Schema;

const RtPlaceImg = new schema({
    RPsId:{type:String},
    RPin:{type:Number},
    RHbl:{type:String},
    RHbl2:{type:String},
    RHbl3:{type:String},
    RTlk:{type:String},
    RTlk2:{type:String},
    RTlk3:{type:String},
    RDst:{type:String},
    RDst2:{type:String},
    RSt:{type:String},
    RSt2:{type:String},

    RPsDt4:{type:String},
    RPsDt5:{type:Number},
    RPsDt6:{type:String},

    // RPsSt1:{type:String},
    // RPsSt2:{type:String},
    // RPsVrAd:{type:String}

  


},{
    collection:'RtImgUploadPlace'
})
RtPlaceImg.index({RHbl:'text',RHbl2:'text',RHbl3:'text',RTlk:'text',RTlk2:'text',RTlk3:'text',RDst:'text',RDst2:'text',RSt:'text',RSt2:'text'})

const RtImgPlace = mongoose.model('RtImgPlaceUpload',RtPlaceImg);
module.exports = RtImgPlace;