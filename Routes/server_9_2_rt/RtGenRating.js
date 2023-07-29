const express = require('express')
const RtGenRating = express.Router()

const RTGenCode = require('../../Models/RtGenCode');
const RTRating = require('../../Models/RtRating');
const RtRegFull = require('../../Models/RTReg_full');

RtGenRating.route('/RtCodeGenerate').post((req,res)=>{
    var MyDate = new Date();
    const MyDateStringOne = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2)  +('0' + MyDate.getDate()).slice(-2);
    const obj = {
        RtId:req.body.RtId,
        RtUNm:req.body.RtUNm,
        RtCd:req.body.RtCd,
        RtSts:req.body.RtSts,
        RtDt1:MyDateStringOne,
        RtDt2:MyDate
    }
    const AddCode = RTGenCode(obj)
        AddCode.save()
        .then(response=>{
            console.log(response)
            res.json(req.body.RtCd)
        })
        .catch(err=>{
            console.log(err)
        })
})

RtGenRating.route('/RtCodeValidate').post((req,res)=>{
    console.log(req.body)
    RTGenCode.find({RtUNm:req.body.RtUNm,RtCd:req.body.RtCd},(err,result20)=>{
        if(err){
            console.log(err)
        }else{
            if(result20.length > 0){
                if(result20[0].RtSts==='sent'){
                    RtRegFull.find({RtUnm:req.body.RtUNm},(err,result21)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log('result21')
                            console.log(result21)
                            const objct = {
                                strNm:result21[0].RtShNm,
                                strBrn:result21[0].RtShBrcNm

                            }
                            res.json(objct)
                        }

                    })

                    // res.json('ok')
                    console.log(result20[0])
                }else{
                    res.json('Already used  or not Found')
                    console.log('Already used  or not Found')
                }
            }else{
                    res.json('Already used  or not Found')
                    console.log('Already used  or not Found')
            }
        }
    })
})

RtGenRating.route('/RtRating').post((req,res)=>{

    console.log(req.body)
    RtRegFull.find({RtUnm:req.body.RtUNm},(err,result10)=>{
        if(err){
            console.log(err)
        }else{
           
            if(result10.length > 0){
                
                var MyDate = new Date();
                const MyDateStringOne = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2)  +('0' + MyDate.getDate()).slice(-2);

                const obj1 = {
                    RtId:result10[0].RtId,
                    UsrId:req.body.UsrId,
                    RtUNm:req.body.RtUNm,
                    RtRtng1:req.body.RtRtng1,
                    RtRtng2:req.body.RtRtng2,
                    RtRtng3:req.body.RtRtng3,
                    RtRtng4:req.body.RtRtng4,
                    RtDt1:MyDateStringOne,
                    RtDt2:MyDate
                }
                RTRating.find({RtId:result10[0].RtId,UsrId:req.body.UsrId},(err,result40)=>{
                    console.log('result40')
                    console.log(result40)
                    if(err){
                        console.log(err)
                    }else{
                        if(result40.length === 0){
                            RTGenCode.findOneAndUpdate({RtId:result10[0].RtId,RtCd:req.body.RtCd,RtSts:'sent'},
                            {
                                $set:{
                                    RtSts:'Submitted'
                                }
                            },                    
                            (err,result30)=>{
                                if(err){
                                    console.log(err)
                                    res.json('not ok')
                                }else{
                                   
                                    console.log(result30)
                                    if(result30 != null){
                                        const DataAdd = RTRating(obj1)
                                        DataAdd.save()
                                        .then(response=>{
                                            res.json('yes')
                                        })
                                        .catch(err=>{
                                            console.log(err)
                                        })
                                    }else{
                                        console.log('not ok')
                                        res.json('not ok')
                                    }
                                   
                                }
                            
                        })

                        }else{
                            console.log('result.length > 0')
                            res.json('not ok')
                        }

                    }
                })
               
            }else{
                console.log('Not found')
                res.json('not ok')
            }
        }
    })
})



