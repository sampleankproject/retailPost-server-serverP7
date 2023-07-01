const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const jwtRouters=express.Router()
const cors = require('cors');

const login = require('../../Models/reg_full');
const UsrPhNoOTP = require('../../Models/UserPhoneOTP')
const common1 = require('../../Models/UsrCmmn')


//generating token 

jwtRouters.route('/generateToken').post((req,res)=>{
    console.log(req.body)
    login.find({"usrNm":req.body["username"], "psw":req.body["password"]},(err,user)=>{
        
        if(err){
            res.json(err)
            console.log(err)
         } else{
             console.log(req.body)
             let userdata = user.filter((use)=>{
                 return use.usrNm == req.body.username && use.psw == req.body.password; 
             })
             
             if(userdata.length){
                 let token_payload = {id:userdata[0].UsrId};
                 let token = jwt.sign(token_payload,"!@1709nm");
                 let response = { 'accessToken' : token,user:'ja'}
         
                 return res.status(200).json(response);
             } else {
                 return res.status(400).json('Authentication failed...');
             }
         
         }
     });
    })

    
//validation token

jwtRouters.route('/validateTokenTwo').post((req,res)=>{
    console.log(req.body)
    let key = "!@1709nm"
    var token = req.body['TokenId'];
// console.log(token)
    try{
        if(token){
            let verify = jwt.verify(token,key)
            // console.log(verify)
            
            if(verify){
                let decoded = jwt.decode(token,{complete:true});
                console.log(decoded.payload.id)
                // res.send({"id":decoded.payload.id});
                login.find({UsrId:decoded.payload.id},(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(result)
                        if(result.length > 0){
                            console.log(result[0])
                            // res.json(result[0])
                            const obj = {
                    
                                UsrId:result[0].UsrId,
                                mailId:result[0].mailId,
                               
                                phno2:result[0].phno2,
                                usrNm:result[0].usrNm, 
                                fNm:result[0].fNm,
                                lNm:result[0].lNm,
                                apNm:result[0].apNm, 
                                gnd:result[0].gnd,
                                rgTm:result[0].rgTm,
                                rgDt1:result[0].rgDt1,
                                rgDt2:result[0].rgDt2 ,
                                UsrImg:result[0].UsrImg ,
                                UsrImgPt:result[0].UsrImgPt ,
                                yob:result[0].yob ,
                                dst:result[0].dst ,
                                st:result[0].st ,
                                cntry:result[0].cntry ,
                                dst2:result[0].dst2 ,
                                st2:result[0].st2 ,
                                cntry2:result[0].cntry2 ,
                               
                            }
                            res.json(obj)
                        }else{
                            
                            console.log('no JWT result found')
                        }
                    }
                })
            }
        }
    }
    catch(error){
        res.status(401).send(error)
    }

})
///////////////////////////////////////////////////////

