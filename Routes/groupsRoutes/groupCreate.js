const express = require('express')
const multer = require('multer')
const groupCreateRoute = express.Router();
const {nanoid} = require('nanoid')
const {customAlphabet} = require('nanoid/non-secure')

// const GroupCreate = require('../Models/groupCreate')
// const GroupMember = require('../Models/groupMembers')
// const RtrCollection = require('../Models/recToRemove')
// const requestSendReceive = require('../Models/requestSendReceive')
// const registerFull = require('../Models/registerAccess')
// const follow = require('../Models/Follow')



const GroupCreate = require('../../Models/groupCreate')
const GroupMember = require('../../Models/groups/groupMembers')
const RtrCollection = require('../../Models/groups/recToRemove')
const requestSendReceive = require('../../Models/groups/requestSendReceive')
const registerFull = require('../../Models/reg_full')
const follow = require('../../Models/groups/Follow')

var admin = require('firebase-admin'); 
var serviceAccount = require("../../project8-3-918ed-firebase-adminsdk-i4ymq-1b2ca0d7a7.json");
const memberRoute = express.Router()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const nan1 = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',10)
const storageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./GroupImages");
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+nan1()+file.originalname);
    },
});

const upload = multer({storage:storageEngine});

groupCreateRoute.route('/groupCreate').post(upload.single('photo'),(req,res)=>{
    console.log('body')
    console.log(req.body)
    var MyDate = new Date();
    const date = MyDate.getDate()+ '/'+(MyDate.getMonth()+1)+'/'+MyDate.getFullYear()
    const id = nanoid()
    const groupCreate = {
        grpId:id,
        grpNm:req.body.grpNm,
        grpUNm:req.body.grpUNm,
        grpAprNm:req.body.grpAprNm,
        gcrtDt1:date,
        gcrtDt2:[{dt:MyDate.getDate()},{mt:(MyDate.getMonth()+1)},{yr:MyDate.getFullYear()}],
        gcrtTm:'Time',
        gcrtUId:req.body.gcrtUId,
        gcrtUNm:req.body.gcrtUNm,
        gcrtFNm:req.body.gcrtFNm,
        gcrtLNm:req.body.gcrtLNm,
        grpImg:req.file.filename,
        grpImgPt:req.file.path
    }
    const groupMember = {
        grpId:id,
        grpNo:req.body.grpNo,
        grpNm:req.body.grpNm,
        grpUNm:req.body.grpUNm,
        grpAprNm:req.body.grpAprNm,
        grpMemId:req.body.gcrtUId,
        grpMemUNm:req.body.gcrtUNm,
        grpMemFNm:req.body.gcrtFNm,
        grpMemLNm:req.body.gcrtLNm,
        recUId:req.body.gcrtUId,
        recUNm:req.body.gcrtUNm,
        recFNm:req.body.gcrtFNm,
        recLNm:req.body.gcrtLNm,
        grpAdDt1:date,
        grpAdDt2:[{dt:MyDate.getDate()},{mt:(MyDate.getMonth()+1)},{yr:MyDate.getFullYear()}],
        grpAdTm:'Time',
        grpImg:req.file.filename,
        grpImgPt:req.file.path
    }

    GroupMember.find({grpMemId:req.body.gcrtUId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length < 2 ){
                const group = new GroupCreate(groupCreate)
                group.save()
                .then(res7=>{
                    const groupMember1 = new GroupMember(groupMember)
                    groupMember1.save()
                    .then(res8=>{
                        console.log(res8)
                        res.json('groupCreateAdded')   
                    })
                    .catch(err=>{
                        console.log('MemIdGrpIdExistsErr1')
                    })  
                })
                .catch(error=>{
                    let ErrorMsg;
                if(error.code === 11000){
                    //    console.log(error)
                    ErrorMsg = Object.keys(error.keyValue)[0]+"already exits.";
                    res.json('GusernameExists')
                }
                else{
                        ErrorMsg = error.message;
                }
                
                })
            }else {
                res.json('MemLengthExceedsTwoErr1')
            }
        }
    })
    
})

