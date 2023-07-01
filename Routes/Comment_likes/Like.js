const express = require('express')
const Like_Save_Follow = express.Router();

const fs = require('fs');
const like = require('../../Models/Like');
const save = require('../../Models/save');
const follow = require('../../Models/Follow');
const comment = require('../../Models/Comment');
const Imageupload = require('../../Models/upload');
const report = require('../../Models/report');
const AdmUserReprt = require('../../Models/AdmUserReport');
const DropDown = require('../../Models/dropDowncolor');

// const axios = require('axios');
// const { response } = require('express');

Like_Save_Follow.route('/Like').post(function(req,res){
                const like1 =  like(req.body)
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

Like_Save_Follow.route('/likeCount').post((req,res)=>{
 
    console.log('like Count')
    console.log(req.body)
    like.count({UPstId:req.body.UPstId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log('like count 2')
            console.log(result)
            res.json(result)
        }
    })
})


Like_Save_Follow.route('/Addsave').post(function(req,res){
    const save1 =  save(req.body)
    save1.save()
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

Like_Save_Follow.route('/Getsave').post(function(req,res){
    console.log(req.body)
    save.aggregate([{$match:{UsrId:req.body.UsrId}},
        {$sort:{_id:-1}},{$skip:(req.body.sk*5)},{$limit:5},
        {
            $lookup:{
                from:'ImageUpload',
                localField:'UPstId',
                foreignField:'UPsId',
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
            // }
            
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
Like_Save_Follow.route('/RemoveSave').post((req,res)=>{
    console.log(req.body)
    save.findOneAndDelete({_id:req.body.itemTwo},(err,result)=>{
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


Like_Save_Follow.route('/AddFollow').post(function(req,res){
    console.log(req.body)
    const follow1 =  follow(req.body)
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

Like_Save_Follow.route('/UnFollow').post(function(req,res){ 
    console.log(req.body)
                follow.findOneAndDelete({UGrpId:req.body.UGrpId,UsrId:req.body.UsrId},(err,result)=>{
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

Like_Save_Follow.route('/FollowStatus').post(function(req,res){ 
    console.log('FollowStatus')
    console.log(req.body)
                follow.findOne({UGrpId:req.body.UGrpId,UsrId:req.body.UsrId},(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log(result)
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

Like_Save_Follow.route('/comment').post(function(req,res){
    const Comment = comment(req.body)
        Comment.save()
        .then(res1=>{
            console.log(res1)
            res.json('CommentSaved')
        })
        .catch(error=>{
            let ErrorMsg;
        if(error.code === 11000){
            ErrorMsg = Object.keys(error.keyValue)[0]+"already exits.";
            res.json('Already Commented')
        }else{
            ErrorMsg = error.message;
            console.log(ErrorMsg)
        }
        })
})

Like_Save_Follow.route('/commentCount').post(function(req,res){
    comment.count({UPstId:req.body.UPstId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log('comment count 2')
            console.log(result)
            res.json(result)
        }
    })
})



Like_Save_Follow.route('/getComment').post((req,res)=>{
    comment.aggregate([
        {
            $facet:
            {
            "TtlGood":[
                {$match:{'UPstId':req.body.UPstId,'UCmt':'Good'}},
                // {$count:'countOne'},
               
            ],
          
            "TtlNotBad":[
                {$match:{'UPstId':req.body.UPstId,'UCmt':'Not Bad'}},
                // {$count:'countTwo'}
            ],
            "TtlOkay":[
                {$match:{'UPstId':req.body.UPstId,'UCmt':'Okay'}},
                // {$count:'countThree'}
            ],
            "TtlBeautiful":[
                {$match:{'UPstId':req.body.UPstId,'UCmt':'Beautiful'}},
                // {$count:'countFour'}
            ],
            "TtlNotGood":[
                {$match:{'UPstId':req.body.UPstId,'UCmt':'Not Good'}}, 
                // {$count:'countFive'}
            ],"TtlSpectacular":[
                {$match:{'UPstId':req.body.UPstId,'UCmt':'Spectacular'}},
                // {$count:'countSix'}
            ]
    }},
    {$project:{
        'TtlGood':{$size:'$TtlGood'},
        'TtlNotBad':{$size:'$TtlNotBad'},
        'TtlOkay':{$size:'$TtlOkay'},
        'TtlBeautiful':{$size:'$TtlBeautiful'},
        'TtlNotGood':{$size:'$TtlNotGood'},
        'TtlSpectacular':{$size:'$TtlSpectacular'},
    }}
    ]).exec(function(err,result){
        if(err){
            console.log(err)
            res.json(err)
        }else{
            console.log(result)
            res.json(result)
        }
    })
})

Like_Save_Follow.route('/GroupNames').post((req,res)=>{
    follow.find({UsrId:req.body.UsrId},{UGrpId:1,_id:0},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result) 
            res.json(result)
            const arr=result.map(item=>item.UGrpId)
            console.log(arr)
            
        }
    })
})

Like_Save_Follow.route('/report').post((req,res)=>{
    Imageupload.find({UPsId:req.body.PstId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                if(result[0].PsAdmSts === 'notVerified'){
                    if(result[0].PsSts === 'NtBlk'){
                        report.count({PstId:req.body.PstId},(err,result3)=>{
                            if(err){
                                console.log(err)
                            }else{
                                if(result3 < 2){
                                    const reportData = new report(req.body)
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
                                   Imageupload.updateOne({UPsId:req.body.PstId},
                                    {
                                        $set:{
                                            PsSts:'Blk'
                                            
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
                                                PstId:req.body.PstId,
                                                date1:date,
                                                date2:MyDateString,
                                                date3:[{dt:MyDate.getDate()},{mt:(MyDate.getMonth()+1)},{yr:MyDate.getFullYear()}],
                                                time:formatAMPM(),
                                            }
                                            const AdmReport2 = AdmUserReprt(data)
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

Like_Save_Follow.route('/dropDownColor').post((req,res)=>{
    const drop = DropDown(req.body)
    drop.save()
    .then(res2=>{
        res.json('data Saved')
        console.log('data saved')
    })
    .catch(err=>{
        console.log(err)
    })

})
///DropDown Color End point
Like_Save_Follow.route('/getDropdownColor').post((req,res)=>{
    DropDown.find({fieldOne:req.body.fieldOne,fieldTwo:req.body.fieldTwo},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result1[0].fieldThree)
            console.log(result1[0].fieldThree)
        }
    })
})

Like_Save_Follow.route('/MyPosts').post((req,res)=>{
    Imageupload.aggregate([{$match:{PsBId:req.body.UsrId}},{$sort:{_id:-1}}
    ]).exec(function(err,result){
        if(err){
            console.log(err)
        }else{
            res.json(result)
            console.log(result)
        }
    })
})



module.exports = Like_Save_Follow;