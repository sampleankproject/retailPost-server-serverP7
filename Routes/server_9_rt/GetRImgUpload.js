const express = require('express')
const MemberGet = express.Router()

const Rupload = require('../../Models/RImgUpload');
const RTlike = require('../../Models/RtLike');
const RTregFull = require('../../Models/RTReg_full');
const RTfollow = require('../../Models/RtFollow');

const MyDate = new Date()
// const MyDateString = ('0' + MyDate.getDate()).slice(-2) + ('0' + (MyDate.getMonth()+1)).slice(-2) + MyDate.getFullYear();

    const MyDateString = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2)  +('0' + MyDate.getDate()).slice(-2);
    // const abc = parseInt(MyDateString)

MemberGet.route('/getRImageData').post((req,res)=>{
    console.log(req.body)
    console.log(req.query)
    console.log(MyDateString)
    const {offset} = req.query
    const skip = 5*parseInt(offset)
    const limit = 5
    // console.log(offset)
    // console.log('mystring')
    // console.log(MyDateString)
    // Rupload.aggregate([{$match:{RPrDts:{$elemMatch:{Dt:MyDateString}}}}],(err,result)=>{
        Rupload.aggregate([{$match:{RPsDt4:{$gte:parseInt(MyDateString)},RCoCd:req.body.RCoCd}}, {$sort:{_id:-1}},{$skip:skip},{$limit:limit},{
            // Rupload.aggregate([{$match:{RPsDt4:{$gte:parseInt(MyDateString)},RCoCd:req.body.RCoCd}},{$sort:{_id:-1}},{$skip:skip},{$limit:limit},{   
        $lookup:{
                from:'RtRegFull',
                localField:'RtId',
                foreignField:'RtId',
                as:'CombinedRtDetails'
            }},
            {
                $lookup:{
                    from:'RtLike',
                    localField:'RPsId',
                    foreignField:'RPsId',
                    as:'CombinedRtLikes'

                }
            },
            {
                $project:{
                    lkcount:{$size:"$CombinedRtLikes"},
                    // RtDt:'$CombinedRtDetails',
                    RtDtRtShNm:'$CombinedRtDetails.RtShNm',
                    RtDtRtLgImg2:'$CombinedRtDetails.RtLgImg2',
                    RtDtRtUnm:'$CombinedRtDetails.RtUnm',
                    RtDtRtShBrcNm:'$CombinedRtDetails.RtShBrcNm',
                    RtDtRtDst:'$CombinedRtDetails.RtDst',
   

                    RPsId:'$RPsId',
                    RPsTy1:'$RPsTy1',
                    RPsTy2:'$RPsTy2',
                    RPsTy3:'$RPsTy3',
                    PrTy1:'$PrTy1',
                    PrTy2:'$PrTy2',     // this field is also indicate Gender
                    PrNm1:'$PrNm1',
                    PrNm2:'$PrNm2',
                    PrTy3:'$PrTy3',     // this field is also indicate Silk/cotton
                    PrTy4:'$PrTy4',     // this field is indicate Size
                    PrTy5:'$PrTy5', 
                    PrSz:'$PrSz',
                    PrNum:'$PrNum',
                    PrPtn:'$PrPtn',
                    PrStb:'$PrStb',
                    PrCl1:'$PrCl1',
                    PrCl2:'$PrCl2',
                    PrClCd1:'$PrClCd1',
                    PrClCd2:'$PrClCd2',
                    PrId:'$PrIdPrId',
                    PrPrcTy:'$PrPrcTy',
                    PrPrc1:'$PrPrc1',
                    PrPrc2:'$PrPrc2',
                    PrPrc3:'$PrPrc3',
                    PrPrc4:'$PrPrc4',
                    RPrPsTm:'$RPrPsTm',
                    RPrDtNs:'$RPrDtNs',
                    RPrDts:'$RPrDts',
                    RPsDt1:'$RPsDt1',
                    RPsDt2:'$RPsDt2',
                    RPsDt3:'$RPsDt3',
                    RPsDt4:'$RPsDt4',
                    RPsDt5:'$RPsDt5',
                    RPsDt6:'$RPsDt6',
                    RtId:'$RtId',
                    RCoCd:'$RCoCd',
                    RCo1:'$RCo1',
                    RNm:'$RNm',
                    RUNm:'$RUNm',
                    RBrNm:'$RBrNm',
                    RImgL:'$RImgL',
                    RPsSt1:'$RPsSt1',
                    RPsSt2:'$RPsSt2',
                    RPsVrAd:'$RPsVrAd',
                    RPsImg:'$RPsImg',
                    RPsImgPt:'$RPsImgPt'
                }
            }
        ]).exec((err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(result.length)
                res.json(result)
            }
        })
})