jwtRouters.route('/validateTokenThree').post((req,res)=>{

    console.log(req.body)
    let key = "!@1709nm"
    var token = req.body['TokenId'];
// console.log(token)
    try{
        if(token){
            let verify = jwt.verify(token,key)
            // console.log(verify)
            
            if(verify){
                let decoded = jwt.decode(token,{complete:true});
                console.log(decoded.payload.id)
                // res.send({"id":decoded.payload.id});
                login.find({UsrId:decoded.payload.id},(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(result)
                        if(result.length > 0){
                            // console.log(result[0])
                            // res.json(result[0])
                            // const obj = {
                    
                            //     UsrId:result[0].UsrId,
                            //     mailId:result[0].mailId,
                               
                            //     phno2:result[0].phno2,
                            //     usrNm:result[0].usrNm, 
                            //     fNm:result[0].fNm,
                            //     lNm:result[0].lNm,
                            //     apNm:result[0].apNm, 
                            //     gnd:result[0].gnd,
                            //     rgTm:result[0].rgTm,
                            //     rgDt1:result[0].rgDt1,
                            //     rgDt2:result[0].rgDt2 ,
                            //     UsrImg:result[0].UsrImg ,
                            //     UsrImgPt:result[0].UsrImgPt ,
                            //     yob:result[0].yob ,
                            //     dst:result[0].dst ,
                            //     st:result[0].st ,
                            //     cntry:result[0].cntry ,
                            //     dst2:result[0].dst2 ,
                            //     st2:result[0].st2 ,
                            //     cntry2:result[0].cntry2 ,
                               
                            // }
                            common1.find({VlRef:'CmRef'},(err,result2)=>{
                                if(err){
                                    console.log(err)
                        
                                }else{
                                   
                                    const obj2 = {

                                        UsrId:result[0].UsrId,
                                        mailId:result[0].mailId,
                                        phno2:result[0].phno2,
                                        usrNm:result[0].usrNm, 
                                        fNm:result[0].fNm,
                                        lNm:result[0].lNm,
                                        apNm:result[0].apNm, 
                                        gnd:result[0].gnd,
                                        rgTm:result[0].rgTm,
                                        rgDt1:result[0].rgDt1,
                                        rgDt2:result[0].rgDt2 ,
                                        UsrImg:result[0].UsrImg ,
                                        UsrImgPt:result[0].UsrImgPt ,
                                        yob:result[0].yob ,
                                        dst:result[0].dst ,
                                        st:result[0].st ,
                                        cntry:result[0].cntry ,
                                        dst2:result[0].dst2 ,
                                        st2:result[0].st2 ,
                                        cntry2:result[0].cntry2,
                                        tkFcm:result[0].tkFcm,
                                        tkFcmDt:result[0].tkFcmDt,
                                      
                                        VlRef:result2[0].VlRef,
                                        VlKA:result2[0].VlKA,
                                        VlKB:result2[0].VlKB,
                                        VlKC:result2[0].VlKC,
                                        VlKD:result2[0].VlKD,
                                        VlKDy:result2[0].VlKDy,
                                        VlWPy1:result2[0].VlWPy1,
                                        VlWPy2:result2[0].VlWPy2,
                                        VlWUs1:result2[0].VlWUs1,
                                        VlWUs2:result2[0].VlWUs2,
                                        VlWUs3:result2[0].VlWUs3,
                                        VlWUs4:result2[0].VlWUs4,
                                        VlWRt1:result2[0].VlWRt1,
                                        VlWRt2:result2[0].VlWRt2,
                                        VlWRt3:result2[0].VlWRt3,
                                        VlWRt4:result2[0].VlWRt4,
                                        VlWSp1:result2[0].VlWSp1,
                                        VlWSp2:result2[0].VlWSp2,
                                        VlWSp3:result2[0].VlWSp3,
                                        VlWSp4:result2[0].VlWSp4,
                                        

                                    }
                                    res.json(obj2)
                                    // console.log(obj2)
                                }
                            })

                            // res.json(obj)
                        }else{
                            
                            console.log('no JWT result found')
                        }
                    }
                })
            }
        }
    }
    catch(error){
        res.status(401).send(error)
    }

})
///////////////////////////////////////////////////////////

jwtRouters.route('/UsrPhone1').post((req,res)=>{
    console.log(req.body)           
                function math(){
                    return Math.floor(Math.random()*(9999-1000))+1000;
                }
                const nan3 = math()                  
                const obj = {                  
                    UsrPhNo:req.body.UsrPhNo,
                    UsrPhOtp:nan3               
                }
            const OTPSaved = UsrPhNoOTP(obj)
                OTPSaved.save()
                .then(response=>{
                    console.log(response)
                    console.log('Phone OTP')
                    console.log(nan3)
                    res.json("OTP sent")
                })
                .catch(err=>{
                    console.log(err)
                    res.json(err)
                })
})


jwtRouters.route('/UsrPhone2').post((req,res)=>{   
    UsrPhNoOTP.find({UsrPhNo:req.body.UsrPhNo,UsrPhOtp:req.body.UsrPhOtp},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length === 1){
                
                UsrPhNoOTP.findOneAndDelete({UsrPhNo:req.body.UsrPhNo,UsrPhOtp:req.body.UsrPhOtp},(err,result1)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.json('Found')
                    }
                })
            }else{
                console.log('Not found')
                res.json('Not found')
            }
            
        }
    })
   
})
////////////////////////////////

jwtRouters.route('/AddCmn').post((req,res)=>{

    const data1 = common1(req.body)
    data1.save()
    .then(response=>{
        console.log(response)
        res.json('AddCmn Added')
    })
    .catch(err=>{
        console.log(err)
    })

})
////////////////////////////////

jwtRouters.route('/getCmn').post((req,res)=>{
    common1.find({VlRef:req.body.VlRef},(err,result)=>{
        if(err){
            console.log(err)

        }else{
            res.json(result)
            console.log(result)
        }
    })

})


module.exports = jwtRouters;