RtGenRating.route('/getRtRating').post((req,res)=>{
    RTRating.aggregate([
        {
            $facet:
            {
            "TtlPrm":[
                {$match:{'RtId':req.body.RtId,'RtRtng1':'Premium'}},
                // {$count:'countOne'},
               
            ],
            "TtlBst":[
                {$match:{'RtId':req.body.RtId,'RtRtng1':'Best'}},
                // {$count:'countOne'},
               
            ],
            "TtlNrm":[
                {$match:{'RtId':req.body.RtId,'RtRtng1':'Normal'}},
                // {$count:'countOne'},
               
            ],


            "TtlPrmBst":[
                {$match:{'RtId':req.body.RtId,'RtRtng1':'Premium','RtRtng2':'Best'}},
                // {$count:'countOne'},
               
            ],
            "TtlBstBst":[
                {$match:{'RtId':req.body.RtId,'RtRtng1':'Best','RtRtng2':'Best'}},
                // {$count:'countOne'},
               
            ],
            "TtlNrmBst":[
                {$match:{'RtId':req.body.RtId,'RtRtng1':'Normal','RtRtng2':'Best'}},
                // {$count:'countOne'},
               
            ],


            "TtlPrmNrm":[
                {$match:{'RtId':req.body.RtId,'RtRtng1':'Premium','RtRtng2':'Normal'}},
                // {$count:'countOne'},
               
            ],
            "TtlBstNrm":[
                {$match:{'RtId':req.body.RtId,'RtRtng1':'Best','RtRtng2':'Normal'}},
                // {$count:'countOne'},
               
            ],
            "TtlNrmNrm":[
                {$match:{'RtId':req.body.RtId,'RtRtng1':'Normal','RtRtng2':'Normal'}},
                // {$count:'countOne'},
               
            ],


            "TtlPrmHig":[
                {$match:{'RtId':req.body.RtId,'RtRtng1':'Premium','RtRtng2':'High'}},
                // {$count:'countOne'},
               
            ],
            "TtlBstHig":[
                {$match:{'RtId':req.body.RtId,'RtRtng1':'Best','RtRtng2':'High'}},
                // {$count:'countOne'},
               
            ],
            "TtlNrmHig":[
                {$match:{'RtId':req.body.RtId,'RtRtng1':'Normal','RtRtng2':'High'}},
                // {$count:'countOne'},
               
            ],
            "TtlRtng1":[
                {$match:{'RtId':req.body.RtId,'RtRtng4':1}},
                // {$count:'countOne'},
               
            ],
            "TtlRtng2":[
                {$match:{'RtId':req.body.RtId,'RtRtng4':2}},
                // {$count:'countOne'},
               
            ],
            "TtlRtng3":[
                {$match:{'RtId':req.body.RtId,'RtRtng4':3}},
                // {$count:'countOne'},
               
            ],
            "TtlRtng4":[
                {$match:{'RtId':req.body.RtId,'RtRtng4':4}},
                // {$count:'countOne'},
               
            ],
            "TtlRtng5":[
                {$match:{'RtId':req.body.RtId,'RtRtng4':5}},
                // {$count:'countOne'},
               
            ],
            
         "total":[{$match:{

            RtId:req.body.RtId

         }},{
             $group:{
                 _id:{name:"$RtId"},
                 
                 totalR:{$sum:"$RtRtng4"},
                 count:{$sum:1}
             }

         }]

      
    }},

    {$project:{
        'TtlPrm':{$size:'$TtlPrm'},
        'TtlBst':{$size:'$TtlBst'},
        'TtlNrm':{$size:'$TtlNrm'},
        'TtlPrmBst':{$size:'$TtlPrmBst'},
        'TtlBstBst':{$size:'$TtlBstBst'},
        'TtlNrmBst':{$size:'$TtlNrmBst'},
        'TtlPrmNrm':{$size:'$TtlPrmNrm'},
        'TtlBstNrm':{$size:'$TtlBstNrm'},
        'TtlNrmNrm':{$size:'$TtlNrmNrm'},
        'TtlPrmHig':{$size:'$TtlPrmHig'},
        'TtlBstHig':{$size:'$TtlBstHig'},
        'TtlNrmHig':{$size:'$TtlNrmHig'},
        'TtlRtng1':{$size:'$TtlRtng1'},
        'TtlRtng2':{$size:'$TtlRtng2'},
        'TtlRtng3':{$size:'$TtlRtng3'},
        'TtlRtng4':{$size:'$TtlRtng4'},
        'TtlRtng5':{$size:'$TtlRtng5'},
        'ttlRtng':'$total.totalR',
        'ttlCnt':'$total.count'
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


module.exports = RtGenRating;






