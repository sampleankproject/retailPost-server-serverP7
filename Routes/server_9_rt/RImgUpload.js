const mongoose = require('mongoose')
const express = require('express')
const multer = require('multer')
const Rupload = require('../../Models/RImgUpload');
const RtImgPlaceUpload = require('../../Models/RtPlaceImgUpload');
const RTregFull = require('../../Models/RTReg_full');
const RImgUpload = express.Router()
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

RImgUpload.route('/RImgUpload').post(upload.array('photo'),(req,res)=>{
    console.log(req.body)
    const num1 = req.body.RPrDtNs;
    var MyDate = new Date();
    // console.log(MyDate)
    const date = MyDate.getDate()+ '/'+(MyDate.getMonth()+1)+'/'+MyDate.getFullYear()
    const MyDateString = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2)  +('0' + MyDate.getDate()).slice(-2);
   
    MyDate.setDate(MyDate.getDate() + (num1-1));              
    const date2 = MyDate.getDate()+ '/'+(MyDate.getMonth()+1)+'/'+MyDate.getFullYear()
    const MyDateStringTwo = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2)  +('0' + MyDate.getDate()).slice(-2);

    
    const Mydate3 = new Date();         // ISO date 1
   
    const Mydate4 = new Date();         // ISO date 2
    Mydate4.setDate(Mydate4.getDate()+(num1-1)) 
    Mydate4.setHours(0,0,0,0)
   

    
    function formatAMPM() {
        var hours = MyDate.getHours();
        var minutes = MyDate.getMinutes();
        // var seconds = MyDate2.getSeconds();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        // console.log(minutes)
        // seconds = seconds < 10 ? '0'+seconds : seconds; 
        // var strTime = hours + ':' + minutes +  ':' + seconds + ' ' + ampm;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
      // Date array with plain using for loop condition
    
      var MyDateString1=[];

      for(let i=0; i<num1; i++){
        var MyDate2 = new Date();
        var MyDateString3
    
        MyDate2.setDate(MyDate2.getDate() + i);
    
        MyDateString3 = ('0' + MyDate2.getDate()).slice(-2) + ('0' + (MyDate2.getMonth()+1)).slice(-2) + MyDate2.getFullYear();
                //  console.log(MyDateString)
                 MyDateString1.push({Dt:MyDateString3})             
                //  console.log(MyDateString1)
    } 
            console.log('Plain date')
            console.log(MyDateString1)

    const id = nanoid();
    const xyz = JSON.parse(req.body.RCo1)
    const xyz2 = JSON.parse(req.body.RCo2)


    if(req.files === null){
        console.log('error uploading')
    }else{
        const PostData = {
            RPsId:id,
            RPsTy1:req.body.RPsTy1,
            RPsTy2:'pst',
            RPsTy3:req.body.RPsTy3,
            PrTy1:req.body.PrTy1,
            PrTy2:req.body.PrTy2,
            PrTy22:req.body.PrTy22,
            PrTy23:req.body.PrTy23,
            PrNm1:req.body.PrNm1,
            PrNm2:req.body.PrNm2,
            PrTy3:req.body.PrTy3,
            PrTy4:req.body.PrTy4,
            PrTy5:req.body.PrTy5,
            PrSz:JSON.parse(req.body.PrSz),
            PrNum:req.body.PrNum,
            PrPtn:req.body.PrPtn,
            PrStb:JSON.parse(req.body.PrStb),
            PrStb1:req.body.PrStb1,
            PrStb2:req.body.PrStb2,
            PrStb3:req.body.PrStb3,
            PrClAry:JSON.parse(req.body.PrClAry),
            PrCl1:req.body.PrCl1,
            PrCl2:req.body.PrCl2,
            PrClCd1:req.body.PrClCd1,
            PrClCd2:req.body.PrClCd2,
            PrBrn:req.body.PrBrn,
            PrId:req.body.PrId,
            PrPrcTy:req.body.PrPrcTy,
            PrPrc1:req.body.PrPrc1,
            PrPrc2:req.body.PrPrc2,
            PrPrc3:req.body.PrPrc3,
            PrPrc4:req.body.PrPrc4,
            RPrPsTm:formatAMPM(),
            RPrDtNs:req.body.RPrDtNs,    
            RPrDts:MyDateString1,
            RPsDt1:date,
            RPsDt2:date2,
            RPsDt3:MyDateString,
            RPsDt4:MyDateStringTwo,           
            RPsDt5:Mydate3,
            RPsDt6:Mydate4,
            RtId:req.body.RtId,
            RCoCd:req.body.RCoCd,
            RNm:req.body.RNm,
            RUNm:req.body.RUNm,
            RBrNm:req.body.RBrNm,
            RImgL:req.body.RImgL,
            RPsSt1:'Live',
            RPsSt2:'NtBlk',
            RPsVrAd:'notVerified',
            RPsImg:[{img0:req.files[0].filename},{img0:req.files[1].filename},{img0:req.files[2].filename},{img0:req.files[3].filename},{img0:req.files[4].filename},{img0:req.files[5].filename},{img0:req.files[6].filename},{img0:req.files[7].filename},{img0:req.files[8].filename},{img0:req.files[9].filename}],
            RPsImgPt:[{img0:req.files[0].path},{img0:req.files[1].path},{img0:req.files[2].path},{img0:req.files[3].path},{img0:req.files[4].path},{img0:req.files[5].path},{img0:req.files[6].path},{img0:req.files[7].path},{img0:req.files[8].path},{img0:req.files[9].path}],
            // RPsImgPt:[{img0:req.files[0].size},{img0:req.files[1].size},{img0:req.files[2].size},{img0:req.files[3].size},{img0:req.files[4].size},{img0:req.files[5].size},{img0:req.files[6].size},{img0:req.files[7].size},{img0:req.files[8].size},{img0:req.files[9].size}],
        
            RCo1:[{latitude:xyz.latitude,longitude:xyz.longitude}],
            RCo2:{type:"Point",coordinates:[xyz2.latitude,xyz2.longitude]},
            RPin:req.body.RPin,
            RHbl:req.body.RHbl,
            RHbl2:req.body.RHbl2,
            RHbl3:req.body.RHbl3,
            RTlk:req.body.RTlk,
            RTlk2:req.body.RTlk2,
            RTlk3:req.body.RTlk3,
            RDst:req.body.RDst,
            RDst2:req.body.RDst2,
            RSt:req.body.RSt,
            RSt2:req.body.RSt2
        
        
        
        
        }
        const PostData2 = {
                RPsId:id,
                RPin:req.body.RPin,
                RHbl:req.body.RHbl,
                RHbl2:req.body.RHbl2,
                RHbl3:req.body.RHbl3,
                RTlk:req.body.RTlk,
                RTlk2:req.body.RTlk2,
                RTlk3:req.body.RTlk3,
                RDst:req.body.RDst,
                RDst2:req.body.RDst2,
                RSt:req.body.RSt,
                RSt2:req.body.RSt2,
                RPsDt4:date2,
                RPsDt5:MyDateStringTwo,
                RPsDt6:Mydate4
        }
        const RImgData = Rupload(PostData)
        RImgData.save()
        .then(response=>{
            console.log(response)
            const AddData = RtImgPlaceUpload(PostData2)
                AddData.save()
                .then(response2=>{
                    console.log('Data is Stored in RtImgUpload,RtImgPlaceUpload')
                    res.json('Data Saved')
                })
                .catch(err=>{
                    console.log(err)
                })
            
        })
        .catch(err=>{
            console.log(err)
        })
    }

})