// groupCreateRoute.route('/AddMember').post((req,res)=>{
//     console.log('from Add Member')
//     console.log(req.body)
//     var MyDate2 = new Date();
//     const date2 = MyDate2.getDate()+ '/'+(MyDate2.getMonth()+1)+'/'+MyDate2.getFullYear()
//     const groupMember2 = {
//         grpId:req.body.grpId,
//         grpNo:req.body.grpNo,
//         grpNm:req.body.grpNm,
//         grpUNm:req.body.grpUNm,
//         grpAprNm:req.body.grpAprNm,
//         grpMemId:req.body.grpMemId,
//         grpMemUNm:req.body.grpMemUNm,
//         grpMemFNm:req.body.grpMemFNm,
//         grpMemLNm:req.body.grpMemLNm,
//         recUId:req.body.recUId,
//         recUNm:req.body.recUNm,
//         recFNm:req.body.recFNm,
//         recLNm:req.body.recLNm,
//         grpAdDt1:date2,
//         grpAdDt2:[{dt:MyDate2.getDate()},{mt:(MyDate2.getMonth()+1)},{yr:MyDate2.getFullYear()}],
//         grpAdTm:'Time'
//     }
//     GroupMember.find({grpMemId:req.body.grpMemId},(err,result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             if(result.length < 2){
//                 const groupMember = new GroupMember(groupMember2)
//                 groupMember.save()
//                 .then(res7=>{
//                     res.json('groupMemberAdded')
//                 })
//                 .catch(error=>{
//                     let ErrorMsg;
//                     if(error.code === 11000){
//                      //    console.log(error)
//                         ErrorMsg = Object.keys(error.keyValue)[0]+"already exits.";
//                         res.json('MemIdGrpIdExistsErr2')
//                     }else{
//                          ErrorMsg = error.message;
//                          console.log(ErrorMsg)
//                     }   
//                 })
//             }else{
//                 res.json('MemLengthExceedsTwoErr2')
//             }   
//         }
//     })  
// })

groupCreateRoute.route('/findGroup').post((req,res)=>{
    console.log('memid')
    console.log(req.body)
    GroupMember.find({grpMemId:req.body.grpMemId},(err,result)=>{
        console.log(result)
        if(err){
            console.log(err)
        }else{
            if(result.length > 0) {
                
                res.json(result)
            }else{
                res.json('NoGroup')
            }
        }
    })
})

groupCreateRoute.route('/getGrpMems').post((req,res)=>{
    GroupMember.aggregate([{$match:{grpId:req.body.grpId}},{$sort:{_id:-1}},
        {
            $lookup:{
                from:'RegistrationFull',
                localField:'grpMemId',
                foreignField:'UsrId',
                as:'CombinedGroupMembers'
            }
            
        },
        {
            $unwind:"$CombinedGroupMembers"
        },
        {
            $project:{
                    fNm:'$CombinedGroupMembers.fNm',
                    lNm:'$CombinedGroupMembers.lNm',
                    apNm:'$CombinedGroupMembers.apNm',
                    usrNm:'$CombinedGroupMembers.usrNm',
                    UsrImg:'$CombinedGroupMembers.UsrImg',
                    UsrId:'$CombinedGroupMembers.UsrId',
            }
        } 
    ]).exec(function(err,result){
        if(err){
            console.log(err)
        }else{
            // console.log(result)
            res.json(result)
        }
    })
    // GroupMember.find({grpId:req.body.grpId},(err,result)=>{
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log(result)
    //         res.json(result)
    //     }
    // })
})
groupCreateRoute.route('/getGrpMemNums').post((req,res)=>{
    GroupMember.count({grpId:req.body.grpId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.json(result)
        }
    })
})

groupCreateRoute.route('/removeMem').post((req,res)=>{
    GroupMember.find({grpId:req.body.grpId,grpMemId:req.body.grpMemId},(err,result)=>{
        // console.log(result[0]._id)
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                GroupMember.deleteOne({_id:result[0]._id})
            .then(response=>{
                console.log(response)
                res.json('exited')
            })
            .catch(err=>{
                console.log(err)
            })
            }else{
                res.json('already exited')
            }
            // res.json(result)
            // console.log(result)
        }
         
    })
})

