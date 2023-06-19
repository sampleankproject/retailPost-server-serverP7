const express = require('express')
const multer = require('multer')
const RegRoutes = express.Router();
const fs = require('fs');
const registerFull = require('../Models/reg_full')
// const registerSmall = require('../Models/reg_small')
const Imageupload = require('../Models/upload');
const GroupCreate = require('../Models/groupCreate');
const PhOtp = require('../Models/PhoneOTP');
const common1 =require('../Models/UsrCmmn')
const {nanoid} = require('nanoid')
const {customAlphabet} = require('nanoid/non-secure')

const nan1 = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',10)
console.log(nan1())

const storageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./userImages");
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+nan1()+file.originalname);
    },
});

const upload = multer({storage:storageEngine});

RegRoutes.route('/RegFull').post(upload.single('photo'),(req,res)=>{
    console.log('regiter full')
    console.log(req.body)
    console.log(req.files)
    console.log(req.file)
    var MyDate = new Date();
    const date = MyDate.getDate()+ '/'+(MyDate.getMonth()+1)+'/'+MyDate.getFullYear()
    const id = nanoid()
    const reg1 = {

        UsrId:id,
       
        mailId:req.body.email,
        psw:req.body.password,
        phno:req.body.phoneNo,
        phno2:req.body.phoneNo,
        usrNm:req.body.username,
        fNm:req.body.firstname,
        lNm:req.body.lastname,
        apNm:req.body.apNm,
        gnd:req.body.gender,
        rgTm:'Time',
        rgDt1:date,
        rgDt2:[{dt:MyDate.getDate()},{mt:(MyDate.getMonth()+1)},{yr:MyDate.getFullYear()}],
        UsrImg:req.file.filename,
        UsrImgPt:req.file.path,
        yob:req.body.BirthYear,
        dst:'district',
        st:'state',
        cntry:'country',
        dst2:'district',
        st2:'state',
        cntry2:'country',
        tkFcm:'',
        tkFcmDt:'',
        VlRef:'CmRef',
        
    }
    // const reg2 = {
    //     UsrId:id,
    //     mailId:req.body.email,
    //     phno:req.body.phoneNo,
    //     phno2:req.body.phoneNo,
    //     usrNm:req.body.username,
    // }


    registerFull.find({ $or:[ { usrNm:req.body.username},{mailId:req.body.email}]},(err,result)=>{
        console.log(result)
        if(err){
            res.json(err)
        }else{
            console.log('RegFull')
            console.log(result.length)
            if(result.length>0){
                if(result[0].usrNm===req.body.username){
                    res.json('username exists in DB RegFull')  
                    console.log('username exists in DB RegFull')    
               }
               else{
                   if(result[0].mailId===req.body.email){
                      
                        res.json('email exists in DB RegFull')
                        console.log('email exists in DB RegFull')
                    }
                                  
               }
            }else if (result.length === 0){
                        
                    registerFull.updateMany({phno2:req.body.phoneNo},{$set:{phno2:''}},(err,result21)=>{
                        if(err){
                            console.log(err)
                        }else{
                            // console.log(result21)
                            const regfull = new registerFull(reg1)
                            regfull.save()
                            .then(res1=>{
                                console.log(res1)
                                res.json('regAdded')
                                        // const regsmall = new registerSmall(reg2)
                                        // regsmall.save()
                                        // .then(res2=>{
                                        
                                        // })
                                        // .catch(err2=>{
                                        //     console.log(err2)
                                        //     res.json(err2)
                                        // })
                            //     res.json('Data added successfull 1')   
                            })
                            .catch(err=>{
                                console.log(err)
                                res.json(err)
                            })
                        }   
                    }) 





            }else(
                res.json('error registration RegFull')
            )
        }
    })
     
})

RegRoutes.route('/verifyUser').post((req,res)=>{
    registerFull.find({ $or:[ { usrNm:req.body.username},{mailId:req.body.email}]},(err,result)=>{
        console.log(result)
        if(err){
            res.json(err)
        }else{
            console.log('verify users')
            console.log(result.length)
            if(result.length>0){
                if(result[0].usrNm===req.body.username){
                    res.json('username exists in DB')  
                    console.log('true')    
               }
               else{
                   if(result[0].mailId===req.body.email){
                      
                        res.json('email exists in DB')
                        console.log('email exists in DB')
                    }
                                  
               }
            }else if (result.length === 0){
                res.json('email and username not exists in DB')
            }else(
                res.json('error reistration full')
            )
        }
    })
})

