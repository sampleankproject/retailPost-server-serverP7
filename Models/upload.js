const mongoose = require('mongoose')
const Schema = mongoose.Schema
const upload = new Schema({
    UPsId:{type:String},
    PsTp:{type:String},
    PsSts:{type:String},
    PsAdmSts:{type:String},
    PsBId:{type:String},
    PsBAprNm:{type:String},
    PsBUNm:{type:String},
    PsBFNm:{type:String},
    PsBLNm:{type:String},
    PsBGpUNm:{type:String},
    PsBGpId:{type:String},
    PsBGpNm:{type:String},
    PsBGpImg:{type:String},
    PsDt1:{type:String},
    PsDt2:{type:String},
    PsDt3:[{dt:{type:String},mt:{type:String},yr:{type:String}}],
    PsTm:{type:String},
    PsGn:{type:String},
    PsOcs:{type:String},
    PsWrTp1:{type:String},
    PsWrTp2:{type:String},
    PsWrTp3:{type:String},
    PsWrTp4:{type:String},
    PsWrCl1:{type:String},
    PsWrCl2:{type:String},
    PsWrClCd1:{type:String},
    PsWrClCd2:{type:String},
    PsImg:[{img0:{type:String}}],
    PsImgPt:[{img0:{type:String}}],
    PsImgSz:[{img0:{type:String}}],
    PsDst:{type:String},
    PsSt:{type:String},
    PsCnt:{type:String},
    PsKI1:{type:Number},
    PsKI2:{type:Number},
    PsKDt:{type:Number}
},{
    collection:'ImageUpload'
})
upload.index({PsSt:'text',PsOcs:'text',PsWrTp1:'text',PsWrTp3:'text',PsWrTp4:'text',PsWrCl1:'text',PsWrCl2:'text'})
const imageUpload = mongoose.model('Imageupload',upload);
module.exports = imageUpload;