groupCreateRoute.route('/RecToRemv').post((req,res)=>{
    console.log(req.body)
    RtrCollection.find({grpId:req.body.grpId,grpMemIdT:req.body.grpMemIdT,grpMemIdF:req.body.grpMemIdF},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length === 0){
                    RtrCollection.find({grpId:req.body.grpId,grpMemIdT:req.body.grpMemIdT},(err,result1)=>{
                        if(err){
                            console.log(err)
                         }else{
                            if(result1.length > 2){
                                GroupMember.find({grpId:req.body.grpId,grpMemId:req.body.grpMemIdT},(err,result2)=>{
                                    GroupMember.deleteOne({_id:result2[0]._id})
                                    .then((res6)=>{
                                    console.log('deleteSuccess')
                                    // res.json('deleted success')
                                                RtrCollection.deleteMany({grpId:req.body.grpId,grpMemIdT:req.body.grpMemIdT},(err,result4)=>{
                                                    if(err){
                                                        console.log(err)
                                                    }else{
                                                        res.json('deletedMany')
                                                    }
                                                })

                                    })
                                    .catch(err=>{
                                    console.log(err)
                                    })
                                    
                                })      
                            }else{
                                const rtr = new RtrCollection(req.body)
                                    rtr.save()
                                .then(()=>{
                                        res.json('savedInRTR')
                                            // console.log(res5)
                                    })
                                .catch(err=>{
                                        console.log(err)
                                    })                   
                           }                             
                     }
                  })                          
            }else{
                res.json('AlreadySubmitted')
                console.log('Already submitted')
            }               
        }
    })
   
})

groupCreateRoute.route('/requestSR').post((req,res)=>{
    console.log(req.body)
    registerFull.find({UsrId:req.body.rUsrIdF},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result1.length)
            if(result1.length === 1) {
                registerFull.find({phno2:req.body.rPhnoT},(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        if(result.length ===1){
                            requestSendReceive.find({rUsrIdF:req.body.rUsrIdF,rUsrIdT:result[0].UsrId,grpId:req.body.grpId},(err,result3)=>{
                                if(err){
                                    console.log(error)
                                }else if(result3.length ===0){
                                    var MyDate2 = new Date();
                                    const date2 = MyDate2.getDate()+ '/'+(MyDate2.getMonth()+1)+'/'+MyDate2.getFullYear()
                                    const value = result[0]
                                    console.log(value)
                                    function formatAMPM() {
                                        var hours = MyDate2.getHours();
                                        var minutes = MyDate2.getMinutes();
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
                                    const idSR = nanoid()
                                    const data = {
                                        ReqSRId:idSR,
                                        rUsrIdF:req.body.rUsrIdF, //this is from req.body.MidT
                                        rUsrAprNmF:req.body.rUsrAprNmF,
                                        rUsrIdT:value.UsrId,// this is from dicument
                                        grpId:req.body.grpId, // this from req.body.Gid
                                        status:req.body.status,
                                        rPhnoF:req.body.rPhnoF,
                                        rPhnoT:req.body.rPhnoT,
                                        rUsrNmF:result1[0].usrNm,
                                        rUsrFNmF:result1[0].fNm,
                                        rUsrLNmF:result1[0].lNm, 
                                        grpNm:req.body.grpNm,
                                        grpUNm:req.body.grpUNm,
                                        delT:'no',
                                        delF:'no',
                                        date:date2,
                                        time:formatAMPM(),
                                        grpImg:req.body.grpImg 
                                    }
                                    console.log(data)
                    
                                    if(data.rUsrIdT && data.grpId && data.rUsrIdF){
                                        const reqSendRcv = new requestSendReceive(data)
                                            reqSendRcv.save()
                                            .then(res2=>{
                                                // console.log(res2)
                                                

                                                admin.messaging().sendToDevice(
                                                    result[0].tkFcm,
                                                    {
                                                        data: { 
                                                        type:'ReqSnd1',// for usesr request send type
                                                        type2:'Requests',
                                                        owner: 'owner2',
                                                        user: 'user2',
                                                        picture: 'picture2',
                                                        ReqId: idSR
                                                      },
                                                        // notification: { 
                                                        //     title: 'Request has been Sent',
                                                        //     body: 'This is a basic notification sent from the server!',
                                                        //     image: 'https://cdn.vox-cdn.com/thumbor/WaMmtUSaLMJnNJvfCoVf2la3fPQ=/0x0:1000x662/920x613/filters:focal(420x251:580x411):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65996666/chicks.0.0.0.0.jpg',
                                                           
                                                        // }
                                                    },
                                                        
                                                    {                                                   
                                                      contentAvailable: true,                                                      
                                                      priority: 'high',
                                                    },
                                                  );
                                                  res.json('data saved success');
                                            })
                                            .catch(err=>{
                                                console.log(err)
                                            })
                                    }  else{
                                        res.json("not save")
                                    }
                                }else{
                                    res.json('requestAlreadySent')
                                }
                            })      
                        }else if (result.length > 1){
                            console.log('mutiple')
                            res.json('multiple')
                        }else{
                            console.log('not found')
                            res.json('not found')
                        }
                    }
                })
            }
        }
    })
    
})