RegRoutes.route('/GetMyAccount').post((req,res)=>{
    console.log('getMy account')
    console.log(req.body)
    registerFull.find({UsrId:req.body.UsrId},(err,result)=>{
        if(err){
            console.log(err)
        }else {
            // console.log(result)
            if(result.length > 0 ){
                // console.log(result)
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
            }
            else{
                res.json('not found')
            }
        }
    })
})


    RegRoutes.route('/UserImg').post(upload.array('photo'),(req,res)=>{
        function UpdateImage(){
             registerFull.updateOne({UsrId:req.body.UserId,UsrNm:req.body.username},
         
                    {$set:{
                        UsrImg:req.files[0].filename,
                        UsrImgPt:req.files[0].path
                    }},
                    
                    (err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                    res.json('uploaded')      
                    }
                })
        }
        console.log(req.body)
        registerFull.findOne({UsrId:req.body.UserId,UsrNm:req.body.username},(err,result3)=>{
            if(err){
                console.log(err)
            }else{
                console.log(result3.UsrImg)
                if(result3.UsrImg){
                    console.log('UserImage Exists')
                    fs.unlink('./userImages/'+result3.UsrImg,(err)=>{
                        if(err){
                            console.log(err)
                        }else{
                            console.log('old image Deleted')
                        }
                    }),
                    UpdateImage()
                }else{
                    console.log('No userImage')
                    UpdateImage()
                }
                // res.json(result3.UsrImg)
            }
        })
        // console.log(req.files)
        // console.log(req.files[0].filename)
        // console.log(req.files[0].path)
    })


    RegRoutes.route('/resetPassword').post(function(req,res){
        console.log(req.body.oldPass)
        registerFull.find({UsrId:req.body.UsrId,psw:req.body.Oldpsw},(err,result)=>{
                if(err){    
                    res.json(err)
                }
                else{
                    console.log(result.length)
                    if(result.length !==0){
                        registerFull.updateOne({UsrId:req.body.UsrId},
                            {
                                $set: {
                                    psw:req.body.Newpsw
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

    // RegRoutes.route('/PageOneUsrGrpDp').post((req,res)=>{
    //     Imageupload.aggregate([{$match:{UPsId:req.body.UPsId}},
    //         {
    //             // $lookup:{
    //             //     from:'GroupCreate',
    //             //     localField:'PsBGpId',
    //             //     foreignField:'grpId',
    //             //     as:'CombinedGrp'
    //             // },
    //             $lookup:{
    //                 from:'RegistrationFull',
    //                 localField:'PsBId',
    //                 foreignField:'UsrId',
    //                 as:'CombinedUsr'
    //             }},{
    //             $project:{
    //                 // Group:'$CombinedGrp',
    //                 User:'$CombinedUsr',
    //             }
    //         }
    //     ]).exec(function(err,result){
    //         if(err){
    //             console.log(err)
    //         }else{
    //             res.json(result)
    //         }
    //     })
    // })
  
    RegRoutes.route('/PageOneUsrDp').post((req,res)=>{
        console.log(req.body)
        const date = new Date()
        console.log(date.getHours()+':'+date.getMinutes())
        Imageupload.find({UPsId:req.body.UPsId},(err,result)=>{
            if(err){
                console.log(err)
            }else{

                registerFull.find({UsrId:result[0].PsBId},(err,result2)=>{
                    if(err){
                        console.log(err)
                    }else{
                        const a = result2[0].UsrImg;
                        GroupCreate.find({grpId:result[0].PsBGpId},(err,result3)=>{
                            if(err){
                                console.log(err)
                            }else{
                                const b=result3[0].grpImg;
                                const combine = {
                                    UsrImg:a,
                                    GrpImg:b
                                }
                                res.json(combine)
                            }
                        })
                        
                    }
                })
                // res.json(result)
            }
        })
    })

    RegRoutes.route('/EditPref').post((req,res)=>{
        console.log('editPref')
        console.log(req.body)
        if(req.body.stateA.length === 0){
            console.log('stateA null')
                        registerFull.updateOne({UsrId:req.body.UsrId},{
               
                            $set:{
                                st2:req.body.stateB 
                            }
                        },(err,result1)=>{
                            if(err){
                                console.log(err)
                            }else{
                                if(result1.modifiedCount === 1){                                   
                                    res.json('updated')
                                }else{
                                    res.json('not updated')
                                }
                                console.log(result1)
                              
                            }
                        })
                        
                        
                    }
                    else if(req.body.stateB.length === 0){
                        console.log('stateB null')
                        registerFull.updateOne({UsrId:req.body.UsrId},{
               
                            $set:{
                                st:req.body.stateA
                            }
                        },(err,result2)=>{
                            if(err){
                                console.log(err)
                            }else{
                                if(result2.modifiedCount === 1){                                   
                                    res.json('updated')
                                }else{
                                    res.json('not updated')
                                }
                                console.log(result2)
                                
                               
                            }
                            })
                        
                    }
                    
                    else{
                        console.log('not valid')
                        }
                    
    })

RegRoutes.route('/ResetPhone1').post((req,res)=>{
        console.log(req.body)
        registerFull.find({UsrId:req.body.UsrId},(err,result17)=>{
            if(err){
                res.json(err)
                console.log(err)
            }else{
                console.log(result17)
                if(result17.length === 1){
                    // const nan2 = customAlphabet('0123456789',4)
                    // const nan3 = nan2()
                    function math(){
                        return Math.floor(Math.random()*(9999-1000))+1000;
                    }
    
                    const nan3 = math()
                       
                    const obj = {
                        UsrId:req.body.UsrId,
                        PhNo:req.body.Phone,
                        PhOtp:nan3
                    
                    }
                const OTPSaved = PhOtp(obj)
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
                }else{
                    console.log('Not found')
                    res.json('Not found')
                }
            }
        })
    })

    
RegRoutes.route('/ResetPhone2').post((req,res)=>{   
    console.log(req.body)
    PhOtp.find({UsrId:req.body.UsrId,PhNo:req.body.PhNo,PhOtp:req.body.PhOtp},(err,result18)=>{
        if(err){
            res.json(err)
            console.log(err)
        }else{
            console.log('reset phone 2')
            console.log(result18)
            if(result18.length == 1){
                if(result18[0].PhOtp == req.body.PhOtp){
                    PhOtp.findOneAndDelete({UsrId:req.body.UsrId,PhNo:req.body.PhNo,PhOtp:req.body.PhOtp},(err,result19)=>{
                    if(err){
                        res.json(err)
                        console.log(err)
                    }else{
                        console.log('result19')
                        console.log(result19)
                        if(result19 != null){
                            registerFull.updateMany({phno2:req.body.PhNo},{$set:{phno2:''}},(err,result21)=>{
                                if(err){
                                    res.json(err)
                                    console.log(err)
                                }else{
                                    console.log('result21')
                                    console.log(result21)
                                    if(result21 != null){                                       
                                       registerFull.findOneAndUpdate({UsrId:req.body.UsrId},
                                            {
                                                $set:{
                                                    phno2:req.body.PhNo
                                                }
                                        },(err,result20)=>{
                                            if(err){
                                                res.json(err)
                                                console.log(err)
                                            }else{
                                                console.log('result20')
                                                console.log(result20)
                                                if(result20 != null){
                                                    res.json('success')
                                                }else{
                                                    console.log('Not success1')
                                                    res.json('Not success')
                                                }                                  
                                                
                                            }
                                            
                                        })
                                    }else{
                                        console.log('Not success1')
                                        res.json('Not success')
                                    }                                  
                                    
                                }

                            })
                           
                            
                        }else{
                            console.log('Not success2')
                            res.json('Not success')
                        }
                                               
                    }
                })              
            }else{
                console.log('Not success3')
                res.json('Not success')
            }
            }else{
                console.log('Not success4')
                res.json('Not success')
            }
        }
    })
})



module.exports = RegRoutes;