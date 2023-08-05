const express = require('express')
const {nanoid} = require('nanoid')
const {customAlphabet} = require('nanoid/non-secure');
var admin = require('firebase-admin');
// const { initializeApp } = require('firebase-admin/app');
// var serviceAccount = require("../pushnoti2-1135d-firebase-adminsdk-9vdzq-290236c8e7.json");
var serviceAccount = require("../../project8-3-918ed-firebase-adminsdk-i4ymq-1b2ca0d7a7.json");
const memberRoute = express.Router()

const RTfollow = require('../../Models/RtFollow');
const RTlike = require('../../Models/RtLike');
const RTsave = require('../../Models/RtSave');
const RTreport = require('../../Models/RtReport');
const Rupload = require('../../Models/RImgUpload');
const RtAdmUserReprt = require('../../Models/AdmUserReport');
const RTregFull = require('../../Models/RTReg_full');
const RtPhOtp = require('../../Models/RtPhoneOTP');


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });


memberRoute.route('/AddFollow').post(function(req,res){
    console.log(req.body)
    const follow1 =  RTfollow(req.body)
    follow1.save()
    .then(response=>{
        console.log(response)
        res.json('FollowAdded')
    })
    .catch(error=>{
        let ErrorMsg;
        if(error.code === 11000){
            ErrorMsg = Object.keys(error.keyValue)[0]+"already exits.";
            console.log('Already Following')
            // res.json('Already Following')
        }else{
            ErrorMsg = error.message;
            console.log(ErrorMsg)
        }
    })
})


memberRoute.route('/FollowStatus').post(function(req,res){ 
    console.log('Following Status')
    console.log(req.body)
    RTfollow.findOne({RtId:req.body.RtId,UsrId:req.body.UsrId},(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        if(result === null){
                            console.log('not found')
                            res.json('notfound')
                        }else{
                            // console.log(result)
                            console.log('Following')
                            res.json('Following')
                        }
                        
                    }
                })
   
})

memberRoute.route('/UnFollow').post(function(req,res){ 
    console.log(req.body)
    RTfollow.findOneAndDelete({RtId:req.body.RtId,UsrId:req.body.UsrId},(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        if(result === null){
                            console.log('not Deleted')
                        }else{
                            console.log(result)
                            res.json('UnFollow successfully')
                        }
                        
                    }
                })
   
})

memberRoute.route('/Like').post(function(req,res){
    const like1 =  RTlike(req.body)
    like1.save()
    .then(response=>{
        console.log('data added')
        res.json('data added')
    })
    .catch(error=>{
        let ErrorMsg;
        if(error.code === 11000){
            ErrorMsg = Object.keys(error.keyValue)[0]+"already exits.";
            console.log('already liked')
            res.json('Already Liked')
        }else{
            ErrorMsg = error.message;
            console.log(ErrorMsg)
        }
    })
})

memberRoute.route('/likeCount').post((req,res)=>{
 
    console.log('like Count')
    console.log(req.body)
    RTlike.count({RPsId:req.body.RPsId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log('like count 2')
            console.log(result)
            res.json(result)
        }
    })
})
memberRoute.route('/RtAddSave').post((req,res)=>{
    const data = RTsave(req.body)
    data.save()
    .then(response=>{
        console.log(response)
        res.json('data added')
    })
    .catch(error=>{
        let ErrorMsg;
        if(error.code === 11000){
            ErrorMsg = Object.keys(error.keyValue)[0]+"already exits.";
            res.json('Already saved')
        }else{
            ErrorMsg = error.message;
            console.log(ErrorMsg)
        }
    })

})
memberRoute.route('/RtAddReport').post((req,res)=>{
    const data = RTreport(req.body)
    data.save()
    .then(response=>{
        console.log(response)
        res.json('Report Data is stored')
    })
    .catch(err=>{
        console.log(err)
    })

})


