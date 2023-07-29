const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RPostData = new Schema({
    RPsId:{type:String},
    RPsTy1:{type:String},
    RPsTy2:{type:String},
    RPsTy3:{type:String},
    PrTy1:{type:String},
    PrTy2:{type:String},     // this field is also indicate Gender
    PrTy22:{type:String},
    PrTy23:{type:String},
    PrNm1:{type:String},
    PrNm2:{type:String},
    PrTy3:{type:String},     // this field is also indicate Silk/cotton
    PrTy4:{type:String},     // this field is indicate Size
    PrTy5:{type:String},     // this field is indicate Weather Type
    PrSz:[{value:{type:String}}],
    PrNum:{type:String},
    PrPtn:{type:String},
    PrStb:[{value:{type:String}}],
    PrStb1:{type:String},
    PrStb2:{type:String},
    PrStb3:{type:String},
    PrClAry:[{Cl:{type:String}}],
    PrCl1:{type:String},
    PrCl2:{type:String},
    PrClCd1:{type:String},
    PrClCd2:{type:String},
    PrId:{type:String},
    PrPrcTy:{type:String},
    PrNt1:{type:String},    // Note 1
    PrNt2:{type:String},    // Note 2
    PrNt3:{type:String},    // Note 3
    PrPrc1:{type:Number},
    PrPrc2:{type:Number},
    PrPrc3:{type:Number},
    PrPrc4:{type:Number},
    PrBrn:{type:String},
    RPrPsTm:{type:String},
    RPrDtNs:{type:Number},
    RPrDts:[{Dt:{type:String}}],
    RPsDt1:{type:String},
    RPsDt2:{type:String},
    RPsDt3:{type:Number},
    RPsDt4:{type:Number},
    RPsDt5:{type:String},
    RPsDt6:{type:String},
    RtId:{type:String},
    RCoCd:{type:Number},
    RNm:{type:String},
    RUNm:{type:String},
    RBrNm:{type:String},
    RImgL:{type:String},
    RPsSt1:{type:String},
    RPsSt2:{type:String},
    RPsVrAd:{type:String},
    RPsImg:[{img0:{type:String}}],
    RPsImgPt:[{img0:{type:String}}],

    RCo1:[{latitude:{type:String},longitude:{type:String}}],
    RCo2:{type:{type:String},coordinates:[{type:Number},{type:Number}]},
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
    RSt2:{type:String}


},{
    collection:'RtImageUpload'
})

RPostData.index({RNm:'text',RUNm:'text',RBrNm:'text',RPsTy3:'text',PrTy1:'text',PrTy2:'text',PrTy5:'text',PrTy22:'text',PrTy23:'text', PrNm1:'text',PrNm2:'text',PrTy3:'text',PrPtn:'text',PrCl1:'text',PrCl2:'text',PrStb1:'text',PrStb2:'text',PrStb3:'text',PrBrn:'text', PrPrcTy:'text',RHbl:'text',RHbl2:'text',RHbl3:'text',RTlk:'text',RTlk2:'text',RTlk3:'text',RDst:'text',RDst2:'text',RSt:'text',RSt2:'text'})


const RpostData = mongoose.model('Rupload',RPostData)
module.exports = RpostData;

// PrTy1:Clothwear

// RPostData.index({RPsTy3:'text',PrTy2:'text',PrNm1:'text',PrNm2:'text',PrTy3:'text',PrPtn:'text',PrCl1:'text',PrCl2:'text',PrPrcTy:'text',RHbl:'text',RHbl2:'text',RHbl3:'text',RTlk:'text',RTlk2:'text',RTlk3:'text',RDst:'text',RDst2:'text',RSt:'text',RSt2:'text'})






