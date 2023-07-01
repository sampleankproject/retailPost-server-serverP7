const express = require('express')
const multer = require('multer')
const DataUpload = express.Router();
const fs = require('fs');
const Imageupload = require('../../Models/upload')
const dropdown = require('../../Models/dropDown')
const like = require('../../Models/Like');
const comment = require('../../Models/Comment');
const GroupCreate = require('../../Models/groupCreate');
const registerFull = require('../../Models/reg_full');
const GroupMember = require('../../Models/groupMembers');
const follow = require('../../Models/Follow');
const dropdown2 = require('../../Models/dropDown2');
const Imageuploadsmall = require('../../Models/uploadTwo');
const {nanoid} = require('nanoid')
const {customAlphabet} = require('nanoid/non-secure')

const nan1 = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',10)
console.log(nan1())
const storageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./images");
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+nan1()+file.originalname);
    },
});
const upload = multer({storage:storageEngine});
DataUpload.route('/imageUpload').post(upload.array('photo'),(req,res)=>{
    console.log('imageUpload details')
    // console.log(req.files)
    console.log(req.body)
 
    var MyDate = new Date();
    console.log(MyDate)

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
    const id = nanoid();
    if(req.files ===null){
        console.log('error uploading')
    }else{
        const obj =( {
            
            UPsId:id,
            PsTp:'pst',
            PsSts:'NtBlk',
            PsAdmSts:'notVerified',
            PsBId:req.body.UsrId,
            PsBAprNm:req.body.UsrApNm,
            PsBUNm:req.body.UsrUNm,
            PsBFNm:req.body.UsrFNm,
            PsBLNm:req.body.UsrLNm,
            PsBGpUNm:req.body.UsrGpUNm,
            PsBGpId:req.body.UsrGpId,
            PsBGpNm:req.body.UsrGpNm,
            PsDt1:date,
            PsDt2:MyDateString,
            PsDt3:[{dt:MyDate.getDate()},{mt:(MyDate.getMonth()+1)},{yr:MyDate.getFullYear()}],
            PsTm:formatAMPM(),
            PsGn:req.body.UsrGndr,
            PsOcs:req.body.UsrPstOcsn,
            PsWrTp1:req.body.UsrPstWrTp1,
            PsWrTp2:req.body.UsrPstWrTp2,
            PsWrTp3:req.body.UsrPstWrTp3,
            PsWrTp4:req.body.UsrPstWrTp4,
            PsWrCl1:req.body.UsrPstWrClr1,
            PsWrCl2:req.body.UsrPstWrClr2,
            PsWrClCd1:req.body.UsrPstWrClrCd1,
            PsWrClCd2:req.body.UsrPstWrClrCd2,
            PsImg:[{img0:req.files[0].filename},{img0:req.files[1].filename},{img0:req.files[2].filename},{img0:req.files[3].filename},{img0:req.files[4].filename},{img0:req.files[5].filename}],
            PsImgPt:[{img0:req.files[0].path},{img0:req.files[1].path},{img0:req.files[2].path},{img0:req.files[3].path},{img0:req.files[4].path},{img0:req.files[5].path}],
            PsImgSz:[{img0:req.files[0].size},{img0:req.files[1].size},{img0:req.files[2].size},{img0:req.files[3].size},{img0:req.files[4].size},{img0:req.files[5].size}],
            PsDst:req.body.UsrPstDst,
            PsSt:req.body.UsrPstSt,
            PsCnt:req.body.UsrPstCnt
        })

        const obj2 = {
            UPsId:id,
            PsBId:req.body.UsrId, 
            PsBGpId:req.body.UsrGpId,
            PsDt2:MyDateString,
            PsDt3:[{dt:MyDate.getDate()},{mt:(MyDate.getMonth()+1)},{yr:MyDate.getFullYear()}],
            PsTm:formatAMPM()
        }
        GroupMember.count({grpId:req.body.UsrGpId},(err,result3)=>{
            if(err){
                console.log(err)
            }else{
                if(result3 > 2){ // Members should be > 2 i.e 3 or more
                    Imageuploadsmall.count({PsBId:req.body.UsrId,PsBGpId:req.body.UsrGpId,PsDt2:MyDateString})
                    // .sort({_id:-1})
                    .exec((err,result2)=>{
                        if(err){
                            console.log(err)
                        }        
                        else{
                            console.log('length')
                            console.log(result2)
                            if(result2 < 10){ // post per day member limit
                                Imageupload.create(obj,(err,result)=>{
                                    if(err){
                                        console.log(err)
                                    }else{
                                        Imageuploadsmall.create(obj2,(err,result4)=>{
                                            if(err){
                                                console.log(err)
                                            }else{
                                                console.log('Success ImageUpload Small')
                                                res.json('Success')
                                            }
                                        })
                                        console.log('success ImageUpload')
                                        // console.log(result)
                                      
                                    }
                                })
                                
                            }else{
                                res.json('exceedsPostLimit')
                                console.log('exceedsPostLimit')
                            }
            
                        }
            
                    })
                }else{
                    console.log('Members are less than minimum number')
                    res.json('MembersLessThanMinNum')
                }
            }
        })
     
       
    } 
   
})

