const express = require('express')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const {nanoid} = require('nanoid')
const {customAlphabet} = require('nanoid/non-secure');
const SltReg = express.Router()

const SLTReg = require('../../Models/SltReg');
const SltAccty = require('../../Models/SltAccTy');
const SltAccty2 = require('../../Models/SltAccTy2');
const orgreg = require('../../Models/OrgReg');
const RtInireq = require('../../Models/RtIniReq');
const SysAdmReg = require('../../Models/SysAdmReg');
const Imageupload = require('../../Models/upload');
const Rupload = require('../../Models/RImgUpload');
const RTregFull = require('../../Models/RTReg_full');
const registerFull = require('../../Models/reg_full');
const GroupCreate = require('../../Models/groupCreate');
const PrimgUpload = require('../../Models/PrImgUpload');
const PrimgUploadTwo = require('../../Models/PrImgUploadTwo')
const PrimgUploadThree = require('../../Models/PrImgUploadThree')
const PrimgUploadFour = require('../../Models/PrImgUploadFour')

const SesNum = require('../../Models/SesNum')
const SesTyp = require('../../Models/SesTy')
const SesLst = require('../../Models/SesList')


const nan1 = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',10)
const storageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./images");
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+nan1()+file.originalname);
    },
});
const upload = multer({storage:storageEngine});

SltReg.route('/AddSltReg').post(upload.single('photo1'),(req,res)=>{
    const id = nanoid()
    var MyDate = new Date();
    const date = MyDate.getDate()+ '/'+(MyDate.getMonth()+1)+'/'+MyDate.getFullYear()
    const objData = {
            SltId:id,
            SltUNm:req.body.SltUNm,
            SltPwd:req.body.SltPwd,
            SltFNm:req.body.SltFNm,
            SltLNm:req.body.SltLNm,
            SltGnd:req.body.SltGnd,
            SltDob:req.body.SltDob,
            SltOrgNm:req.body.SltOrgNm,
            SltOrgId:req.body.SltOrgId,
            SltIdTy:req.body.SltIdTy,
            SltIdNo:req.body.SltIdNo,
            SltPh:req.body.SltPh,
            SltEml:req.body.SltEml,
            SltImg:req.file.filename,
            SltAddr:req.body.SltAddr,
            SltRegDt:date,
            SltAccTy:req.body.SltAccTy
    }

    const SltReg = SLTReg(objData)
    SltReg.save()
    .then(response=>{
        console.log(response)
        res.json('Data saved in SltReg')
    })
    .catch(err=>{
        console.log(err)
        res.json(err)
    })
})

const nan3 = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',10)
const storageEngine3 = multer.diskStorage({
    destination:(req,files,cb)=>{
        cb(null,"./PrImages");
    },
    filename:(req,files,cb) =>{
        cb(null,Date.now()+nan3()+files.originalname);
    },
});
const upload3 = multer({storage:storageEngine3});

SltReg.route('/CrtImg').post(upload3.array('photo4'),(req,res)=>{  
    const abc = nanoid()
    console.log(req.body)
    console.log(req.files)
    const obj = {
        Pr1Nm:req.body.Pr1Nm,
        Pr1Id:abc,
        Pr1Pst:'',
        PrDt1:'',
        PrDt2:'',
        PrDt3:'',
        Cnt:req.body.Cnt,
        St:req.body.St,
        Ct:req.body.Ct,
        Pin:req.body.Pin,
        Email:req.body.Email,
        PhSt:req.body.PhSt,
        Ph:req.body.Ph,
        WebSt:req.body.WebSt,
        WebTy:req.body.WebTy,
        WebLnk:req.body.WebLnk,
        Img1:req.files[0].filename,
        ImgSz1:req.files[0].size,
        Img2:req.files[1].filename,
        ImgSz2:req.files[1].size,  
    }
  const PrImg = PrimgUpload(obj)
    PrImg.save()
    .then(response=>{
        console.log(response)
        res.json('saved')
    })
    .catch(err=>{
        console.log(err)
        res.json(err)
    })

})

SltReg.route('/GetCrtImg').post((req,res)=>{
    PrimgUpload.find({}, (err,result33)=>{
        if(err){
            console.log(err)
        }else{
            if(result33.length > 0){
                console.log(result33)
                res.json(result33)
            }else{
                console.log('data not found')
                res.json('data not found')
            }
           
        }
    })
})

const nan32 = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',10)
const storageEngine32 = multer.diskStorage({
    destination:(req,files,cb)=>{
        cb(null,"./PrImagesTwo");
    },
    filename:(req,files,cb) =>{
        cb(null,Date.now()+nan32()+files.originalname);
    },
});
const upload32 = multer({storage:storageEngine32});

