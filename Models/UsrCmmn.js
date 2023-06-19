const mongoose = require('mongoose')
const usrSchema = mongoose.Schema

const common = new usrSchema({

    VlRef:{type:String},
    VlKA:{type:Number},
    VlKB:{type:Number},
    VlKC:{type:Number},
    VlKD:{type:Number},
    VlKDy:{type:Number},
    VlWPy1:{type:String},
    VlWPy2:{type:Number},
    VlWUs1:{type:String},
    VlWUs2:{type:String},
    VlWUs3:{type:String},
    VlWUs4:{type:String},
    VlWRt1:{type:String},
    VlWRt2:{type:String},
    VlWRt3:{type:String},
    VlWRt4:{type:String},
    VlWSp1:{type:String},
    VlWSp2:{type:String},
    VlWSp3:{type:String},
    VlWSp4:{type:String}


},{
    collection:'Common'
})

const commonData = mongoose.model('common1',common)
module.exports = commonData;