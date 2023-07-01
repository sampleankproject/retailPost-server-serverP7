
const express = require('express')
const memberRoutes = express.Router()
const nodemailer = require('nodemailer');

const Member = require('../../Models/email');
const registerFull = require('../../Models/reg_full');


// memberRoutes.route('/emailchk').post(function(req,res){
//     console.log('mailcheck')

//     var transport = nodemailer.createTransport({
//         host: 'mail.gmx.com',
//         port: 587,
//         tls: {
//             ciphers:'SSLv3',
//             rejectUnauthorized: false
//         },
//         debug:true,
//         auth: {
//             user:'simplymail1@gmx.com',
//             pass:'Yahoomail123!'
//         }
    
//     })

//     var mailoption= {
//         from:"simplymail1@gmx.com",
//         to:"simplymail1@gmx.com",
//         subject:"OTP for Mobile Application",
//         text:`Your OTP is  valid for 15 minutes.`
//     }
//     transport.sendMail(mailoption,function(error,info){
//         if(error){
            
//             console.log(error);
//             res.json(error);
//         }else{
//             console.log("success"+info.response);
//         }
//     })

//  })


memberRoutes.route('/getemail').post(function(req,res){
    console.log(req.body)
    registerFull.find({usrNm:req.body.username},(err,result)=>{
     //    console.log(result)
     if(err){
         res.json(err)
     }else{
         if(result.length !== 0){
             res.json(result[0].mailId)
            //  const user = result.map((data)=>data.email)
            //  console.log(user)
            //  res.json(user[0])
         }
         else{
             res.json('failure')
             console.log('fail')
         }
     
     }
     
    }) 
 })

 
 memberRoutes.route('/newPass').post(function(req,res){
    console.log(req.body)
    registerFull.updateOne({usrNm:req.body.username},  
        { 
            $set: {
                psw:req.body.password
                
        }},(err,result)=>{

            console.log(result.n)
            if(err){
                res.json(err)
            }else{
                res.json(result)
            }
        })
       
    })

memberRoutes.route('/add').post((req,res)=>{
    console.log(req.body)
var transport = nodemailer.createTransport({
    // host:'smtp.gmail.com',
    // port:587,
    // secure:false,
    service:'gmail',
    auth: {
        user:"ank66145@gmail.com",
        pass:"nv123456abc#"
    }

})

function math(){
    return Math.floor(Math.random()*(9999-1000))+1000;
}

let userotp=math()
const Userdata={
    email:req.body.email,
    userotp:userotp
}
// console.log(req.body.email)
// let userotp = math()
console.log(userotp)
console.log(Userdata)

var mailoption= {
    from:"ank66145@gmail.com",
    to:req.body.email,
    subject:"OTP for Mobile Application",
    text:`Your OTP is ${userotp} valid for 15 minutes.`
}

transport.sendMail(mailoption,function(error,info){
    if(error){
        
        console.log(error);
        res.json(error);
    }else{
            const user = new Member(Userdata)
            user.save()
            .then(()=>{
               //  console.log('otp is saved')
               res.json("otp saved")
            })
            .catch(()=>{
                console.log('unable to save database')
                res.json('unable to save database')
            })
        console.log("success"+info.response);
    }
})



})


memberRoutes.route('/verifyotp').post((req,res)=>{
    console.log('from email')
    console.log(req.body)
    Member.find({"email":req.body["email"]}).sort({_id:-1}).limit(1).exec((err,user)=>{
       console.log('user result otp')
        console.log(user)
        if(err){
            res.json("error")
        }
        else{
            if(user.length > 0){
            // let userresponse = user.map((user)=>{
            //     return user.userotp
            let userresponse = user[0].userotp;

            if(req.body.userotp){
                if(userresponse  === req.body.userotp){
                   
                   
                    // next()
                    Member.deleteMany({"email":req.body['email']},function(err,result){
                        if(err){
                            console.log('Delete OTP error')
                            console.log(err)
                            res.json('Delete OTP error')
                
                        }else{
                            res.json('successfully verified')
                            console.log('Delete OTP success')
                            console.log(result)
                        }
                    })
    
                }else{
                    res.json('enter otp')
                }
            }
            else{
                res.json("otp not verified")
            }
        }else{
            res.json('No OTP found')
            console.log('No OTP found')
        }
     
        }
        
    })
        
})




module.exports = memberRoutes;