SltReg.route('/CrtImgTwo').post(upload32.array('photo42'),(req,res)=>{  
    const abc = nanoid()
    console.log(req.body)
    console.log(req.files)
    const obj2 = {
        Pr2Nm:req.body.Pr2Nm,
        Pr2Id:abc,
        Pr2Pst:'',
        PrDt1:'',
        PrDt2:'',
        PrDt3:'',
        Cnt:req.body.Cnt,
        St:req.body.St,
        Ct:req.body.Ct,
        Pin:req.body.Pin,
        Email:req.body.Email,
        PhSt:req.body.PhSt,
        Ph:req.body.Ph,
        WebSt:req.body.WebSt,
        WebTy:req.body.WebTy,
        WebLnk:req.body.WebLnk,
        Img1:req.files[0].filename,
        ImgSz1:req.files[0].size,
        Img2:req.files[1].filename,
        ImgSz2:req.files[1].size,  
    }
  const PrImgTwo = PrimgUploadTwo(obj2)
    PrImgTwo.save()
    .then(response=>{
        console.log(response)
        res.json('savedTwo')
    })
    .catch(err=>{
        console.log(err)
        res.json(err)
    })

})


SltReg.route('/GetCrtImgTwo').post((req,res)=>{
    PrimgUploadTwo.find({}, (err,result33)=>{
        if(err){
            console.log(err)
        }else{
            if(result33.length > 0){
                console.log(result33)
                res.json(result33)
            }else{
                console.log('data not found')
                res.json('data not found')
            }
           
        }
    })
})



const nan33 = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',10)
const storageEngine33 = multer.diskStorage({
    destination:(req,files,cb)=>{
        cb(null,"./PrImagesThree");
    },
    filename:(req,files,cb) =>{
        cb(null,Date.now()+nan33()+files.originalname);
    },
});
const upload33 = multer({storage:storageEngine33});

SltReg.route('/CrtImgThree').post(upload33.array('photo43'),(req,res)=>{  
    const abc = nanoid()
    console.log(req.body)
    console.log(req.files)
    const obj = {
        RPsTy2:'amt',
        Pr1Nm:req.body.Pr1Nm,
        Pr1Id:abc,
        Pr1Pst:'',
        PrDt1:'',
        PrDt2:'',
        PrDt3:'',
        Cnt:req.body.Cnt,
        St:req.body.St,
        Ct:req.body.Ct,
        Pin:req.body.Pin,
        Email:req.body.Email,
        PhSt:req.body.PhSt,
        Ph:req.body.Ph,
        WebSt:req.body.WebSt,
        WebTy:req.body.WebTy,
        WebLnk:req.body.WebLnk,
        Img1:req.files[0].filename,
        ImgSz1:req.files[0].size,
        Img2:req.files[1].filename,
        ImgSz2:req.files[1].size,  
    }
  const PrImg = PrimgUploadThree(obj)
    PrImg.save()
    .then(response=>{
        console.log(response)
        res.json('savedThree')
    })
    .catch(err=>{
        console.log(err)
        res.json(err)
    })

})


SltReg.route('/GetCrtImgThree').post((req,res)=>{
    PrimgUploadThree.find({}, (err,result33)=>{
        if(err){
            console.log(err)
        }else{
            if(result33.length > 0){
                console.log(result33)
                res.json(result33)
            }else{
                console.log('data not found')
                res.json('data not found')
            }
           
        }
    })
    .limit(4)
})

const nan34 = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',10)
const storageEngine34 = multer.diskStorage({
    destination:(req,files,cb)=>{
        cb(null,"./PrImagesFour");
    },
    filename:(req,files,cb) =>{
        cb(null,Date.now()+nan34()+files.originalname);
    },
});
const upload34 = multer({storage:storageEngine34});
SltReg.route('/CrtImgFour').post(upload34.array('photo44'),(req,res)=>{  
    const abc = nanoid()
    console.log(req.body)
    console.log(req.files)
    const obj2 = {
        PsTp:'amt',
        Pr2Nm:req.body.Pr2Nm,
        Pr2Id:abc,
        Pr2Pst:'',
        PrDt1:'',
        PrDt2:'',
        PrDt3:'',
        Cnt:req.body.Cnt,
        St:req.body.St,
        Ct:req.body.Ct,
        Pin:req.body.Pin,
        Email:req.body.Email,
        PhSt:req.body.PhSt,
        Ph:req.body.Ph,
        WebSt:req.body.WebSt,
        WebTy:req.body.WebTy,
        WebLnk:req.body.WebLnk,
        Img1:req.files[0].filename,
        ImgSz1:req.files[0].size,
        Img2:req.files[1].filename,
        ImgSz2:req.files[1].size,  
    }
  const PrImgTwo = PrimgUploadFour(obj2)
    PrImgTwo.save()
    .then(response=>{
        console.log(response)
        res.json('savedFour')
    })
    .catch(err=>{
        console.log(err)
        res.json(err)
    })

})