// groupCreateRoute.route('/reqReceived').post((req,res)=>{
//     console.log(req.body)
//     requestSendReceive.find({rUsrIdT:req.body.UsrId,delT:'no'},(err,result)=>{
//         console.log(result)
//         if(err){
//             console.log(err)
//         }else{
//             if(result.length > 0 ){
//                 res.json(result)
//             }else{
//                 console.log('NoRequestReceivedFound')
//                 res.json('NoRequestReceivedFound')
//             } 
//         }
//     })
// })

groupCreateRoute.route('/totalReqReceived').post((req,res)=>{
    // const MyDate3 = new Date()
    // console.log(MyDate3.getHours()+':'+MyDate3.getMinutes()+':'+MyDate3.getSeconds())
    requestSendReceive.find({rUsrIdT:req.body.UsrId,delT:'no'},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                res.json(result.length)
            }else{
               res.json('Not found')
            }
           
        }
    })
})


groupCreateRoute.route('/reqReceived').post((req,res)=>{
    console.log('body')
    console.log(req.body)

    requestSendReceive.aggregate([{$match:{rUsrIdT:req.body.UsrId,delT:'no'}},
        {$sort:{_id:-1}},
        {$skip:req.body.sk*2},{$limit:2},
                {
                $lookup:{
                    from:'RegistrationFull',
                    localField:'rUsrIdF',
                    foreignField:'UsrId',
                    as:'CombinedUser'
                }},
                {
                    $project:{
                        UserImgF:'$CombinedUser.UsrImg',
                        ReqSRId:'$ReqSRId',
                        rUsrIdF:'$rUsrIdF',
                        rUsrAprNmF:'$rUsrAprNmF',
                        rUsrIdT:'$rUsrIdT',
                        grpId:'$grpId',
                        status:'$status',
                        rPhnoF:'$rPhnoF',
                        rPhnoT:'$rPhnoT',
                        rUsrNmF:'$rUsrNmF',
                        rUsrFNmF:'$rUsrFNmF',
                        rUsrLNmF:'$rUsrLNmF',
                        grpNm:'$grpNm',                    
                        grpUNm:'$grpUNm',  
                        delT:'$delT',
                        delF:'$delF',
                        date:'$date',
                        time:'$time',
                        grpImg:'$grpImg'
                    }
                }
            ]).exec(function(err,result){
                    console.log(result.length)
        if(err){
            console.log(err)
        }else{
            if(result.length > 0 ){
                res.json(result)
            }else{
                console.log('NoRequestReceivedFound')
                res.json('NoRequestReceivedFound')
            } 
        }
    })
})

groupCreateRoute.route('/RAccept').post((req,res)=>{  
    console.log('from RAccept')
    console.log(req.body)
    
    GroupMember.find({grpMemId:req.body.info.grpMemId,grpId:req.body.info.grpId},(err,result7)=>{
        if(result7.length === 0){
            GroupMember.find({grpMemId:req.body.info.grpMemId},(err,result)=>{
                console.log('group length')
                console.log(result.length) 
                if(result.length < 2){
                 
                    if(req.body.info.status ==='Accept'){    
                        GroupCreate.find({grpId:req.body.info.grpId},(err,result2)=>{
                            if(result2.length > 0){
                                registerFull.find({UsrId:req.body.info.grpMemId},(err,result3)=>{
                                    // console.log(result3)
                                    if(result3.length > 0){
                                        var MyDate2 = new Date();
                                        const date2 = MyDate2.getDate()+ '/'+(MyDate2.getMonth()+1)+'/'+MyDate2.getFullYear()
                                        const Time1 = MyDate2.getHours()+':'+MyDate2.getMinutes()+':'+MyDate2.getSeconds()
                                        const grpData = {
                                            grpId:req.body.info.grpId,
                                            grpNm:result2[0].grpNm,
                                            grpUNm:result2[0].grpUNm,
                                            grpAprNm:'',
                                            grpMemId:result3[0].UsrId,
                                            grpMemUNm:result3[0].usrNm,
                                            grpMemFNm:result3[0].fNm,
                                            grpMemLNm:result3[0].lNm,
                                            recUId:req.body.info.UserFrom,
                                            recUNm:'',
                                            recFNm:'',
                                            recLNm:'',
                                            grpAdDt1:date2,
                                            grpAdDt2:[{dt:MyDate2.getDate()},{mt:(MyDate2.getMonth()+1)},{yr:MyDate2.getFullYear()}],
                                            grpAdTm:Time1,
                                            grpImg:req.body.info.grpImg,
                                            grpImgPt:req.body.info.grpImgPt
                        
                                        }
                                        const Gm = new GroupMember(grpData)
                                            Gm.save()
                                            .then(()=>{
                                                // console.log(res2.body)
                                                // res.status(200).json({'Gmcollection':'Data is added'});
                                                requestSendReceive.updateOne({_id:req.body.changeid.id},
                                                    {
                                                        $set: {
                                                            status:"Accepted"
                                                        }
                                                    },(err,result1)=>{
                                                        if(err){
                                                            res.json('server error')
                                                        }else{
                                                            // console.log('saved')
                                                            // res.json(result1.nModified)
                                                            res.json(result1.modifiedCount)
                                                            // console.log(result1)
                                                        }              
                                                    })
                                            })  
                                            .catch(error=>{
                                                let ErrorMsg;
                                                    if(error.code === 11000){
                                                        ErrorMsg = Object.keys(error.keyValue)[0]+"already exits.";
                                                        res.json('AlreadyAccepted')
                                                    }else{
                                                        ErrorMsg = error.message;
                                                        console.log(ErrorMsg)
                                                    }
                                                // res.status(400).send(err);
                                            })
                                    }else{
                                        console.log(err)
                                    }
                                })
                            }else{
                                console.log(err)    
                            }
                        })
                    }else{
                        res.json('AlreadyAccepted')
                    }
                }
                else{
                    console.log('exceed limit')
                    res.json('exceedlimit')
                }
            })
        }else{
            res.json('AlreadyMember')
        }
    })
    
})