memberRoute.route('/report').post((req,res)=>{
    Rupload.find({RPsId:req.body.RPsId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                if(result[0].RPsVrAd === 'notVerified'){
                    if(result[0].RPsSt2 === 'NtBlk'){
                        RTreport.count({RPsId:req.body.RPsId},(err,result3)=>{
                            if(err){
                                console.log(err)
                            }else{
                                if(result3 < 2){
                                    const reportData = new RTreport(req.body)
                                    reportData.save()
                                    .then(res2=>{
                                        console.log(res2)
                                        res.json('reportSaved')
                                    })
                                    .catch(error=>{
                                        let ErrorMsg;
                                        if(error.code === 11000){
                                            ErrorMsg = Object.keys(error.keyValue)[0]+"already exits.";
                                            console.log('AlreadyReported')
                                            res.json('AlreadyReported')
                                        }else{
                                            ErrorMsg = error.message;
                                            console.log(ErrorMsg)
                                        }
                                    })
    
                                }else{
                                    Rupload.updateOne({RPsId:req.body.RPsId},
                                    {
                                        $set:{
                                            RPsSt2:'Blk'
                                            
                                        }
                                    },(err,result4)=>{
                                        if(err){
                                            console.log(err)
                                        }else{
                                            // res.json(result4)
                                            var MyDate = new Date();
                                            const date = MyDate.getDate()+ '/'+(MyDate.getMonth()+1)+'/'+MyDate.getFullYear()
                                            const MyDateString = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2)  +('0' + MyDate.getDate()).slice(-2);
                                            
                                            function formatAMPM() {
                                                var hours = MyDate.getHours();
                                                var minutes = MyDate.getMinutes();
                                                // var seconds = MyDate2.getSeconds();
                                                var ampm = hours >= 12 ? 'PM' : 'AM';
                                                hours = hours % 12;
                                                hours = hours ? hours : 12; // the hour '0' should be '12'
                                                minutes = minutes < 10 ? '0'+minutes : minutes;
                                                // seconds = seconds < 10 ? '0'+seconds : seconds; 
                                                // var strTime = hours + ':' + minutes +  ':' + seconds + ' ' + ampm;
                                                var strTime = hours + ':' + minutes + ' ' + ampm;
                                                return strTime;
                                            }
    
                                            const data = {
                                                RPsId:req.body.RPsId,
                                                date1:date,
                                                date2:MyDateString,
                                                date3:[{dt:MyDate.getDate()},{mt:(MyDate.getMonth()+1)},{yr:MyDate.getFullYear()}],
                                                time:formatAMPM(),
                                            }
                                            const AdmReport2 = RtAdmUserReprt(data)
                                                AdmReport2.save()
                                                .then(response=>{
                                                    res.json('AdmReportSaved')
                                                    console.log('AdmReportSaved')
                                                })
                                                .catch(err=>{
                                                    console.log(err)
                                                })
                                        }
                                    })
                                }
                            }
                        })
                    }else{
                        console.log('Blocked')
                        res.json('Blocked')
                    }     
                }else{
                    console.log('AdmVerified')
                    res.json('AdmVerified')
                }
            }else{
                console.log('notFound')
                res.json('notFound')
            }
        }
    })
})



memberRoute.route('/RtGetsave').post(function(req,res){
    console.log(req.body)
    RTsave.aggregate([{$match:{UsrId:req.body.UsrId}},
        {$sort:{_id:-1}},{$skip:(req.body.sk*5)},{$limit:5},
        {
            $lookup:{
                from:'RtImageUpload',
                localField:'RPsId',
                foreignField:'RPsId',
                as:'CombinedSave'
            }
        },
        {
            $project:{
                data:'$CombinedSave'
            }
            // $project:{
            //     data:{
            //         $filter:{ 
            //         input:'$CombinedSave',
            //         as:'data1',
            //         cond:{$and:[
            //         {$eq:['$$data1.PsGn','Male']},
            //         {$eq:['$$data1.PsOcs','Office']}
            //         ]}
            //         }
            //     }
            // }`
            
        }
    
    ]).exec(function(err,result){
        if(err){
            console.log(err)
        }else{
            res.json(result)
            console.log(result.length)
        }
    })
})