SltReg.route('/GetCrtImgFour').post((req,res)=>{
    PrimgUploadFour.find({}, (err,result33)=>{
        if(err){
            console.log(err)
        }else{
            if(result33.length > 0){
                console.log(result33.length)
                res.json(result33)
            }else{
                console.log('data not found')
                res.json('data not found')
            }
           
        }
    })
    .limit(4)
})



SltReg.route('/GetSltRegData').post((req,res)=>{
    SLTReg.find({SltOrgId:req.body.SltOrgId,$or:[{SltAccTy:'SlTwo'},{SltAccTy:'SlThree'}]}, (err,result33)=>{
        if(err){
            console.log(err)
        }else{
            if(result33.length > 0){
                console.log(result33)
                res.json(result33)
            }else{
                console.log('data not found')
                res.json('data not found')
            }
           
        }
    })
})

const nan2 = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',10)
const storageEngine2 = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./OrgImages");
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+nan2()+file.originalname);
    },
});
const upload2 = multer({storage:storageEngine2});

SltReg.route('/AddOrgReg').post(upload2.single('photo2'),(req,res)=>{
    const id = nanoid()
    var MyDate = new Date();
    const date = MyDate.getDate()+ '/'+(MyDate.getMonth()+1)+'/'+MyDate.getFullYear()
    const objData = {
            OrgId:id,
            OrgUNm:req.body.OrgUNm,
            OrgPwd:req.body.OrgPwd,
            OrgNm:req.body.OrgNm,
            OrgPh:req.body.OrgPh,
            OrgEml:req.body.OrgEml,
            OrgImg:req.file.filename,
            OrgAddr:req.body.OrgAddr,
            OrgRegDt:date
    }

    const SltReg = orgreg(objData)
    SltReg.save()
    .then(response=>{
        console.log(response)
        res.json('Data saved in OrgReg')
    })
    .catch(err=>{
        console.log(err)
        res.json(err)
    })
})

SltReg.route('/GetOrgRegData').post((req,res)=>{
    orgreg.find((err,result33)=>{
        if(err){
            console.log(err)
        }else{
            if(result33.length > 0){
                // console.log('result33')
                res.json(result33)
            }else{
                console.log('data not found')
                res.json('data not found')
            }
           
        }
    })
})




SltReg.route('/SltJwtTokenGen').post((req,res)=>{
    console.log('REQUEST', req.body)
    SLTReg.find({SltUNm:req.body.username,SltPwd:req.body.password},(err,result)=>{
            console.log('RESULT', result)
            if(err){
                res.json(err)
             } else{
                 console.log(req.body)
                 let userdata = result.filter((use)=>{
                     return use.SltUNm == req.body.username && use.SltPwd == req.body.password; 
                 })
                 
                 if(userdata.length){
                     let token_payload = {id:userdata[0].SltId};
                     let token = jwt.sign(token_payload,"!@1709nm");
                     let response = { 'accessToken' : token,user:'ja'}
             
                     return res.status(200).json(response);
                 } else {
                     return res.status(400).json('Authentication failed...');
                 }
             
             }
         });
})