groupCreateRoute.route('/totalReqSent').post((req,res)=>{
    requestSendReceive.find({rUsrIdF:req.body.UsrId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                res.json(result.length)
            }else{
               res.json('Not found')
            }
           
        }
    })
})

groupCreateRoute.route('/reqSent').post((req,res)=>{
    console.log('Request sent1')
    console.log(req.body)
    requestSendReceive.find({rUsrIdF:req.body.UsrId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0 ){
                res.json(result)
            }else{
                console.log('NoRequestSentFound')
                res.json('NoRequestSentFound')
            } 
        }
    }).skip(req.body.sk*2).limit(2)
})
groupCreateRoute.route('/reqSentDelete').post((req,res)=>{
    console.log(req.body)
    requestSendReceive.deleteOne({_id:req.body._id})
    .then(response=>{
        if(response.deletedCount > 0){
            console.log(response)
            res.json('deletedSuccess') 
        }   
    }).catch(err=>{
        console.log(err)
    })
})
groupCreateRoute.route('/reqReceivedDelete').post((req,res)=>{
    console.log(req.body)
    requestSendReceive.updateOne({_id:req.body._id},{
        $set: {
            delT:"Yes"
        }
    })
    .then(response=>{
        if(response.modifiedCount > 0){
            console.log(response)  
            res.json('deletedSuccess')
        }
        
    }).catch(err=>{
        console.log(err)
    })
})

groupCreateRoute.route('/groupHome').post((req,res)=>{
    GroupCreate.find({grpId:req.body.grpId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                GroupMember.count({grpId:req.body.grpId},(err,result1)=>{
                    if(err){
                        console.log(err)
                    }else{
                        const dataGroup = [{
                            a:result[0],
                            b:result1
                        }]
                        console.log(result1)
                        console.log(dataGroup)
                        res.json(dataGroup)
                    }
                })
                // res.json(result)
            }else{
                res.json('notFound')
            }
        }
    })
})

groupCreateRoute.route('/getGroup').post((req,res)=>{
    follow.aggregate([{$match:{UsrId:req.body.UsrId}},{$sort:{_id:-1}},
            {
                $lookup:{
                    from:'GroupCreate',
                    localField:'UGrpId',
                    foreignField:'grpId',
                    as:'CombinedGroup'
                }
            },
            {
                $project:{
                    userFlwGroups:'$CombinedGroup'
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

groupCreateRoute.route('/FindGroupDetails').post((req,res)=>{
    console.log('memid')
    console.log(req.body)
    GroupMember.find({grpMemId:req.body.gcrtUId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length < 2 ){
                GroupCreate.find({grpUNm:req.body.grpUNm},(err,result1)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(result1)
                        console.log(result1.length)
                        if(result1.length === 0){    
                            console.log('available')
                            res.json('Available')
                        }else{
                            console.log('user name exit')
                            res.json('UsernameExists')
                        }
                    }
                })   
        }else{
            console.log('GroupMemberLimitExceeds')
            res.json('GroupMemberLimitExceeds')
        }
    }
    })
})



module.exports = groupCreateRoute;