DataUpload.route('/dropdown').post((req,res)=>{
    const dropdown1 = dropdown(req.body)
        dropdown1.save()
        .then(res1=>{
            res.json('data saved')
            console.log(res1)
        })
        .catch(err=>{
            console.log(err)
        })
})

DataUpload.route('/dropdownTwo').post((req,res)=>{
    const dropdown10 = dropdown2(req.body)
        dropdown10.save()
        .then(res1=>{
            res.json('data saved in dropdown2')
            console.log(res1)
        })
        .catch(err=>{
            console.log(err)
        })
})

DataUpload.route('/getDropdown').post((req,res)=>{
    dropdown.find({fieldOne:req.body.fieldOne,fieldTwo:req.body.fieldTwo},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result1[0].fieldThree)
            console.log(result1[0].fieldThree)
        }
    })
})

DataUpload.route('/getDropdownTwo').post((req,res)=>{
    console.log('Itmes 2')
    console.log(req.body)
    dropdown2.find({fieldOne:req.body.fieldOne,fieldTwo:req.body.fieldTwo},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result1[0].fieldThree)
            console.log(result1[0].fieldThree)
        }
    })
})

DataUpload.route('/ImageAccessAll').post((req,res)=>{
    Imageupload.aggregate([{$sort:{'_id':1}}],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
            console.log(result)
        }
    })
})

DataUpload.route('/ImageAccessOne').post((req,res)=>{
    console.log(req.body)
    Imageupload.findOne({UPsId:req.body.UPsId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
            console.log(result)
        }
    })
})