SltReg.route('/SltJwtTokenVal').post((req,res)=>{
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
                SLTReg.find({SltId:decoded.payload.id},(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(result)
                        if(result.length > 0){
                            console.log(result[0])
                            // res.json(result[0])
                            const obj = {
                    
                                    SltId:result[0].SltId,
                                    SltUNm:result[0].SltUNm,                                   
                                    SltFNm:result[0].SltFNm,
                                    SltLNm:result[0].SltLNm,
                                    SltGnd:result[0].SltGnd,
                                    SltDob:result[0].SltDob,
                                    SltOrgNm:result[0].SltOrgNm,
                                    SltOrgId:result[0].SltOrgId,
                                    SltIdTy:result[0].SltIdTy,
                                    SltIdNo:result[0].SltIdNo,
                                    SltPh:result[0].SltPh,
                                    SltEml:result[0].SltEml,
                                    SltImg:result[0].SltImg,
                                    SltAddr:result[0].SltAddr,
                                    SltRegDt:result[0].SltRegDt,
                                    SltAccTy:result[0].SltAccTy
                               
                            }
                            res.json(obj)
                        }else{
                            res.json('no JWT result found')
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

SltReg.route('/addSltAccTy1').post((req,res)=>{
   const AddSltAccty = SltAccty(req.body)
   AddSltAccty.save()
   .then(response=>{
       console.log(response)
       res.json('Stored in SltAccTy DB')
   })
   .catch(err=>{
       console.log(err)
       res.json(err)
   })
})

SltReg.route('/GetSltAccTy1').post((req,res)=>{
    SltAccty.find({FieldOne:req.body.FieldOne},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                console.log(result)
                res.json(result[0].FieldTwo)
            }else{
                console.log('GetSltAccTy1 not found')
                res.json(err)
            }
            
        }
    })
})

SltReg.route('/addSltAccTy2').post((req,res)=>{
    const AddSltAccty = SltAccty2(req.body)
    AddSltAccty.save()
    .then(response=>{
        console.log(response)
        res.json('Stored in SltAccTy DB2')
    })
    .catch(err=>{
        console.log(err)
        res.json(err)
    })
 })
 
 SltReg.route('/GetSltAccTy2').post((req,res)=>{
    SltAccty2.find({FieldOne:req.body.FieldOne},(err,result)=>{
         if(err){
             console.log(err)
         }else{
             if(result.length > 0){
                console.log(result)
                res.json(result[0].FieldTwo)
             }else{
                 console.log('GetSltAccTy2 not found')
                 res.json(err)
             }
           
         }
     })
 })




 ////////////////////////////////////////////////////////////////////////////////////////////////
 //done on friday afternoon 14/01/2022


 
SltReg.route('/OrgJwtTokenGen').post((req,res)=>{
    console.log(req.body)
    orgreg.find({OrgUNm:req.body.OrgUNm,OrgPwd:req.body.OrgPwd},(err,result)=>{
        console.log('orgGenToen')
        // console.log(result)
            
            if(err){
                res.json(error)
             } else{
                //  console.log(req.body)
                 let userdata = result.filter((use)=>{
                     return use.OrgUNm == req.body.OrgUNm && use.OrgPwd == req.body.OrgPwd; 
                 })
                 
                 if(userdata.length){
                     let token_payload = {id:userdata[0].OrgId};
                     let token = jwt.sign(token_payload,"!@1709nm");
                     let response = { 'accessToken' : token,user:'userOrg'}
                    //  console.log(response)
                     return res.status(200).json(response);
                     
                 } else {
                     console.log('fail')
                     return res.status(400).json('Authentication failed...');
                 }
             
             }
         });
})

SltReg.route('/OrgJwtTokenVal').post((req,res)=>{
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
                orgreg.find({OrgId:decoded.payload.id},(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        // console.log(result)
                        if(result.length > 0){
                            // console.log(result[0])
                            // res.json(result[0])
                            const obj = {
                                OrgId:result[0].OrgId,
                                OrgUNm:result[0].OrgUNm,
                                OrgNm:result[0].OrgNm,
                                OrgPh:result[0].OrgPh,
                                OrgEml:result[0].OrgEml,
                                OrgImg:result[0].OrgImg,
                                OrgAddr:result[0].OrgAddr,
                                OrgRegDt:result[0].OrgRegDt
                               
                            }
                            // console.log(obj)
                            res.json(obj)
                            
                        }else{
                            res.json(err)
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

////////////////////////////////////////////////////////////////////////////

SltReg.route('/RtIniReq').post((req,res)=>{
    const id1 = nanoid()
    var MyDate = new Date();
    const date = MyDate.getDate()+ '/'+(MyDate.getMonth()+1)+'/'+MyDate.getFullYear()
    const MyDateString = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2)  +('0' + MyDate.getDate()).slice(-2);     
    // const Mydate3 = new Date();         // ISO date 1

    const obj = {
            RtId:id1,
            RtNm:req.body.RtNm,
            RtPhn:req.body.RtPhn,
            RtPin:req.body.RtPin,
            RtTlk:req.body.RtTlk,
            RtDst:req.body.RtDst,     
            RtStrTy:req.body.RtStrTy,      
            RtSt:req.body.RtSt,
            RtRefCd:req.body.RtRefCd,
            RtOrgId:'',
            RtSltId:'',
            RtSts:'ReqStrd',
            RtCmt:'',
            RtDate1:date,
            RtDate2:MyDateString,
            RtDate3:MyDate

    }
    const data = RtInireq(obj)
    data.save()
    .then(response=>{
        console.log(response)
        res.json('Data Stored in RtIniReq DB')
    })
    .catch(err=>{
        console.log(err)
        res.json(err)
        
    })

})

SltReg.route('/RtIniReqGet').post((req,res)=>{
    var MyDate = new Date();
    const MyDateString = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2)  +('0' + MyDate.getDate()).slice(-2);     
    RtInireq.find({
         RtOrgId:req.body.OrgId,
         RtSts:"ReqAlltdOrg"
        // RtDate2:MyDateString
    },(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                console.log(result.length)
                res.json(result)
            }else{
                console.log('RtIniReqGet not found')
                res.json('RtIniReqGet not found')
            }
            
        }
    })
})


SltReg.route('/RtIniReqGetAdmSys').post((req,res)=>{
    console.log(req.body)
    var MyDate = new Date();
    const MyDateString = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2)  +('0' + MyDate.getDate()).slice(-2);     
    RtInireq.find({
        RtSts:"ReqStrd"
        // RtDate2:MyDateString
    },(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                console.log(result.length)
                res.json(result)
            }else{
                res.json(result)
                console.log('RtIniReqGetAdmSys not found')
            }
            
        }
    }).sort({_id:-1}).limit(3).skip(3*req.body.skp)
})

