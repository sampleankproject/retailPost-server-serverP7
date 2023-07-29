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

// likes
const route3 = require('./Routes/Comment_likes/Like')
app.use('/',route3)

//login
const jwtroutes = require('./Routes/login/login')
app.use('/',jwtroutes)

//ImageUpload
app.use(express.static('images'))
app.use('/photos',express.static('images'))

const route4 = require('./Routes/ImageUpload/Imageupload')
app.use('/',route4)

//OTP_generator
const email = require('./Routes/opt_generator/email')
app.use('/',email)

//serevr_9_rt
app.use(express.static('imagesRt'))
app.use('/photosRt',express.static('imagesRt'))

const Route = require('./Routes/server_9_rt/RImgUpload')
app.use('/',Route)

const Route2 = require('./Routes/server_9_rt/GetRImgUpload')
app.use('/',Route2)

//serevr_9_2_rt
const route = require('./Routes/server_9_2_rt/dropDown')
app.use('/',route)

const route2 = require('./Routes/server_9_2_rt/RtGenRating');
app.use('/',route2)

//serevr_9_3_rt
app.use(express.static('imagesRt3'))
app.use('/photosRt3',express.static('imagesRt3'))

app.use(express.static('images2Rt3'))
app.use('/photos2Rt3',express.static('images2Rt3'))

const routeRt3 = require('./Routes/server_9_3_rt/RTRegAccount')
app.use('/',routeRt3)

const route2Rt3 = require('./Routes/server_9_3_rt/RtNameCheck');
app.use('/',route2Rt3)


//server_10_rt

app.use(express.static('OrgImages'))
app.use('/photo2Rt10',express.static('OrgImages'))


app.use(express.static('imagesRt10'))
app.use('/photos3',express.static('imagesRt10'))


app.use(express.static('PrImages'))
app.use('/photo4',express.static('PrImages'))

app.use(express.static('PrImagesTwo'))
app.use('/photo42',express.static('PrImagesTwo'))

app.use(express.static('PrImagesThree'))
app.use('/photo43',express.static('PrImagesThree'))

app.use(express.static('PrImagesFour'))
app.use('/photo44',express.static('PrImagesFour'))


const routeRt10 = require('./Routes/server_10_rt/SltReg')
app.use('/',routeRt10)



app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})