DataUpload.route('/CombinedPostData').post((req,res)=>{
    console.log('combinedPostData')
    console.log(req.body)
    const {offset} = req.query
    // const offset = req.body.Num 
    const skip = 5*parseInt(offset)
    const limit = 5
    console.log(offset)
    Imageupload.aggregate([{$match:{PsSt:req.body.st}},
        {$sort:{_id:-1}}, {$skip:skip},{$limit:limit},
            {
            $lookup:{
                from:'Like',
                localField:'UPsId',
                foreignField:'UPstId',
                as:'CombinedLike'
            },
        }
        ,{
            $lookup:{
            from:'comment',
            localField:'UPsId',
            foreignField:'UPstId',
            as:'CombinedComment'
        }},{
            $lookup:{
                from:'GroupCreate',
                localField:'PsBGpId',
                foreignField:'grpId',
                as:'CombinedGroup'
            }
        },
        {
            $lookup:{
                from:'RegistrationFull',
                localField:'PsBId',
                foreignField:'UsrId',
                as:'CombinedUser'
            }
        },      
        {
            $project:{
                Lkcount:{$size:"$CombinedLike"},
                Cmtcount:{$size:"$CombinedComment"},
                Group:'$CombinedGroup',
                // User:'$CombinedUser',
                CUsrApNm:'$CombinedUser.apNm',
                CUsrImg:'$CombinedUser.UsrImg',
                CUsrNm:'$CombinedUser.usrNm',
                

                UPsId:'$UPsId',
                PsTp:'$PsTp',
                PsSts:'$PsSts',
                PsAdmSts:'$PsAdmSts',
                PsBId:'$PsBId',
                PsBAprNm:'$PsBAprNm',
                PsBUNm:'$PsBUNm',
                PsBFNm:'$PsBFNm',
                PsBLNm:'$PsBLNm',
                PsBGpUNm:'$PsBGpUNm',
                PsBGpId:'$PsBGpId',
                PsBGpNm:'$PsBGpNm',
                PsDt1:'$PsDt1',
                PsDt2:'$PsDt2',
                PsDt3:'$PsDt3',
                PsTm:'$PsTm',
                PsGn:'$PsGn',
                PsOcs:'$PsOcs',
                PsWrTp1:'$PsWrTp1',
                PsWrTp2:'$PsWrTp2',
                PsWrTp3:'$PsWrTp3',
                PsWrTp4:'$PsWrTp4',
                PsWrCl1:'$PsWrCl1',
                PsWrCl2:'$PsWrCl2',
                PsWrClCd1:'$PsWrClCd1',
                PsWrClCd2:'$PsWrClCd2',
                PsImg:'$PsImg',
                PsImgPt:'$PsImgPt',
                PsImgSz:'$PsImgSz',
                PsDst:'$PsDst',
                PsSt:'$PsSt',
                PsCnt:'$PsCnt',
                
            }
        },

]).exec(function(err,result){
    if(err){
        console.log(err)
    }else{
        // console.log(result)
      
        // setTimeout(()=>{
            console.log('combined Data')
            console.log(result.length)
            res.json(result)

        // },100)
      
    }
})
})


DataUpload.route('/CombinedGroupPostData').post((req,res)=>{
    console.log(req.body)
    const skip = 5*parseInt(req.body.num)
    const limit = 5
    Imageupload.aggregate([{$match:{PsCnt:'country',PsBGpId:req.body.grpId}},
        {$sort:{_id:-1}},{$skip:skip},{$limit:limit},
            {
            $lookup:{
                from:'Like',
                localField:'UPsId',
                foreignField:'UPstId',
                as:'CombinedLike'
            },
        }
        ,{
            $lookup:{
            from:'comment',
            localField:'UPsId',
            foreignField:'UPstId',
            as:'CombinedComment'
        }},{
            $lookup:{
                from:'GroupCreate',
                localField:'PsBGpId',
                foreignField:'grpId',
                as:'CombinedGroup'
            }
        },
        {
            $lookup:{
                from:'RegistrationFull',
                localField:'PsBId',
                foreignField:'UsrId',
                as:'CombinedUser'
            }
        },      
        {
            $project:{
                Lkcount:{$size:"$CombinedLike"},
                Cmtcount:{$size:"$CombinedComment"},
                Group:'$CombinedGroup',
                User:'$CombinedUser',

                UPsId:'$UPsId',
                PsTp:'$PsTp',
                PsSts:'$PsSts',
                PsAdmSts:'$PsAdmSts',
                PsBId:'$PsBId',
                PsBAprNm:'$PsBAprNm',
                PsBUNm:'$PsBUNm',
                PsBFNm:'$PsBFNm',
                PsBLNm:'$PsBLNm',
                PsBGpUNm:'$PsBGpUNm',
                PsBGpId:'$PsBGpId',
                PsBGpNm:'$PsBGpNm',
                PsDt1:'$PsDt1',
                PsDt2:'$PsDt2',
                PsDt3:'$PsDt3',
                PsTm:'$PsTm',
                PsGn:'$PsGn',
                PsOcs:'$PsOcs',
                PsWrTp1:'$PsWrTp1',
                PsWrTp2:'$PsWrTp2',
                PsWrTp3:'$PsWrTp3',
                PsWrTp4:'$PsWrTp4',
                PsWrCl1:'$PsWrCl1',
                PsWrCl2:'$PsWrCl2',
                PsWrClCd1:'$PsWrClCd1',
                PsWrClCd2:'$PsWrClCd2',
                PsImg:'$PsImg',
                PsImgPt:'$PsImgPt',
                PsImgSz:'$PsImgSz',
                PsDst:'$PsDst',
                PsSt:'$PsSt',
                PsCnt:'$PsCnt',
                
            }
        },

]).exec(function(err,result){
    if(err){
        console.log(err)
    }else{
        // console.log(result)
        res.json(result)
    }
})
})