SltReg.route('/SysAdmReg').post((req,res)=>{
    const id2 = nanoid()
    const obj2 = {
        SysAdmId:id2,
        SysAdmUNm:req.body.SysAdmUNm,
        SysAdmPwd:req.body.SysAdmPwd
    }
    const data = SysAdmReg(obj2)
    data.save()
    .then(response=>{
        console.log(response.length)
        res.json(response)
    })
    .catch(err=>{
        console.log(err)
        res.json(err)
    })
})


 
SltReg.route('/SysAdmJwtTokenGen').post((req,res)=>{
    console.log(req.body)
    SysAdmReg.find({SysAdmUNm:req.body.SysAdmUNm,SysAdmPwd:req.body.SysAdmPwd},(err,result)=>{
        // console.log('orgGenToen')
        // console.log(result)
            
            if(err){
                res.json(error)
             } else{
                //  console.log(req.body)
                 let userdata = result.filter((use)=>{
                     return use.SysAdmUNm == req.body.SysAdmUNm && use.SysAdmPwd == req.body.SysAdmPwd; 
                 })
                 
                 if(userdata.length){
                     let token_payload = {id:userdata[0].SysAdmId};
                     let token = jwt.sign(token_payload,"!@1709nm");
                     let response = { 'accessToken' : token,user:'SysAdmReg'}
                     console.log(response)
                     return res.status(200).json(response);
                     
                 } else {
                     console.log('fail')
                     return res.status(400).json('Authentication failed...');
                 }
             
             }
         });
})