RImgUpload.route('/RtsearchOne').post((req,res)=>{
    var MyDateA = new Date();
    const MyDateStringA = MyDateA.getFullYear() + ('0' + (MyDateA.getMonth()+1)).slice(-2)  +('0' + MyDateA.getDate()).slice(-2); 
    // console.log(MyDateStringA)
    console.log(req.body)
    Rupload.find({$text:{$search:req.body.searchip},RPsDt4:{$gte:parseInt(MyDateStringA)},RPsSt1:'Live',RPsSt2:'NtBlk'},{score:{$meta:"textScore"}},(err,result)=>{
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
    // .skip(req.body.sk*5).limit(5)
})

RImgUpload.route('/RtsearchTwo').post((req,res)=>{
    var MyDateA = new Date();
    const MyDateStringA = MyDateA.getFullYear() + ('0' + (MyDateA.getMonth()+1)).slice(-2)  +('0' + MyDateA.getDate()).slice(-2); 
    console.log(MyDateStringA)
    console.log(req.body)
    RtImgPlaceUpload.aggregate([{$match:{$text:{$search:req.body.searchip},RPsDt5:{$gte:parseInt(MyDateStringA)}}},{$skip:(req.body.sk*5)},{$limit:5},
    {
        $lookup:{
            from:'RtImageUpload',
            localField:'RPsId',
            foreignField:'RPsId',
            as:'CombinedSearch'
        }
    },
    {$sort:{score:{$meta:"textScore"}}},
    {
        $project:{
            SearchResult:{
                $filter:{
                    input:'$CombinedSearch',
                    as:'searchResult2',
                    cond: {$and:[
                        {$eq:['$$searchResult2.RPsSt1','Live']},
                        {$eq:['$$searchResult2.RPsSt2','NtBlk']},
                        // Empty Array(which does not satisfy cond) should be removed from frontend **********************
                    ]}                

                }
            }
        }
    }

  
]).exec(function(err,result99){
    if(err){
        console.log(err)
    }else{
        

        if(result99.length > 0){
            res.json(result99)
            console.log(result99)
        }else if(result99.length === 0){
            console.log('Data length zero')
            res.json('Data length zero')
        }else{
            console.log('RtSearch Five, Actv not found')
            res.json('RtSearch Five, Actv not found')
        }
        
    }
})
})

// RImgUpload.route('/RtsearchThree').post((req,res)=>{
//     RTregFull.find({$text:{$search:req.body.searchip},RtAcnSt:'Actv'},{score:{$meta:"textScore"}},(err,result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             if(result.length > 0){
//                 res.json(result)
//                 console.log(result)
//             }else{
//                 res.json('RtSearch Three, Actv not found')
//             }
           
//         }
//     }).sort({score:{$meta:"textScore"}}).skip(req.body.sk*5).limit(5)
// })

RImgUpload.route('/RtsearchThree').post((req,res)=>{
    RTregFull.aggregate([{$match:{$text:{$search:req.body.searchip},RtAcnSt:'Actv'}},{$sort:{score:{$meta:"textScore"}}},{$skip:(req.body.sk*5)},{$limit:5},
    {
        $project:{
            
                "_id":"$_id",
                "RtId":"$RtId",
                "RtShNm":"$RtShNm",
                "RtShBrcNm":"$RtShBrcNm",
                "RtUnm":"$RtUnm",
                "RtUsrNm":"$RtUsrNm",
                "RtUsrTy":"$RtUsrTy",
                "RtUsrImg":"$RtUsrImg",
                "RtUsrGnd":"$RtUsrGnd",
                "RtUsrYob1":"$RtUsrYob1",
                "RtUsrYob2":"$RtUsrYob2",
                "RtUsrIdImg":"$RtUsrIdImg",
                "RtUsrIdTy":"$RtUsrIdTy",
                "RtUsrIdNo":"$RtUsrIdNo",
                "RtLgImg1":"$RtLgImg1",
                "RtLgImg2":"$RtLgImg2",
                "RtStrOpLvTy":"$RtStrOpLvTy",
                "RtStrOpLvSt":"$RtStrOpLvSt",
                "RtStrOpD":"$RtStrOpD",
                "RtStrOpN1":"$RtStrOpN1",
                "RtStrOpN2":"$RtStrOpN2",
                "RtStrOpN3":"$RtStrOpN3",
                "RtShIdImg":"$RtShIdImg",
                "RtLcnTy":"$RtLcnTy",
                "RtLcnNo":"$RtLcnNo",
                "RtStrSpl":"$RtStrSpl",
                "RtMlId":"$RtMlId",
                "RtPhn":"$RtPhn",
                "RtCsMlId":"$RtCsMlId",
                "RtCsPhn":"$RtCsPhn",
                "RtTy1":"$RtTy1",
                "RtBrNm":"$RtBrNm",
                "RtTy2":"$RtTy2",
                "RtMnLm":"$RtMnLm",
                "RtSbLm":"$RtSbLm",
                "RtStrDt1":"$RtStrDt1",
                "RtStrDt2":"$RtStrDt2",
                "RtStrDt3":"$RtStrDt3",
                "RtExpDt1":"$RtExpDt1",
                "RtExpDt2":"$RtExpDt2",
                "RtExpDt3":"$RtExpDt3",
                "RtPlnTy":"$RtPlnTy",
                "RtPlnTyNm":"$RtPlnTyNm",
                "RtPlnNm":"$RtPlnNm",
                "RtPlnDys":"$RtPlnDys",
                "RtPlnAmt":"$RtPlnAmt",
                "RtShImg":"$RtShImg",
                "RtShCo":"$RtShCo",
                "RtShCo2":"$RtShCo2",
                "RtShCoCd":"$RtShCoCd",
                "RtShCoLn":"$RtShCoLn",
                "RtPdAmt":"$RtPdAmt",
                "RtPdAmtDt":"$RtPdAmtDt",
                "RtPdAmtTm":"$RtPdAmtTm",
                "RtAcnSt":"$RtAcnSt",
                "RtRnwSt":"$RtRnwSt",
                "RtAcnBlkSt":"$RtAcnBlkSt",
                "RtAdr1":"$RtAdr1",
                "RtAdr2":"$RtAdr2",
                "RtAdr3":"$RtAdr3",
                "RtAdr4":"$RtAdr4",
                "RtAdr5":"$RtAdr5",
                "RtPin":"$RtPin",
                "RtHbl":"$RtHbl",
                "RtHbl2":"$RtHbl2",
                "RtHbl3":"$RtHbl3",
                "RtTlk":"$RtTlk",
                "RtTlk2":"$RtTlk2",
                "RtTlk3":"$RtTlk3",
                "RtDst":"$RtDst",
                "RtDst2":"$RtDst2",
                "RtSt":"$RtSt",
                "RtSt2":"$RtSt2",
                "RtLdMk":"$RtLdMk",
                "RtRefTy":"$RtRefTy",
                "RtRefCd":"$RtRefCd",
                "RtRefCdUsg":"$RtRefCdUsg",
                "RtRegTy":"$RtRegTy",
                "RtRegDt1":"$RtRegDt1",
                "RtRegDt2":"$RtRegDt2",
                "RtRegDt3":"$RtRegDt3",
                "RtSlOrg":"$RtSlOrg",
                "RtSlOrgCd":"$RtSlOrgCd",
                "RtSlId":"$RtSlId",
                "RtSlRegTy":"$RtSlRegTy",
                "RtSlRegSts":"$RtSlRegSts"
                
            
        }
    }

]).exec(function(err,result){
    if(err){
        console.log(err)
    }else{

        if(result.length > 0){
            res.json(result)
            console.log(result)
        }else if(result.length === 0){
            console.log('Data length zero')
            res.json('Data length zero')
        }else{
            console.log('RtSearch Five, Actv not found')
            res.json('RtSearch Five, Actv not found')
        }
    }
})
})




// RImgUpload.route('/RtsearchFour').post((req,res)=>{
//     RTregFull.find({RtUnm:req.body.RtUnm,RtAcnSt:'Actv'},(err,result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             if(result.length > 0){
//                 res.json(result)
//                 console.log(result)
//             }else{
//                 res.json('RtSearch Four, Actv not found')
//             }
           
//         }
//     })
// })


RImgUpload.route('/RtsearchFour').post((req,res)=>{
    RTregFull.aggregate([{$match:{RtUnm:req.body.RtUnm,RtAcnSt:'Actv'}},{$skip:(req.body.sk*5)},{$limit:5},{$sort:{_id:-1}},
    {
        $project:{
            
                "_id":"$_id",
                "RtId":"$RtId",
                "RtShNm":"$RtShNm",
                "RtShBrcNm":"$RtShBrcNm",
                "RtUnm":"$RtUnm",
                "RtUsrNm":"$RtUsrNm",
                "RtUsrTy":"$RtUsrTy",
                "RtUsrImg":"$RtUsrImg",
                "RtUsrGnd":"$RtUsrGnd",
                "RtUsrYob1":"$RtUsrYob1",
                "RtUsrYob2":"$RtUsrYob2",
                "RtUsrIdImg":"$RtUsrIdImg",
                "RtUsrIdTy":"$RtUsrIdTy",
                "RtUsrIdNo":"$RtUsrIdNo",
                "RtLgImg1":"$RtLgImg1",
                "RtLgImg2":"$RtLgImg2",
                "RtStrOpLvTy":"$RtStrOpLvTy",
                "RtStrOpLvSt":"$RtStrOpLvSt",
                "RtStrOpD":"$RtStrOpD",
                "RtStrOpN1":"$RtStrOpN1",
                "RtStrOpN2":"$RtStrOpN2",
                "RtStrOpN3":"$RtStrOpN3",
                "RtShIdImg":"$RtShIdImg",
                "RtLcnTy":"$RtLcnTy",
                "RtLcnNo":"$RtLcnNo",
                "RtStrSpl":"$RtStrSpl",
                "RtMlId":"$RtMlId",
                "RtPhn":"$RtPhn",
                "RtCsMlId":"$RtCsMlId",
                "RtCsPhn":"$RtCsPhn",
                "RtTy1":"$RtTy1",
                "RtBrNm":"$RtBrNm",
                "RtTy2":"$RtTy2",
                "RtMnLm":"$RtMnLm",
                "RtSbLm":"$RtSbLm",
                "RtStrDt1":"$RtStrDt1",
                "RtStrDt2":"$RtStrDt2",
                "RtStrDt3":"$RtStrDt3",
                "RtExpDt1":"$RtExpDt1",
                "RtExpDt2":"$RtExpDt2",
                "RtExpDt3":"$RtExpDt3",
                "RtPlnTy":"$RtPlnTy",
                "RtPlnTyNm":"$RtPlnTyNm",
                "RtPlnNm":"$RtPlnNm",
                "RtPlnDys":"$RtPlnDys",
                "RtPlnAmt":"$RtPlnAmt",
                "RtShImg":"$RtShImg",
                "RtShCo":"$RtShCo",
                "RtShCo2":"$RtShCo2",
                "RtShCoCd":"$RtShCoCd",
                "RtShCoLn":"$RtShCoLn",
                "RtPdAmt":"$RtPdAmt",
                "RtPdAmtDt":"$RtPdAmtDt",
                "RtPdAmtTm":"$RtPdAmtTm",
                "RtAcnSt":"$RtAcnSt",
                "RtRnwSt":"$RtRnwSt",
                "RtAcnBlkSt":"$RtAcnBlkSt",
                "RtAdr1":"$RtAdr1",
                "RtAdr2":"$RtAdr2",
                "RtAdr3":"$RtAdr3",
                "RtAdr4":"$RtAdr4",
                "RtAdr5":"$RtAdr5",
                "RtPin":"$RtPin",
                "RtHbl":"$RtHbl",
                "RtHbl2":"$RtHbl2",
                "RtHbl3":"$RtHbl3",
                "RtTlk":"$RtTlk",
                "RtTlk2":"$RtTlk2",
                "RtTlk3":"$RtTlk3",
                "RtDst":"$RtDst",
                "RtDst2":"$RtDst2",
                "RtSt":"$RtSt",
                "RtSt2":"$RtSt2",
                "RtLdMk":"$RtLdMk",
                "RtRefTy":"$RtRefTy",
                "RtRefCd":"$RtRefCd",
                "RtRefCdUsg":"$RtRefCdUsg",
                "RtRegTy":"$RtRegTy",
                "RtRegDt1":"$RtRegDt1",
                "RtRegDt2":"$RtRegDt2",
                "RtRegDt3":"$RtRegDt3",
                "RtSlOrg":"$RtSlOrg",
                "RtSlOrgCd":"$RtSlOrgCd",
                "RtSlId":"$RtSlId",
                "RtSlRegTy":"$RtSlRegTy",
                "RtSlRegSts":"$RtSlRegSts"
                
            
        }
    }

]).exec(function(err,result){
    if(err){
        console.log(err)
    }else{
        if(result.length > 0){
            res.json(result)
            console.log(result)
        }else if(result.length === 0){
            console.log('Data length zero')
            res.json('Data length zero')
        }else{
            console.log('RtSearch Five, Actv not found')
            res.json('RtSearch Five, Actv not found')
        }

      
    }
})
})

// RImgUpload.route('/RtsearchFive').post((req,res)=>{
//     console.log(req.body)
//     RTregFull.find({RtPlnTyNm:{$elemMatch:{Nm:req.body.Type}},RtAcnSt:'Actv',RtShCoCd:req.body.Dst},(err,result)=>{
      
//         if(err){
//             console.log(err)
//         }else{
//             console.log(result)
//             if(result.length > 0){
//                 res.json(result)
//                 console.log(result)
//             }else if(result.length === 0){
//                 console.log('Data length zero')
//                 res.json('Data length zero')
//             }else{
//                 console.log('RtSearch Five, Actv not found')
//                 res.json('RtSearch Five, Actv not found')
//             }
           
//         }
//     }).skip(req.body.sk*5).limit(5)
// })


RImgUpload.route('/RtsearchFive').post((req,res)=>{
    console.log(req.body)
    RTregFull.aggregate([{$match:{RtPlnTyNm:{$elemMatch:{Nm:req.body.Type}},RtAcnSt:'Actv',RtShCoCd:req.body.Dst}},{$skip:(req.body.sk*5)},{$limit:5},{$sort:{_id:-1}},
    {
        $project:{
            
                "_id":"$_id",
                "RtId":"$RtId",
                "RtShNm":"$RtShNm",
                "RtShBrcNm":"$RtShBrcNm",
                "RtUnm":"$RtUnm",
                "RtUsrNm":"$RtUsrNm",
                "RtUsrTy":"$RtUsrTy",
                "RtUsrImg":"$RtUsrImg",
                "RtUsrGnd":"$RtUsrGnd",
                "RtUsrYob1":"$RtUsrYob1",
                "RtUsrYob2":"$RtUsrYob2",
                "RtUsrIdImg":"$RtUsrIdImg",
                "RtUsrIdTy":"$RtUsrIdTy",
                "RtUsrIdNo":"$RtUsrIdNo",
                "RtLgImg1":"$RtLgImg1",
                "RtLgImg2":"$RtLgImg2",
                "RtStrOpLvTy":"$RtStrOpLvTy",
                "RtStrOpLvSt":"$RtStrOpLvSt",
                "RtStrOpD":"$RtStrOpD",
                "RtStrOpN1":"$RtStrOpN1",
                "RtStrOpN2":"$RtStrOpN2",
                "RtStrOpN3":"$RtStrOpN3",
                "RtShIdImg":"$RtShIdImg",
                "RtLcnTy":"$RtLcnTy",
                "RtLcnNo":"$RtLcnNo",
                "RtStrSpl":"$RtStrSpl",
                "RtMlId":"$RtMlId",
                "RtPhn":"$RtPhn",
                "RtCsMlId":"$RtCsMlId",
                "RtCsPhn":"$RtCsPhn",
                "RtTy1":"$RtTy1",
                "RtBrNm":"$RtBrNm",
                "RtTy2":"$RtTy2",
                "RtMnLm":"$RtMnLm",
                "RtSbLm":"$RtSbLm",
                "RtStrDt1":"$RtStrDt1",
                "RtStrDt2":"$RtStrDt2",
                "RtStrDt3":"$RtStrDt3",
                "RtExpDt1":"$RtExpDt1",
                "RtExpDt2":"$RtExpDt2",
                "RtExpDt3":"$RtExpDt3",
                "RtPlnTy":"$RtPlnTy",
                "RtPlnTyNm":"$RtPlnTyNm",
                "RtPlnNm":"$RtPlnNm",
                "RtPlnDys":"$RtPlnDys",
                "RtPlnAmt":"$RtPlnAmt",
                "RtShImg":"$RtShImg",
                "RtShCo":"$RtShCo",
                "RtShCo2":"$RtShCo2",
                "RtShCoCd":"$RtShCoCd",
                "RtShCoLn":"$RtShCoLn",
                "RtPdAmt":"$RtPdAmt",
                "RtPdAmtDt":"$RtPdAmtDt",
                "RtPdAmtTm":"$RtPdAmtTm",
                "RtAcnSt":"$RtAcnSt",
                "RtRnwSt":"$RtRnwSt",
                "RtAcnBlkSt":"$RtAcnBlkSt",
                "RtAdr1":"$RtAdr1",
                "RtAdr2":"$RtAdr2",
                "RtAdr3":"$RtAdr3",
                "RtAdr4":"$RtAdr4",
                "RtAdr5":"$RtAdr5",
                "RtPin":"$RtPin",
                "RtHbl":"$RtHbl",
                "RtHbl2":"$RtHbl2",
                "RtHbl3":"$RtHbl3",
                "RtTlk":"$RtTlk",
                "RtTlk2":"$RtTlk2",
                "RtTlk3":"$RtTlk3",
                "RtDst":"$RtDst",
                "RtDst2":"$RtDst2",
                "RtSt":"$RtSt",
                "RtSt2":"$RtSt2",
                "RtLdMk":"$RtLdMk",
                "RtRefTy":"$RtRefTy",
                "RtRefCd":"$RtRefCd",
                "RtRefCdUsg":"$RtRefCdUsg",
                "RtRegTy":"$RtRegTy",
                "RtRegDt1":"$RtRegDt1",
                "RtRegDt2":"$RtRegDt2",
                "RtRegDt3":"$RtRegDt3",
                "RtSlOrg":"$RtSlOrg",
                "RtSlOrgCd":"$RtSlOrgCd",
                "RtSlId":"$RtSlId",
                "RtSlRegTy":"$RtSlRegTy",
                "RtSlRegSts":"$RtSlRegSts"
                
            
        }
    }

]).exec(function(err,result){
    if(err){
        console.log(err)
    }else{
        // console.log(result)
        if(result.length > 0){
            res.json(result)
            // console.log(result)
        }else if(result.length === 0){
            console.log('Data length zero')
            res.json('Data length zero')
        }else{
            console.log('RtSearch Five, Actv not found')
            res.json('RtSearch Five, Actv not found')
        }
       
    }
})
})


RImgUpload.route('/RtsearchSixOne').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrTy1:req.body.type,RPsSt1:"Live",RPsSt2:"NtBlk",RPin:req.body.pin},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch Six, Actv not found')
                res.json('RtSearch Six, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})

RImgUpload.route('/RtsearchSixTwo').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrTy1:req.body.type,PrTy2:req.body.gender, RPsSt1:"Live",RPsSt2:"NtBlk",RPin:req.body.pin},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch Six, Actv not found')
                res.json('RtSearch Six, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})

RImgUpload.route('/RtsearchSixThree').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrTy1:req.body.type,PrTy2:req.body.gender,PrNm1:req.body.weartype2, RPsSt1:"Live",RPsSt2:"NtBlk",RPin:req.body.pin},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch Six, Actv not found')
                res.json('RtSearch Six, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})

RImgUpload.route('/RtsearchSixFour').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrTy1:req.body.type,PrTy2:req.body.gender,PrNm1:req.body.weartype2,$or:[{PrCl1:req.body.color1},{PrCl2:req.body.color1}], RPsSt1:"Live",RPsSt2:"NtBlk",RPin:req.body.pin},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch Six, Actv not found')
                res.json('RtSearch Six, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})

RImgUpload.route('/RtsearchSevenOne').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrTy1:req.body.type,RPsSt1:"Live",RPsSt2:"NtBlk",RDst:req.body.dst,RSt:req.body.st},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch SevenOne, Actv not found')
                res.json('RtSearch SevenOne, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})

RImgUpload.route('/RtsearchSevenTwo').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrTy1:req.body.type,PrTy2:req.body.gender, RPsSt1:"Live",RPsSt2:"NtBlk",RDst:req.body.dst,RSt:req.body.st},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch SevenTwo, Actv not found')
                res.json('RtSearch SevenTwo, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})

RImgUpload.route('/RtsearchSevenThree').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrTy1:req.body.type,PrTy2:req.body.gender,PrNm1:req.body.weartype2, RPsSt1:"Live",RPsSt2:"NtBlk",RDst:req.body.dst,RSt:req.body.st},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch SevenThree, Actv not found')
                res.json('RtSearch SevenThree, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})

RImgUpload.route('/RtsearchSevenFour').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrTy1:req.body.type,PrTy2:req.body.gender,PrNm1:req.body.weartype2,$or:[{PrCl1:req.body.color1},{PrCl2:req.body.color1}], RPsSt1:"Live",RPsSt2:"NtBlk",RDst:req.body.dst,RSt:req.body.st},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch SevenFour, Actv not found')
                res.json('RtSearch SevenFour, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})

RImgUpload.route('/RtsearchEightOne').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrTy1:req.body.type,RPsSt1:"Live",RPsSt2:"NtBlk",RCoCd:req.body.Dst},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            // console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result.length)
                // console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch EightOne, Actv not found')
                res.json('RtSearch EightOne, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})
RImgUpload.route('/RtsearchEightTwo').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrTy1:req.body.type,PrTy2:req.body.gender, RPsSt1:"Live",RPsSt2:"NtBlk",RCoCd:req.body.Dst},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch EightTwo, Actv not found')
                res.json('RtSearch EightTwo, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})

RImgUpload.route('/RtsearchEightThree').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrTy1:req.body.type,PrTy2:req.body.gender,PrNm1:req.body.weartype2, RPsSt1:"Live",RPsSt2:"NtBlk",RCoCd:req.body.Dst},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch EightThree, Actv not found')
                res.json('RtSearch EightThree, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})

RImgUpload.route('/RtsearchEightFour').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrTy1:req.body.type,PrTy2:req.body.gender,PrNm1:req.body.weartype2,$or:[{PrCl1:req.body.color1},{PrCl2:req.body.color1}], RPsSt1:"Live",RPsSt2:"NtBlk",RCoCd:req.body.Dst},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch EightFour, Actv not found')
                res.json('RtSearch EightFour, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})

RImgUpload.route('/RtsearchNineOne').post((req,res)=>{
    console.log(req.body)
    Rupload.find({RPsSt1:"Live",RPsSt2:"NtBlk",PrPrc4:{$gte:req.body.Dstnt1,$lte:req.body.Dstnt2}},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch Nine, Actv not found')
                res.json('RtSearch Nine, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})


RImgUpload.route('/RtsearchElevenOne').post((req,res)=>{
    console.log(req.body)
    Rupload.find({PrPrc4:{$gte:req.body.Dstnt1,$lte:req.body.Dstnt2},RPsSt1:"Live",RPsSt2:"NtBlk",RCoCd:req.body.Dst},(err,result)=>{

        if(err){
            console.log(err)
        }else{
            // console.log(result)
            if(result.length > 0){
                res.json(result)
                console.log(result.length)
                // console.log(result)
            }else if(result.length === 0){
                console.log('Data length zero')
                res.json('Data length zero')
            }else{
                console.log('RtSearch ElevenOne, Actv not found')
                res.json('RtSearch ElevenOne, Actv not found')
            }
           
        }
    }).skip(req.body.sk*5).limit(5).sort({"_id":-1})
})

module.exports = RImgUpload;