DataUpload.route('/GroupFlwPost').post((req,res)=>{
    console.log(req.body)
    const skip = 5*parseInt(req.body.num)
    const limit = 5
    follow.find({UsrId:req.body.UsrId},{UGrpId:1,_id:0},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result) 
            // res.json(result)
            const arr=result.map(item=>item.UGrpId)
            console.log(arr)

            Imageupload.aggregate([{$match:{PsCnt:'country',PsBGpId:{$in:arr}}},
                    {$sort:{_id:-1}},{$skip:skip},{$limit:limit},
            {
            $lookup:{
                from:'Like',
                localField:'UPsId',
                foreignField:'UPstId',
                as:'CombinedLike'
            },
        }
        ,{
            $lookup:{
            from:'comment',
            localField:'UPsId',
            foreignField:'UPstId',
            as:'CombinedComment'
        }},{
            $lookup:{
                from:'GroupCreate',
                localField:'PsBGpId',
                foreignField:'grpId',
                as:'CombinedGroup'
            }
        },
        {
            $lookup:{
                from:'RegistrationFull',
                localField:'PsBId',
                foreignField:'UsrId',
                as:'CombinedUser'
            }
        },      
        {
            $project:{
                Lkcount:{$size:"$CombinedLike"},
                Cmtcount:{$size:"$CombinedComment"},
                Group:'$CombinedGroup',
                User:'$CombinedUser',

                UPsId:'$UPsId',
                PsTp:'$PsTp',
                PsSts:'$PsSts',
                PsAdmSts:'$PsAdmSts',
                PsBId:'$PsBId',
                PsBAprNm:'$PsBAprNm',
                PsBUNm:'$PsBUNm',
                PsBFNm:'$PsBFNm',
                PsBLNm:'$PsBLNm',
                PsBGpUNm:'$PsBGpUNm',
                PsBGpId:'$PsBGpId',
                PsBGpNm:'$PsBGpNm',
                PsDt1:'$PsDt1',
                PsDt2:'$PsDt2',
                PsDt3:'$PsDt3',
                PsTm:'$PsTm',
                PsGn:'$PsGn',
                PsOcs:'$PsOcs',
                PsWrTp1:'$PsWrTp1',
                PsWrTp2:'$PsWrTp2',
                PsWrTp3:'$PsWrTp3',
                PsWrTp4:'$PsWrTp4',
                PsWrCl1:'$PsWrCl1',
                PsWrCl2:'$PsWrCl2',
                PsWrClCd1:'$PsWrClCd1',
                PsWrClCd2:'$PsWrClCd2',
                PsImg:'$PsImg',
                PsImgPt:'$PsImgPt',
                PsImgSz:'$PsImgSz',
                PsDst:'$PsDst',
                PsSt:'$PsSt',
                PsCnt:'$PsCnt',
                
            }
        },

]).exec(function(err,result2){
    if(err){
        console.log(err)
    }else{
        console.log(result2)
        res.json(result2)
    }
})
            
            
        }
    })
})