memberRoute.route('/RtRemoveSave').post((req,res)=>{
    console.log(req.body)
    RTsave.findOneAndDelete({_id:req.body.itemTwo},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result === null){
                res.json('not Found to Delete')
            }else{
                console.log(result)
                res.json('deleted')
            }  
        }
    })
})

memberRoute.route('/RtgetFollow').post((req,res)=>{
    RTfollow.aggregate([{$match:{UsrId:req.body.UsrId}},{$sort:{_id:-1}},
            {
                $lookup:{
                    from:'RtRegFull',
                    localField:'RtId',
                    foreignField:'RtId',
                    as:'CombinedRtFollow'
                }
            },
            {
                $project:{ 
                    userFlwGroups:{
                        _id:'$CombinedRtFollow._id',
                        RtShNm:'$CombinedRtFollow.RtShNm',
                        RtUnm:'$CombinedRtFollow.RtUnm',
                        RtLgImg:'$CombinedRtFollow.RtLgImg2',
                        RtId:'$CombinedRtFollow.RtId'
                       
                    }                 
                }
            }
    
    ]).exec(function(err,result){
        if(err){
            console.log(err)
        }else{
            res.json(result)
            console.log(result)
        }
    })
})

memberRoute.route('/RtUnFollow').post(function(req,res){ 
    console.log(req.body)
    RTfollow.findOneAndDelete({RtId:req.body.RtId,UsrId:req.body.UsrId},(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        if(result === null){
                            console.log('not Deleted')
                        }else{
                            console.log(result)
                            res.json('UnFollow successfully')
                        }
                        
                    }
                })
   
})

memberRoute.route('/RtMyPostsAll').post((req,res)=>{
    console.log(req.body)
    Rupload.aggregate([{$match:{RtId:req.body.RtId}},{$sort:{_id:-1}},{$skip:5*req.body.skp},{$limit:5}
    ]).exec(function(err,result){
        if(err){
            console.log(err)
            res.json(err)
        }else{
            res.json(result)
            console.log(result.length)
        }
    })
})


memberRoute.route('/RtMyPostsAct').post((req,res)=>{
    console.log(req.body)
    const MyDate = new Date()
    const MyDateString = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2)  +('0' + MyDate.getDate()).slice(-2);
    Rupload.aggregate([{$match:{RtId:req.body.RtId,RPsDt4:{$gte:parseInt(MyDateString)},RPsSt1:"Live"}},{$sort:{_id:-1}},{$skip:5*req.body.skp},{$limit:5}
    ]).exec(function(err,result){
        if(err){
            console.log(err)
            res.json(err)

        }else{
            res.json(result)
            console.log(result.length)
        }
    })
})


memberRoute.route('/RtMyPostsAct2').post((req,res)=>{
    console.log(req.body)
    const MyDate = new Date()
    const MyDateString = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2)  +('0' + MyDate.getDate()).slice(-2);
    Rupload.aggregate([{$match:{RtId:req.body.RtId,RPsDt4:{$gte:parseInt(MyDateString)},RPsSt1:"SLive"}},{$sort:{_id:-1}},{$skip:5*req.body.skp},{$limit:5}
    ]).exec(function(err,result){
        if(err){
            console.log(err)
            res.json(err)
        }else{
            res.json(result)
            console.log(result.length)
        }
    })
})

memberRoute.route('/RtMyPostsActEdit1').post((req,res)=>{
    console.log(req.body)
    Rupload.updateOne({RPsId:req.body.RPsId},{$set:{RPsSt1:req.body.RPsSt1}})
    .then(response=>{
        // console.log(response)
        res.json(response)
    })
    .catch(err=>{
        console.log(err)
    })
})
memberRoute.route('/RtMyPostsActEdit2').post((req,res)=>{
    console.log(req.body)
    Rupload.updateOne({RPsId:req.body.RPsId},{$set:{PrSz:req.body.PrSz}})
    .then(response=>{
        // console.log(response)
        res.json(response)
    })
    .catch(err=>{
        console.log(err)
    })
})


