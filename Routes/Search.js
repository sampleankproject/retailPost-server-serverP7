const express = require('express')
const multer = require('multer')
const RegRoutes1 = express.Router();
const fs = require('fs');
const registerFull = require('../Models/reg_full')
const registerSmall = require('../Models/reg_small')
const Imageupload = require('../Models/upload');
const GroupCreate = require('../Models/groupCreate');
const {nanoid} = require('nanoid')
const {customAlphabet} = require('nanoid/non-secure')



RegRoutes1.route('/searchOne').post((req,res)=>{
    console.log(req.body)
    Imageupload.find({$text:{$search:req.body.searchip}},{score:{$meta:"textScore"}},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else{
                res.json('no data found')
            }
           
        }
    }).sort({score:{$meta:"textScore"}}).skip(req.body.sk*5).limit(5)
})

RegRoutes1.route('/AllSearchData1').post((req,res)=>{
    console.log(req.body)
    GroupCreate.find({$text:{$search:req.body.Text}},{score:{$meta:"textScore"}},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                res.json(result)
            }else{
                res.json('Group not found')
            }
        }
    }).sort({score:{$meta:"textScore"}}).skip(req.body.sk*5).limit(5)
})

// RegRoutes1.route('/AllSearchData2').post((req,res)=>{
//     console.log(req.body)
//     GroupCreate.find({grpUNm:req.body.Text},(err,result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             if(result.length > 0){
//                 res.json(result)
//             }else{
//                 res.json('Group not found')
//             }
//         }
//     }).sort({_id:-1})
// })

RegRoutes1.route('/AllSearchData3').post((req,res)=>{
    console.log(req.body)
    Imageupload.find({PsSt:req.body.PsSt,PsGn:req.body.PsGn},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                
                res.json(result)
            }else{
                res.json('Post not found')
            }
        }
    }).sort({_id:-1}).skip(req.body.sk*5).limit(5)
})

RegRoutes1.route('/AllSearchData4').post((req,res)=>{
    console.log(req.body)
    Imageupload.find({PsSt:req.body.PsSt,PsGn:req.body.PsGn,PsWrTp1:req.body.PsWrTp1},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                res.json(result)
            }else{
                res.json('Post not found')
            }
        }
    }).sort({_id:-1}).skip(req.body.sk*5).limit(5)
})

RegRoutes1.route('/AllSearchData5').post((req,res)=>{
    console.log(req.body)
    Imageupload.find({PsSt:req.body.PsSt,PsGn:req.body.PsGn,PsWrTp1:req.body.PsWrTp1,PsWrCl1:{$in:req.body.PsWrCl1}},
        (err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                res.json(result)
            }else{
                res.json('Post not found')
            }
        }
    }).sort({_id:-1}).skip(req.body.sk*5).limit(5)
})

RegRoutes1.route('/AllSearchData6').post((req,res)=>{
    console.log(req.body)
    Imageupload.find({PsSt:req.body.PsSt,PsGn:req.body.PsGn,PsWrTp1:req.body.PsWrTp1,PsWrCl2:{$in:req.body.PsWrCl2}},
        (err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                res.json(result)
            }else{
                res.json('Post not found')
            }
        }
    }).sort({_id:-1}).skip(req.body.sk*5).limit(5)
})

RegRoutes1.route('/AllSearchData7').post((req,res)=>{
    console.log(req.body)
    Imageupload.find({PsSt:req.body.PsSt,PsGn:req.body.PsGn,PsWrTp1:req.body.PsWrTp1,PsWrCl1:{$in:req.body.PsWrCl1},PsWrCl2:{$in:req.body.PsWrCl2}},
        (err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                res.json(result)
            }else{
                res.json('Post not found')
            }
        }
    }).sort({_id:-1}).skip(req.body.sk*5).limit(5)
})
///////////////////////////////////////////////////

RegRoutes1.route('/AddTkn').post((req,res)=>{
    console.log(req.body)
registerFull.updateOne({UsrId:req.body.UserId},
         
    {$set:{
        tkFcm:req.body.tkFcm,
        tkFcmDt:req.body.tkFcmDt
    }},
    
    (err,result)=>{
    if(err){
        console.log(err)
    }
    else{
    res.json('uploaded')   
    console.log('uploaded')  
  
  
    }
})

})




// RegRoutes1.route('/AllSearchData8').post((req,res)=>{
//     console.log(req.body)
//     Imageupload.find({PsSt:req.body.PsSt,PsGn:req.body.PsGn,PsWrCl1:{$in:req.body.PsWrCl1}},
//         (err,result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             if(result.length > 0){
//                 res.json(result)
//             }else{
//                 res.json('Post not found')
//             }
//         }
//     }).sort({_id:-1}).skip(req.body.sk*1).limit(10)
// })

// RegRoutes1.route('/AllSearchData9').post((req,res)=>{
//     console.log(req.body)
//     Imageupload.find({PsSt:req.body.PsSt,PsGn:req.body.PsGn,PsWrCl2:{$in:req.body.PsWrCl2}},
//         (err,result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             if(result.length > 0){
//                 res.json(result)
//             }else{
//                 res.json('Post not found')
//             }
//         }
//     }).sort({_id:-1}).skip(req.body.sk*1).limit(10)
// })

// RegRoutes1.route('/AllSearchData10').post((req,res)=>{
//     console.log(req.body)
//     Imageupload.find({PsSt:req.body.PsSt,PsGn:req.body.PsGn,PsWrCl1:{$in:req.body.PsWrCl1},PsWrCl2:{$in:req.body.PsWrCl2}},
//         (err,result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             if(result.length > 0){
//                 res.json(result)
//             }else{
//                 res.json('Post not found')
//             }
//         }
//     }).sort({_id:-1}).skip(req.body.sk*1).limit(10)
// })



module.exports = RegRoutes1;