DataUpload.route('/MyPostsDelete').post((req,res)=>{
    console.log(req.body)
    Imageupload.find({UPsId:req.body.UPsId},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                
            const post = result.map(item=>item.PsImg)
            console.log(post[0].length)
            for(let i=0;i<post[0].length;i++){
                fs.unlink('./images/'+post[0][i].img0,(err)=>{
                if(err){
                    console.log(err)
                }else{
                    // console.log(i)
                    if(i===(post[0].length)-1){
                           Imageupload.deleteOne({UPsId:req.body.UPsId},(err,result2)=>{
                              if(err){
                                  console.log(err)
                              }else{
                                console.log(result2)
                                res.json(result2)
                                // res.json('deleted successfully')
                              }
                          })
                        console.log('deleted successfully')
                        
                    }else{
                        console.log('not deleted')
                    }
                }
            })
            }
            }else{
                console.log('not found')
            }
            // res.json(result)
            
            // res.json('deleted 22')
            // const post2 = post.map(item1=>item1.PsImg)
            // res.json(post[0][1].img0)
            // fs.unlink('./images/1635414482690sL1gY1ndPq904a9e87-eea2-4738-bea0-c5e77d758354.JPEG',(err,result3)=>{
            //     if(err){
            //         console.log(err)
            //     }else{
            //         console.log('deleted')
            //         res.json(result3)
            //     }
            // })
        //   Imageupload.deleteOne({UPsId:req.body.UPsId},(err,result2)=>{
        //       if(err){
        //           console.log(err)
        //       }else{
        //         console.log(result2)
        //         res.json(result2)
        //       }
        //   })
            
        }
    })
})