memberRoute.route('/RtResetPhone1').post((req,res)=>{
    console.log(req.body)
    RTregFull.find({RtId:req.body.RtId},(err,result17)=>{
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
                    RtId:req.body.RtId,
                    RtPhNo:req.body.RtPhone,
                    RtPhOtp:nan3
                
                }
            const OTPSaved = RtPhOtp(obj)
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

memberRoute.route('/RtResetPhone2').post((req,res)=>{   
    console.log(req.body)
    RtPhOtp.find({RtId:req.body.RtId,RtPhNo:req.body.RtPhNo,RtPhOtp:req.body.RtPhOtp},(err,result18)=>{
        if(err){
            res.json(err)
            console.log(err)
        }else{
            console.log('reset phone 2')
            console.log(result18)
            if(result18.length == 1){
                if(result18[0].RtPhOtp == req.body.RtPhOtp){
                RtPhOtp.findOneAndDelete({RtId:req.body.RtId,RtPhNo:req.body.RtPhNo,RtPhOtp:req.body.RtPhOtp},(err,result19)=>{
                    if(err){
                        res.json(err)
                        console.log(err)
                    }else{
                        console.log('result19')
                        console.log(result19)
                        if(result19 != null){
                            if(req.body.Typ === 1){ 
                            RTregFull.findOneAndUpdate({RtId:req.body.RtId},
                                { 
                                
                                    $set:{
                                        RtPhn:req.body.RtPhNo
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
                        }else if(req.body.Typ === 2){
                            RTregFull.findOneAndUpdate({RtId:req.body.RtId},
                                { 
                                
                                    $set:{
                                        RtCsPhn:req.body.RtPhNo
                                    }
                            },(err,result30)=>{
                                if(err){
                                    res.json(err)
                                    console.log(err)
                                }else{
                                    console.log('result20')
                                    console.log(result30)
                                    if(result30 != null){
                                        res.json('success')
                                    }else{
                                        console.log('Not success1')
                                        res.json('Not success')
                                    }                                  
                                    
                                }
                                
                            })

                        }
                            
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

memberRoute.route('/RTStpLv').post((req,res)=>{
    console.log('RTStpLv')
    Rupload.find({RPsId:req.body.RPsId},(err,result5)=>{
        if(err){
            console.log(err)
        }else{
            if(result5.length > 0){
                if(result5[0].RPsSt1 === 'Live'){
                    Rupload.findOneAndUpdate({RPsId:req.body.RPsId},
                        {       
                            $set:
                            {
                                RPsSt1:'SLive'
                            }
                        },
                        (err,result10)=>{
                        if(err){
                            console.log(err)
                        }else{
                           
                            res.json('SLive')
                        }
                    })
                }else if(result5[0].RPsSt1 === 'SLive'){
                    Rupload.findOneAndUpdate({RPsId:req.body.RPsId},
                        {       
                            $set:
                            {
                                RPsSt1:'Live'
                            }
                        },
                        (err,result10)=>{
                        if(err){
                            console.log(err)
                        }else{                       
                            res.json('Live')
                        }
                    })
                }else{
                    console.log('Not Found')
                    res.json('Not Found')
                }

            }else{
                console.log('Not Found')
                res.json('Not Found')
            }
           
        }
    })
   
})

memberRoute.route('/UpdateSize').post((req,res)=>{
    console.log(req.body)
    Rupload.find({RPsId:req.body.RPsId},(err,result20)=>{
        if(err){
            console.log(err)
        }else{
            if(result20.length > 0){
                Rupload.findOneAndUpdate({RPsId:req.body.RPsId},
                    {       
                        $set:
                        {
                            PrSz:req.body.sizes
                        }
                    },
                    (err,result10)=>{
                    if(err){
                        console.log(err)
                    }else{
                       
                        res.json('Updated')
                    }
                })
            }else{
                console.log('Not Found')
                res.json('Not Found')
            }
        }
    })
})




// memberRoute.route('/SetRtUpdate').post((req,res)=>{
//     Rupload.updateMany({},
//         {       
//             $set:
//             {
//                 RPsDt4:20220630
//             }
//         },
//         (err,result10)=>{
//         if(err){
//             console.log(err)
//         }else{
           
//             res.json('Updated')
//         }
//     })

// })

/*uSED TO SHECK TKN
memberRoute.route('/SendNote').post((req,res)=>{
    console.log(req.body)
    

    const abc = ['ddE00mnfR4-KsgYUfc00lt:APA91bHZ5V7ktUAMP6NWtURz2ulwZs18zGnGwVXGrD0W29AZNgMwbQ5ECc5CC-J_I-zs_vYnOb66QfLSATs8FG8eGEE8xm7trzQpSL3GLb9sWl-Os0bfKKAgNwwdruN92ZEFzhd7dly4',
        'cms0UXKfSH2QwhbfcFW0EW:APA91bGlP44sUgXFiavyb8oNhdqZBuSiJa9UOfFDgbYVzDhV3OM4TLdXROk8ngzJ98KG0cMYXyycLvQCF7d5ABEQjL8GeCYCMnXYJ1xbs7TVv2h-OCTFNKDOoNkpne7n27qWCmIL3FqJ',
    'fgadWwqKTM-Qz3cLKj9LOh:APA91bF0ayyznTurPPqG_JCxigD9z-chywMVgVFZBdkhdERQ7MniLt9XFiOsNEqFZIqCGuqmLlmUP_wGuWYFr71d448k_7T8BymuSgP6UXpwIxGU55LM0lLobCqRu4cK57izt84Skpsg',
    'dRCPI7UCSm6V3bFI3MvaaH:APA91bFoOSG3KbpRPkwGyKpIdaiVhokQ88fvIlnfTCOjRk26f_BmLqx91y20_IXir_5rcTc_KFFNL7MxaqJxdqijcn0pv0y8O6Ha8HztH-SHDLSgSgHPBh0mmZWOZffpZQjDrAJjH0K5',
    'f5_h5FlhRSiZge2Xz_glgf:APA91bFAJYl-kFL2ScLARKDVvJK9LCvEN3oRiWWmiJT-BENY6Fjwa3sphYLGzLMtjlwbQYYdcV2iNv1BvtL_5T8bsbXAl31sNEgyqS1oTzweMBPHNPkZIQfagVp2m3ezGoF415ZdXvbr',
    'e9SJ5xUGSbO1hvS1IJsAYg:APA91bEJu2qO7dpUcVuOB30QBoNR9zCR5uP2SOsA8niwShmcY2UTGtDd7m6UiLxVtkjfOfNp2Q7yLRpqKmHIW_64LwkrLpzcDq0cVjTOlaKo3KJVxacbTPWAeQOo05E_9pX8hGzsWx7e',
    'f_bQbeWbS1-GUWrS2r5U3N:APA91bHhEXf0kYdTIsY0Arxk54JUPbn23iEGYHk6sAHn_yw0DGLgkdKV6AvlUwVWcRvImFlqPxvh3v0gRQ4Xtpce_9eh0vJgXq1L5kt96AfE0DmN1GukRn7Sa8v3L71bCuAreI8zHE3f',
        'cEdFhyFmS2a6ACKGe3CMz_:APA91bGFu70LCrsIMdHRbr10_kFgY3GGPHlkMpw7ylRbNFm2HsmHI87Yoqr6QbsFECYy4PlOO9BsT-ukz3IKY4V6ePZVZ24tt067vgQHvl8AiuS4RJJhEA3skIYocIKA6Jfm7h4DsDlK',
        'cVtQEVG1QR2W9OjR_0nztb:APA91bHBpZrfvXfbK00J70JvfTNqHZPBDCMrXq7t1v_wQ6clH3WI-FFo3b_9GyYA60hbciZLnzpvMZEjMnhDDB9noETZDW645OVjzYyw6OzWRmIF7Mloqab2LPfCcAm779Vg6dYaEHYN',
        'dQWg4sbcTGOgo66w5XoIEC:APA91bHK3PKLmtKCRkVX6yM2f-DXBzoKFVGqoOcXhOlzTP03D1n8m4uzi23Neii0u0jq22HPfMYSGrMT7iw5bM2zuZXIJdSM8K0LGFNp3VsNleaFdO0DMKXugM-Y6c0uTD0fezP8rdnY',
    'dQWg4sbcTGOgo66w5XoIEC:APA91bHK3PKLmtKCRkVX6yM2f-DXBzoKFVGqoOcXhOlzTP03D1n8m4uzi23Neii0u0jq22HPfMYSGrMT7iw5bM2zuZXIJdSM8K0LGFNp3VsNleaFdO0DMKXugM-Y6c0uTD0fezP8rdnY',
        'dBx-RM4_TmqcO3SHvBLEI1:APA91bErB2u4JzcbsTGFPtE6i4Ttz7gcPSfQwSJSfdvXzGKYyjofz9qEn60Z38luxbqeCvTzzkPH6rfBpr7NIcFqH5UMWYGGAVvgipbr2Og0psFDNZEMaJnuQv92JtYbK1XkSyHZqXJr',
        'cylB_aOhTdy2wWszBd2XeS:APA91bHrGEdY1dus_v-cIbi1PVQ_xmLewC952Ek5LRNOYrWbeoBaXqSeIZHN8fcoShsdDihOH1AzqfGAttIDnBEW06_8YzR6ZBy8F09RRZ4i2FfPrqPHmTzE6CG7TqnyQUbEB2GSFSv5',
    'ebZEcTcyQDW_Xlhv_ux47z:APA91bGmtMLMOJAS2Bx-OE7d2boNHmfA6z5YK9bgLWWMKsk9KLJS2Y6p_npo7nnFrF5M_Lri-hVkaXGYUi6fvcuLd-SFD1pz4CtiOavWOk8szMmiXYbw7UJ6guoKfX-aBLo75-iRpDK1',
//     'eI0BsSbUSuaT4qp-H8UfDq:APA91bHlANRP0sXJnoeS8poAsr6CUppoObuv899W_lKfBWqFKgsf70gLIWGjqKEjqDOMJsrwQ_jzq6POu0h4WSj1hFqQ9qleLnOBymhWj3QjzNEuCouap4vkTYZiwET4-JBbHATe3UrX', 
// 'cYCbaDacToibldfBjbAjmf:APA91bGtta6ZCceBxriYABgv_0DsjOvqvo_Hel_knCEtMY7Fm12Dk76XIbfpS2XUaz1eFQVy9lwYTwJkAHXTnTiMq_c4_NDCgc6jSXkHyic4fBOUSnFpp8ph-ZGK6Tpk2ysgk_XGg3yi'
]



    admin.messaging().sendToDevice(
        abc, // ['token_1', 'token_2', ...]
        // {
        //   data: {
        //     owner: 'owner2',
        //     user: 'user2',
        //     picture: 'picture2',
        //   },
        // },
        {
                  data: { 
            type:'ReqSnd1',// for usesr request send type
            owner: 'owner2',
            user: 'user2',
            picture: 'picture2',
            id: '12345'
          },
            notification: { 
                title: 'Basic Notification',
                body: 'This is a basic notification sent from the server!',
                image: 'https://cdn.vox-cdn.com/thumbor/WaMmtUSaLMJnNJvfCoVf2la3fPQ=/0x0:1000x662/920x613/filters:focal(420x251:580x411):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65996666/chicks.0.0.0.0.jpg',
               
            }
        },
            // {
            //     // Reference the name created (Optional, defaults to 'ic_launcher')
                
            
            //     // Set color of icon (Optional, defaults to white)
            //     color: '#9c27b0',
            //   },
        {
          // Required for background/quit data-only messages on iOS
          contentAvailable: true,
          // Required for background/quit data-only messages on Android
          priority: 'high',
        },
      );
   
})
*/

module.exports = memberRoute;