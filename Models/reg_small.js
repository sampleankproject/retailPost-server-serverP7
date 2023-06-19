const mongoose = require('mongoose')
const Schema = mongoose.Schema

const register = new Schema({
    UsrId:{type:String},
    mailId:{type:String},
    phno:{type:String},
    phno2:{type:String},
    usrNm:{type:String},
   
},{
    collection:'RegistrationSmall'
})

const reg = mongoose.model('registerSmall',register)
module.exports = reg;