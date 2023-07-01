const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Rtr = new Schema({
    grpId:{type:String},
    grpMemIdT:{type:String},
    grpMemIdF:{type:String}
},{
    collection:'RTRCollection'
})
const rtr = mongoose.model('RtrCollection',Rtr)
module.exports = rtr;