const mongoose = require('mongoose')
const Schema = mongoose.Schema
const upload = new Schema({
    UPsId:{type:String},
    PsBId:{type:String},  
    PsBGpId:{type:String},
    PsDt2:{type:String},
    PsDt3:[{dt:{type:String},mt:{type:String},yr:{type:String}}],
    PsTm:{type:String},
    createdAt: { type: Date, expires: '2d', default: Date.now },
},{
    collection:'ImageUploadSmall'
})

const imageUploadTwo = mongoose.model('Imageuploadsmall',upload);
module.exports = imageUploadTwo;


