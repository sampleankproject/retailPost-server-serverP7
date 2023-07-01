const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = 7010
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI;  
mongoose.connect(uri)
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('mongoDB connection is established successfully 1')
})

const Routes1 = require('./Routes/reg_full')
app.use('/',Routes1)
const Routes2 = require('./Routes/Search')
app.use('/',Routes2)


app.use(express.static('userImages'))
app.use('/photos',express.static('userImages'))


//groups
app.use(express.static('GroupImages'))
app.use('/groupPhoto',express.static('GroupImages'))

const route1 = require('./Routes/groupsRoutes/groupCreate')
app.use('/',route1)



app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})