MemberGet.route('/findRImgOne').post((req,res)=>{
    Rupload.findOne({RPsId:req.body.RPsId},(err,result)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            
            if(result != null){
                // console.log(result)
                res.json(result)
               
            }else{
                console.log('Not found findRImgOne')
                res.json('Not found findRImgOne')
            }
            
        }
    })
})

MemberGet.route('/RtFlwPost').post((req,res)=>{
    console.log(req.body)
    const skip = 5*parseInt(req.body.num)
    const limit = 5
    RTfollow.find({UsrId:req.body.UsrId},{RtId:1,_id:0},(err,result)=>{
        
        if(err){
            console.log(err)
        }else{
            console.log(result) 
            // res.json(result)
            const arr=result.map(item=>item.RtId)
            console.log(arr)
            Rupload.aggregate([{$match:{RPsDt4:{$gte:parseInt(MyDateString)},RtId:{$in:arr}}}, {$sort:{_id:-1}},{$skip:skip},{$limit:limit},
            // Rupload.aggregate([{$match:{PsCnt:'country',PsBGpId:{$in:arr}}},{$sort:{_id:-1}},{$skip:skip},{$limit:limit},
            {
                $lookup:{
                    from:'RtRegFull',
                    localField:'RtId',
                    foreignField:'RtId',
                    as:'CombinedRtDetails'
                }},
                {
                    $lookup:{
                        from:'RtLike',
                        localField:'RPsId',
                        foreignField:'RPsId',
                        as:'CombinedRtLikes'
    
                    }
                },
                {
                    $project:{
                        lkcount:{$size:"$CombinedRtLikes"},
                        // RtDt:'$CombinedRtDetails',

                        RtDtRtShNm:'$CombinedRtDetails.RtShNm',
                        RtDtRtLgImg2:'$CombinedRtDetails.RtLgImg2',
                        RtDtRtUnm:'$CombinedRtDetails.RtUnm',
                        RtDtRtShBrcNm:'$CombinedRtDetails.RtShBrcNm',
                        RtDtRtDst:'$CombinedRtDetails.RtDst',
    
                        RPsId:'$RPsId',
                        RPsTy1:'$RPsTy1',
                        RPsTy2:'RPsTy2',
                        RPsTy3:'RPsTy3',
                        PrTy1:'$PrTy1',
                        PrTy2:'$PrTy2',     // this field is also indicate Gender
                        PrNm1:'$PrNm1',
                        PrNm2:'$PrNm2',
                        PrTy3:'$PrTy3',     // this field is also indicate Silk/cotton
                        PrTy4:'$PrTy4',     // this field is indicate Size
                        PrTy5:'$PrTy5',
                        PrSz:'$PrSz',
                        PrNum:'$PrNum',
                        PrPtn:'$PrPtn',
                        PrStb:'$PrStb',
                        PrCl1:'$PrCl1',
                        PrCl2:'$PrCl2',
                        PrClCd1:'$PrClCd1',
                        PrClCd2:'$PrClCd2',
                        PrId:'$PrIdPrId',
                        PrPrcTy:'$PrPrcTy',
                        PrPrc1:'$PrPrc1',
                        PrPrc2:'$PrPrc2',
                        PrPrc3:'$PrPrc3',
                        PrPrc4:'$PrPrc4',
                        RPrPsTm:'$RPrPsTm',
                        RPrDtNs:'$RPrDtNs',
                        RPrDts:'$RPrDts',
                        RPsDt1:'$RPsDt1',
                        RPsDt2:'$RPsDt2',
                        RPsDt3:'$RPsDt3',
                        RPsDt4:'$RPsDt4',
                        RPsDt5:'$RPsDt5',
                        RPsDt6:'$RPsDt6',
                        RtId:'$RtId',
                        RCoCd:'$RCoCd',
                        RNm:'$RNm',
                        RUNm:'$RUNm',
                        RBrNm:'$RBrNm',
                        RImgL:'$RImgL',
                        RPsSt1:'$RPsSt1',
                        RPsSt2:'$RPsSt2',
                        RPsVrAd:'$RPsVrAd',
                        RPsImg:'$RPsImg',
                        RPsImgPt:'$RPsImgPt'
                    }
                }

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


MemberGet.route('/getRTPosts').post((req,res)=>{
    const skip = 5*parseInt(req.body.num)
    const limit = 5
    console.log('mystring')
    console.log(MyDateString)
    // Rupload.aggregate([{$match:{RPrDts:{$elemMatch:{Dt:MyDateString}}}}],(err,result)=>{
        Rupload.aggregate([{$match:{RPsDt4:{$gte:parseInt(MyDateString)},RtId:req.body.RtId}}, {$sort:{_id:-1}},{$skip:skip},{$limit:limit},{
            $lookup:{
                from:'RtRegFull',
                localField:'RtId',
                foreignField:'RtId',
                as:'CombinedRtDetails'
            }},
            {
                $lookup:{
                    from:'RtLike',
                    localField:'RPsId',
                    foreignField:'RPsId',
                    as:'CombinedRtLikes'

                }
            },
            {
                $project:{
                    lkcount:{$size:"$CombinedRtLikes"},
                    // RtDt:'$CombinedRtDetails',
                    RtDtRtShNm:'$CombinedRtDetails.RtShNm',
                    RtDtRtLgImg2:'$CombinedRtDetails.RtLgImg2',
                    RtDtRtUnm:'$CombinedRtDetails.RtUnm',
                    RtDtRtShBrcNm:'$CombinedRtDetails.RtShBrcNm',
                    RtDtRtDst:'$CombinedRtDetails.RtDst',


                    RPsId:'$RPsId',
                    RPsTy1:'$RPsTy1',
                    RPsTy2:'RPsTy2',
                    RPsTy3:'RPsTy3',
                    PrTy1:'$PrTy1',
                    PrTy2:'$PrTy2',     // this field is also indicate Gender
                    PrNm1:'$PrNm1',
                    PrNm2:'$PrNm2',
                    PrTy3:'$PrTy3',     // this field is also indicate Silk/cotton
                    PrTy4:'$PrTy4',     // this field is indicate Size
                    PrTy5:'$PrTy5',
                    PrSz:'$PrSz',
                    PrNum:'$PrNum',
                    PrPtn:'$PrPtn',
                    PrStb:'$PrStb',
                    PrCl1:'$PrCl1',
                    PrCl2:'$PrCl2',
                    PrClCd1:'$PrClCd1',
                    PrClCd2:'$PrClCd2',
                    PrId:'$PrIdPrId',
                    PrPrcTy:'$PrPrcTy',
                    PrPrc1:'$PrPrc1',
                    PrPrc2:'$PrPrc2',
                    PrPrc3:'$PrPrc3',
                    PrPrc4:'$PrPrc4',
                    RPrPsTm:'$RPrPsTm',
                    RPrDtNs:'$RPrDtNs',
                    RPrDts:'$RPrDts',
                    RPsDt1:'$RPsDt1',
                    RPsDt2:'$RPsDt2',
                    RPsDt3:'$RPsDt3',
                    RPsDt4:'$RPsDt4',
                    RPsDt5:'$RPsDt5',
                    RPsDt6:'$RPsDt6',
                    RtId:'$RtId',
                    RCoCd:'$RCoCd',
                    RNm:'$RNm',
                    RUNm:'$RUNm',
                    RBrNm:'$RBrNm',
                    RImgL:'$RImgL',
                    RPsSt1:'$RPsSt1',
                    RPsSt2:'$RPsSt2',
                    RPsVrAd:'$RPsVrAd',
                    RPsImg:'$RPsImg',
                    RPsImgPt:'$RPsImgPt'
                }
            }
        ]).exec((err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json(result)
            }
        })
})

module.exports = MemberGet;