///new///
DataUpload.route('/getLkCount').post((req,res)=>{
    console.log('getLkCount')
    console.log(req.body)
if (req.body.PsGn === 'All'){
    Imageupload.aggregate([{$match:{PsDt2:{$gte:req.body.PsDt2,$lte:req.body.PsDt3}}},
        // {$sort:{_id:-1}}, 
            {
            $lookup:{
                from:'Like',
                localField:'UPsId',
                foreignField:'UPstId',
                as:'CombinedLike'
            },
        },
        {
            $addFields: {
              totalList: { $size: "$CombinedLike" } 
            }
          },
      
          { $sort: 
            { "totalList": -1 }
         },
        ///////////////////////////////// need to be used for limited fetch
         {
            $limit:3
        
         },
        /////////////////////////////////
    
      
         
        
        ///////////////////////
        {
            $project:{
                // Lkcount:"$countnum",
                Lkcount:"$totalList",
                // Group:'$CombinedGroup',
                // User:'$CombinedUser',
                // CUsrApNm:'$CombinedUser.apNm',
                // CUsrImg:'$CombinedUser.UsrImg',
                // CUsrNm:'$CombinedUser.usrNm',
                

                UPsId:'$UPsId',
                PsBId:'$PsBId',
                // PsTp:'$PsTp',
                // PsSts:'$PsSts',
                // PsAdmSts:'$PsAdmSts',
                // PsBId:'$PsBId',
                PsBAprNm:'$PsBAprNm',
                PsBUNm:'$PsBUNm',
                // PsBFNm:'$PsBFNm',
                // PsBLNm:'$PsBLNm',
                // PsBGpUNm:'$PsBGpUNm',
                PsBGpId:'$PsBGpId',
                // PsBGpNm:'$PsBGpNm',
                // PsDt1:'$PsDt1',
                // PsDt2:'$PsDt2',
                // PsDt3:'$PsDt3',
                // PsTm:'$PsTm',
                // PsGn:'$PsGn',
                // PsOcs:'$PsOcs',
                // PsWrTp1:'$PsWrTp1',
                // PsWrTp2:'$PsWrTp2',
                // PsWrTp3:'$PsWrTp3',
                // PsWrTp4:'$PsWrTp4',
                // PsWrCl1:'$PsWrCl1',
                // PsWrCl2:'$PsWrCl2',
                // PsWrClCd1:'$PsWrClCd1',
                // PsWrClCd2:'$PsWrClCd2',
                // PsImg:'$PsImg',
                // PsImgPt:'$PsImgPt',
                // PsImgSz:'$PsImgSz',
                // PsDst:'$PsDst',
                // PsSt:'$PsSt',
                // PsCnt:'$PsCnt',
                
            }
        },

]).exec(function(err,result){
    if(err){
        console.log(err)
        res.json(err)
    }else{
        // console.log(result)
        if (result.length >0){
        console.log('getLkCount')
        res.json(result)
        }
        else{
            console.log('no data getLkCount')
            res.json('no data getLkCount')
        }
    }
})



}
else{
    Imageupload.aggregate([{$match:{PsDt2:{$gte:req.body.PsDt2},PsGn:req.body.PsGn}},
        // {$sort:{_id:-1}}, 
            {
            $lookup:{
                from:'Like',
                localField:'UPsId',
                foreignField:'UPstId',
                as:'CombinedLike'
            },
        },
        {
            $addFields: {
              totalList: { $size: "$CombinedLike" } 
            }
          },
      
          { $sort: 
            { "totalList": -1 }
         },
        ///////////////////////////////// need to be used for limited fetch
         {
            $limit:3
        
         },
        /////////////////////////////////
    
      
         
        
        ///////////////////////
        {
            $project:{
                // Lkcount:"$countnum",
                Lkcount:"$totalList",
                // Group:'$CombinedGroup',
                // User:'$CombinedUser',
                // CUsrApNm:'$CombinedUser.apNm',
                // CUsrImg:'$CombinedUser.UsrImg',
                // CUsrNm:'$CombinedUser.usrNm',
                

                UPsId:'$UPsId',
                PsBId:'$PsBId',
                // PsTp:'$PsTp',
                // PsSts:'$PsSts',
                // PsAdmSts:'$PsAdmSts',
                // PsBId:'$PsBId',
                PsBAprNm:'$PsBAprNm',
                PsBUNm:'$PsBUNm',
                // PsBFNm:'$PsBFNm',
                // PsBLNm:'$PsBLNm',
                // PsBGpUNm:'$PsBGpUNm',
                // PsBGpId:'$PsBGpId',
                // PsBGpNm:'$PsBGpNm',
                // PsDt1:'$PsDt1',
                // PsDt2:'$PsDt2',
                // PsDt3:'$PsDt3',
                // PsTm:'$PsTm',
                // PsGn:'$PsGn',
                // PsOcs:'$PsOcs',
                // PsWrTp1:'$PsWrTp1',
                // PsWrTp2:'$PsWrTp2',
                // PsWrTp3:'$PsWrTp3',
                // PsWrTp4:'$PsWrTp4',
                // PsWrCl1:'$PsWrCl1',
                // PsWrCl2:'$PsWrCl2',
                // PsWrClCd1:'$PsWrClCd1',
                // PsWrClCd2:'$PsWrClCd2',
                // PsImg:'$PsImg',
                // PsImgPt:'$PsImgPt',
                // PsImgSz:'$PsImgSz',
                // PsDst:'$PsDst',
                // PsSt:'$PsSt',
                // PsCnt:'$PsCnt',
                
            }
        },

]).exec(function(err,result){
    if(err){
        console.log(err)
        res.json(err)
    }else{
        // console.log(result)
        if (result.length >0){
        console.log('getLkCount')
        res.json(result)
        }
        else{
            console.log('no data getLkCount')
            res.json('no data getLkCount')
        }
    }
})
}
})



module.exports = DataUpload;