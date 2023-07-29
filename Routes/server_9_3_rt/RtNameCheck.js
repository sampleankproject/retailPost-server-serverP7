const express = require('express')
const RtNameCheck = express.Router()
const {nanoid} = require('nanoid')
const {customAlphabet} = require('nanoid/non-secure');
const nodemailer = require('nodemailer');

const RTregFull = require('../../Models/RTReg_full');
const RTAnReport = require('../../Models/RtAnReportTrnOth')


RtNameCheck.route('/RtUNameCheck').post((req,res)=>{
    RTregFull.find({RtUnm:req.body.sUName},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result1.length)
            if(result1.length === 0){
                res.json('Ok')
            }else{
                res.json('NotOk')
            }
           
        }
    })
})


RtNameCheck.route('/RtMailCheck').post((req,res)=>{
    RTregFull.find({RtMlId:req.body.Mail},(err,result2)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result2.length)
            if(result2.length === 0){
                res.json('Ok')
            }else{
                res.json('NotOk')
            }
           
        }
    })
})

RtNameCheck.route('/RtResetPassword').post(function(req,res){
    console.log(req.body.oldPass)
    RTregFull.find({RtId:req.body.RtId,RtPwd:req.body.Oldpsw},(err,result)=>{
            if(err){    
                res.json(err)
            }
            else{
                console.log(result.length)
                if(result.length !==0){
                    RTregFull.updateOne({RtId:req.body.RtId},
                        {
                            $set: {
                                RtPwd:req.body.Newpsw
                            }
                        },(err,result)=>{
                            console.log(result.n)

                            if(result.n!==0){
                                res.json('ok')
                            }else{
                                res.json(err)
                            }
                            
                        })

                }else{
                    res.json(' old password is not correct')
                }
                             
            }
   
    })
})



RtNameCheck.route('/RtGetemail').post(function(req,res){
    console.log(req.body)
    RTregFull.find({RtUnm:req.body.username},(err,result)=>{
     //    console.log(result)
     if(err){
         res.json(err)
     }else{
         if(result.length !== 0){
             res.json(result[0].RtMlId)
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

 
 RtNameCheck.route('/RtNewPass').post(function(req,res){
    console.log(req.body)
    RTregFull.updateOne({RtUnm:req.body.username},  
        { 
            $set: {
                RtPwd:req.body.password
                
        }},(err,result)=>{

            console.log(result.n)
            if(err){
                res.json(err)
            }else{
                res.json(result)
            }
        })
       
    })


    RtNameCheck.route('/RtAnReport').post((req,res)=>{
  
        const nan4 = customAlphabet('0123456789',15)
        var MyDate = new Date();
        const date = MyDate.getDate()+ '/'+(MyDate.getMonth()+1)+'/'+MyDate.getFullYear()
        const MyDateString = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2)  +('0' + MyDate.getDate()).slice(-2);
        const obj1={
            RtRepId:nan4(),
            RtId:req.body.RtId,
            RtMlId:req.body.RtMlId,
            RtPhn:req.body.RtPhn,
            Value1:req.body.Value1,
            Value2:req.body.Value2,
            Date1:MyDate,
            Date2:date,
            Date3:MyDateString,
            RtRepSts:'Open'
          }
      
        const data = RTAnReport(obj1)
        data.save()
        .then(response=>{
           
            

            var transport = nodemailer.createTransport({
                host:'smtp.gmail.com',
                port:587,
                secure:false,
                auth: {
                    user:"ank66145@gmail.com",
                    pass:"nv123456abc#"
                }
            
            })
            var mailoption= {
                from:"ank66145@gmail.com",
                to:req.body.RtMlId,
                subject:`Report has been received`,
                text:`Report has been received,  Reference no. "${nan4()}" for further communiaction`
            }
            transport.sendMail(mailoption,function(error,info){
                if(error){
                    
                    console.log(error);
                }else{

                    console.log("success"+info.response);
                    cosole.log('report submitted to'+req.body.RtMlId)
                }
            })
            res.json('Rt Report Successfull')
            console.log('Rt Report Successfull')



        })
        .catch(err=>{
            console.log(err)
            res.json(err)
        })

    })



module.exports = RtNameCheck;