SltReg.route('/SysAdmJwtTokenVal').post((req,res)=>{
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
                SysAdmReg.find({SysAdmId:decoded.payload.id},(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        // console.log(result)
                        if(result.length > 0){
                            // console.log(result[0])
                            const obj = {
                                SysAdmUNm:result[0].SysAdmUNm,
                                SysAdmPwd:result[0].SysAdmPwd
                            }
                            console.log(obj)
                            res.json(obj)
                            
                        }else{
                            
                            console.log('no JWT result found')
                            res.json(err)
                            
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


SltReg.route('/GetIniReqData').post((req,res)=>{
    console.log(req.body)
    RtInireq.find({RtSltId:req.body.RtSltId,RtSts:'ReqAlltdSlt'},(err,result2)=>{
        if(err){
            console.log(err)
        }else{
            if(result2.length > 0){
                console.log(result2.length)
                res.json(result2)
            }else{
                console.log('GetIniReqData not found')
                res.json('Not Found')
            }
            
        }
    })
})


SltReg.route('/UpdateIniReq').post((req,res)=>{
    RtInireq.findOneAndUpdate({RtId:req.body.RtId},{
        $set:{
            RtSts:'ReqAbrtd',
            RtCmt:req.body.RtCmt
        }
},(err,result5)=>{
    if(err){
        console.log(err)
    }else{
        // console.log('updated success')
        res.json('UpdateSuccess')
    }
}) 
})

SltReg.route('/UpdateIniReqOrg').post((req,res)=>{
    console.log(req.body)
    RtInireq.findOneAndUpdate({RtId:req.body.RtId},{
        $set:{
            RtSts:"ReqAlltdOrg",
            RtOrgId:req.body.RtOrgId
        }
},(err,result5)=>{
    if(err){
        console.log(err)
    }else{
        // console.log('updated success')
        res.json('UpdateSuccessOrg')
    }
}) 
})

SltReg.route('/UpdateIniReqSlt').post((req,res)=>{
    console.log(req.body)
    RtInireq.findOneAndUpdate({RtId:req.body.RtId},{
        $set:{
            RtSts:"ReqAlltdSlt",
            RtSltId:req.body.RtSltId
        }
},(err,result5)=>{
    if(err){
        console.log(err)
    }else{
        // console.log('updated success')
        res.json('UpdateSuccessSlt')
    }
}) 
})

SltReg.route('/GetImageUpload').post((req,res)=>{
    console.log(req.body)
    Imageupload.find({},(err,result2)=>{
        if(err){
            console.log(err)
        }else{
            if(result2.length > 0){
                console.log(result2.length)
                res.json(result2)
            }else{
                console.log('not found')
                res.json(result2)
            }
            
        }
    }).sort({_id:-1}).limit(3).skip(3*req.body.skp)
})


SltReg.route('/GetImageUploadBlkAdm').post((req,res)=>{
    console.log(req.body)
    Imageupload.find({UPsId:req.body._id}, (err,result2)=>{
        if(err){
            res.json(err)
        }else{
            if (req.body.sts === 'Blk'){
                if(result2.length >0){
                    if (result2[0].PsSts !='Blk'){
                        Imageupload.findOneAndUpdate({UPsId:req.body._id},
                            {
                            $set:{
                                PsSts:'Blk',
                                PsAdmSts:'Verified'
                                }
                            },(err, result)=>{
                            if(err){
                                
                                res.json(err)
                            }else{
                             
                                res.json('Blocked')     
                            }
                        })
                    }else{
                        res.json('already Blocked')
                      
                    }                  
                }else{
                    res.json('not found')
                }
            }else if (req.body.sts ='UnBlk'){
                if(result2.length >0){
                    if (result2[0].PsSts !='NtBlk'){
                        Imageupload.findOneAndUpdate({UPsId:req.body._id},
                            {
                            $set:{
                                PsSts:'NtBlk',
                                PsAdmSts:'Verified'
                                }
                            },(err, result)=>{
                            if(err){
                     
                                res.json(err)
                            }else{
                    
                                res.json('UnBlocked')     
                            }
                        })
                    }else{
                        res.json('already UnBlocked')
                    }
                   
                }else{
                    res.json('not found')
                }
            }else{
                res.json('nothing')
            }
        }
    })
    
})


SltReg.route('/UsrRegBlkAdm').post((req,res)=>{
    console.log(req.body)
    registerFull.find({UsrId:req.body._id}, (err,result2)=>{
        if(err){
            res.json(err)
        }else{
            if (req.body.sts === 'Blk'){
                if(result2.length >0){
                    if (result2[0].st2 !='Blk'){
                        registerFull.findOneAndUpdate({UsrId:req.body._id},
                            {
                            $set:{
                                st2:'Blk'
                                // PsAdmSts:'Verified'
                                }
                            },(err, result)=>{
                            if(err){
                                
                                res.json(err)
                            }else{
                             
                                res.json('Blocked')     
                            }
                        })
                    }else{
                        res.json('already Blocked')
                      
                    }                  
                }else{
                    res.json('not found')
                }
            }else if (req.body.sts ='UnBlk'){
                if(result2.length >0){
                    if (result2[0].st2 !='NtBlk'){
                        registerFull.findOneAndUpdate({UsrId:req.body._id},
                            {
                            $set:{
                                st2:'NtBlk'
                                // PsAdmSts:'Verified'
                                }
                            },(err, result)=>{
                            if(err){
                     
                                res.json(err)
                            }else{
                    
                                res.json('UnBlocked')     
                            }
                        })
                    }else{
                        res.json('already UnBlocked')
                    }
                   
                }else{
                    res.json('not found')
                }
            }else{
                res.json('nothing')
            }
        }
    })
    
})


SltReg.route('/UsrGrpBlkAdm').post((req,res)=>{
    console.log(req.body)
    GroupCreate.find({grpId:req.body._id}, (err,result2)=>{
        if(err){
            res.json(err)
        }else{
            if (req.body.sts === 'Blk'){
                if(result2.length >0){
                    if (result2[0].grpImgPt !='Blk'){
                        GroupCreate.findOneAndUpdate({grpId:req.body._id},
                            {
                            $set:{
                                grpImgPt:'Blk'
                                // PsAdmSts:'Verified'
                                }
                            },(err, result)=>{
                            if(err){
                                
                                res.json(err)
                            }else{
                             
                                res.json('Blocked')     
                            }
                        })
                    }else{
                        res.json('already Blocked')
                      
                    }                  
                }else{
                    res.json('not found')
                }
            }else if (req.body.sts ='UnBlk'){
                if(result2.length >0){
                    if (result2[0].grpImgPt !='NtBlk'){
                        GroupCreate.findOneAndUpdate({grpId:req.body._id},
                            {
                            $set:{
                                grpImgPt:'NtBlk'
                                // PsAdmSts:'Verified'
                                }
                            },(err, result)=>{
                            if(err){
                     
                                res.json(err)
                            }else{
                    
                                res.json('UnBlocked')     
                            }
                        })
                    }else{
                        res.json('already UnBlocked')
                    }
                   
                }else{
                    res.json('not found')
                }
            }else{
                res.json('nothing')
            }
        }
    })
    
})



SltReg.route('/GetRtImageUpload').post((req,res)=>{
    console.log(req.body)
    Rupload.find({},(err,result2)=>{
        if(err){
            console.log(err)
        }else{
            if(result2.length > 0){
                console.log(result2.length)
                res.json(result2)
            }else{
                res.json(result2)
                console.log('GetRtImageUpload not found')
            }
            
        }
    }).sort({_id:-1}).limit(3).skip(3*req.body.skp)
})

SltReg.route('/GetRtImageUploadBlkAdm').post((req,res)=>{
    console.log(req.body)
    Rupload.find({RPsId:req.body._id}, (err,result2)=>{
        if(err){
            res.json(err)
        }else{
            if (req.body.sts === 'Blk'){
                if(result2.length >0){
                    if (result2[0].RPsSt2 !='Blk'){
                        Rupload.findOneAndUpdate({RPsId:req.body._id},
                            {
                            $set:{
                                RPsSt2:'Blk',
                                RPsVrAd:'Verified'
                                }
                            },(err, result)=>{
                            if(err){
                                
                                res.json(err)
                            }else{
                             
                                res.json('Blocked')     
                            }
                        })
                    }else{
                        res.json('already Blocked')
                      
                    }                  
                }else{
                    res.json('not found')
                }
            }else if (req.body.sts ='UnBlk'){
                if(result2.length >0){
                    if (result2[0].RPsSt2 !='NtBlk'){
                        Rupload.findOneAndUpdate({RPsId:req.body._id},
                            {
                            $set:{
                                RPsSt2:'NtBlk',
                                RPsVrAd:'Verified'
                                }
                            },(err, result)=>{
                            if(err){
                     
                                res.json(err)
                            }else{
                    
                                res.json('UnBlocked')     
                            }
                        })
                    }else{
                        res.json('already UnBlocked')
                    }
                   
                }else{
                    res.json('not found')
                }
            }else{
                res.json('nothing')
            }
        }
    })
    
})


SltReg.route('/RtRegBlkAdm').post((req,res)=>{
    console.log(req.body)
    RTregFull.find({RtId:req.body._id}, (err,result2)=>{
        if(err){
            res.json(err)
        }else{
            if (req.body.sts === 'Blk'){
                if(result2.length >0){
                    if (result2[0].RtAcnBlkSt !='Blk'){
                        RTregFull.findOneAndUpdate({RtId:req.body._id},
                            {
                            $set:{
                                RtAcnBlkSt:'Blk'
                                // PsAdmSts:'Verified'
                                }
                            },(err, result)=>{
                            if(err){
                                
                                res.json(err)
                            }else{
                             
                                res.json('Blocked')     
                            }
                        })
                    }else{
                        res.json('already Blocked')
                      
                    }                  
                }else{
                    res.json('not found')
                }
            }else if (req.body.sts ='UnBlk'){
                if(result2.length >0){
                    if (result2[0].RtAcnBlkSt !='NtBlk'){
                        RTregFull.findOneAndUpdate({RtId:req.body._id},
                            {
                            $set:{
                                RtAcnBlkSt:'NtBlk'
                                // PsAdmSts:'Verified'
                                }
                            },(err, result)=>{
                            if(err){
                     
                                res.json(err)
                            }else{
                    
                                res.json('UnBlocked')     
                            }
                        })
                    }else{
                        res.json('already UnBlocked')
                    }
                   
                }else{
                    res.json('not found')
                }
            }else{
                res.json('nothing')
            }
        }
    })
    
})




SltReg.route('/GetRtRegData').post((req,res)=>{
    console.log(req.body)
    RTregFull.find({},(err,result2)=>{
        if(err){
            console.log(err)
        }else{
            if(result2.length > 0){
                console.log(result2.length)
                res.json(result2)
            }else{
                res.json(result2)
                console.log('GetRtRegData not found')
            }
            
        }
    }).sort({_id:-1}).limit(3).skip(3*req.body.skp)
})

SltReg.route('/GetRegFullData').post((req,res)=>{
    console.log(req.body)
    registerFull.find({},(err,result2)=>{
        if(err){
            console.log(err)
        }else{
            if(result2.length > 0){
                console.log(result2.length)
                res.json(result2)
            }else{
                res.json(result2)
                console.log('GetRegFullData not found')
            }
            
        }
    }).sort({_id:-1}).limit(3).skip(3*req.body.skp)
})

SltReg.route('/GetGroupCreate').post((req,res)=>{
    console.log(req.body)
    GroupCreate.find({},(err,result2)=>{
        if(err){
            console.log(err)
        }else{
            if(result2.length > 0){
                console.log(result2.length)
                res.json(result2)
            }else{
                res.json(result2)
                console.log('GetGroupCreate not found')
            }
            
        }
    }).sort({_id:-1}).limit(3).skip(3*req.body.skp)
})


SltReg.route('/GetRegFullData').post((req,res)=>{
    console.log(req.body)
    orgreg.find({},(err,result2)=>{
        if(err){
            console.log(err)
        }else{
            if(result2.length > 0){
                console.log(result2.length)
                res.json(result2)
            }else{
                res.json(result2)
                console.log('GetRegFullData not found')
            }
            
        }
    }).sort({_id:-1}).limit(3).skip(3*req.body.skp)
})

SltReg.route('/GetOrgData').post((req,res)=>{
    console.log(req.body)
    orgreg.find({},(err,result2)=>{
        if(err){
            console.log(err)
        }else{
            if(result2.length > 0){
                console.log(result2.length)
                res.json(result2)
            }else{
                res.json(result2)
                console.log('GetRegFullData not found')
            }
            
        }
    }).sort({_id:-1}).limit(3).skip(3*req.body.skp)
})

SltReg.route('/GetSltData').post((req,res)=>{
    console.log(req.body)
    SLTReg.find({},(err,result2)=>{
        if(err){
            console.log(err)
        }else{
            if(result2.length > 0){
                console.log(result2.length)
                res.json(result2)
            }else{
                res.json(result2)
                console.log('GetRegFullData not found')
            }
            
        }
    }).sort({_id:-1}).limit(3).skip(3*req.body.skp)
})



SltReg.route('/addSessionNum').post((req,res)=>{
    console.log(req.body)

    SesNum.find({SesNId:req.body.SesNId},(err,result)=>{
        if(err){
            res.json(err)
            console.log(err)
        }
        else{
            console.log(result.length)
            if (result.length === 0){
                const add = SesNum(req.body)
                add.save()
                .then(response=>{     
                    res.json('Data added Ses Num')
                    console.log(response)
                })
                .catch(err1=>{
                    res.json(err1)
                    console.log(err1)
                })

            }else{
                res.json('already exists SessionNum')
                console.log('already exists SessionNum')
            }
        }
    })
})

SltReg.route('/getSessionNum').post((req,res)=>{
    SesNum.find({},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            if(result1.length > 0 ){
                res.json(result1)
                console.log(result1)
            }else{
                res.json('Not Found getSessionNum')
                console.log('Not Found getSessionNum')
            }
           
        }
    })
})

SltReg.route('/addSessionTy').post((req,res)=>{
    console.log(req.body)

    SesTyp.find({SesNId:req.body.SesNId,SesTy:req.body.SesTy},(err,result)=>{
        if(err){
            res.json(err)
            console.log(err)
        }
        else{
            if (result.length === 0){
                const add = SesTyp(req.body)
                add.save()
                .then(response=>{     
                    res.json('Data added Ses Ty')
                    console.log(response)
                })
                .catch(err1=>{
                    res.json(err1)
                    console.log(err1)
                })

            }else{
                res.json('already exists SessionTy')
                console.log('already exists SessionTy')
            }
        }
    })
   

})

SltReg.route('/getSessionTy').post((req,res)=>{
    SesTyp.find({},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            if(result1.length > 0 ){
                res.json(result1)
                console.log(result1)
            }else{
                res.json('No result found getSessionTy')
                console.log('No result found getSessionTy')
            }
           
        }
    }).sort({_id:-1})
})


SltReg.route('/getSessionTyTwo').post((req,res)=>{
    SesTyp.find({SesNId:req.body.SesNId},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            if(result1.length > 0 ){
                res.json(result1)
                console.log(result1)
            }else{
                res.json('No result found getSessionTy')
                console.log('No result found getSessionTy')
            }
           
        }
    }).sort({_id:-1})
})

SltReg.route('/addSessionList').post((req,res)=>{
    console.log(req.body)

    SesLst.find({SesNId:req.body.SesNId,SesTy:req.body.SesTy,SesRnk:req.body.SesRnk},(err,result)=>{
        if(err){
            res.json(err)
            console.log(err)
        }
        else{
            if (result.length === 0){
                const add = SesLst(req.body)
                add.save()
                .then(response=>{     
                    res.json('Data added Ses List')
                    console.log(response)
                })
                .catch(err1=>{
                    res.json(err1)
                    console.log(err1)
                })

            }else{
                res.json('already exists SessionList')
                console.log('already exists SessionList')
            }
        }
    })
   

})

SltReg.route('/getSessionList').post((req,res)=>{
    console.log(req.body)
    SesLst.find({SesNId:req.body.SesNId,SesTy:req.body.SesTy},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            if(result1.length > 0 ){
                res.json(result1)
                console.log(result1)
            }else{
                res.json('No result found getSessionList')
                console.log('No result found getSessionList')
            }
           
        }
    }).sort({SesRnk:1})
})


module.exports = SltReg;
