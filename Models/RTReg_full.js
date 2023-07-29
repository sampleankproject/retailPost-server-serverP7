const mongoose = require('mongoose')
const schema = mongoose.Schema

const RTreg_full = new schema({
    RtId:{type:String},
    RtShNm:{type:String}, //
    RtShBrcNm:{type:String},//
    RtUnm:{type:String},
    RtPwd:{type:String},
    RtUsrNm:{type:String}, //
    RtUsrTy:{type:String}, //
    RtUsrImg:{type:String}, //

    RtUsrGnd:{type:String}, //
    RtUsrYob1:[{dt:{type:String},Mt:{type:String},Yr:{type:String}}],//// date 
    RtUsrYob2:{type:String},///// ISO date 
    RtUsrIdImg:[{img0:{type:String},img1:{type:String}}],  
    RtUsrIdTy:{type:String},
    RtUsrIdNo:{type:String},
    RtLgImg1:{type:String},
    RtLgImg2:{type:String},
   

    RtStrOpLvTy:{type:String},
    RtStrOpLvSt:{type:String},
    RtStrOpD:[{DSt:{type:String},Dy:{type:String},Tm1:{type:String},Tm1S:{type:String},Tm2:{type:String},Tm2S:{type:String}}],
    RtStrOpN1:{type:String},
    RtStrOpN2:{type:String},
    RtStrOpN3:{type:String},
    RtShIdImg:[{img0:{type:String},img1:{type:String}}],
    RtLcnTy:{type:String},
    RtLcnNo:{type:String},
    RtStrSpl:{type:String},

    RtMlId:{type:String}, 
    RtPhnCd:{type:String},
    RtPhn:{type:String},
    RtCsMlId:{type:String},
    RtCsPhnCd:{type:String},
    RtCsPhn:{type:String},  
    RtTy1:{type:String},
    RtBrNm:{type:String},
    RtTy2:{type:String},
    RtMnLm:{type:Number},
    RtSbLm:{type:Number},

    RtStrDt1:{type:String},
    RtStrDt2:{type:Number},
    RtStrDt3:{type:String},
    RtExpDt1:{type:String},
    RtExpDt2:{type:Number},
    RtExpDt3:{type:String},
    RtPlnTy:{type:String},
    RtPlnTyNm:[{Nm:{type:String}}],
    RtPlnNm:{type:String},
    RtPlnDys:{type:String},
    RtPlnAmt:{type:String},
 
    RtShImg:[{img0:{type:String}}],
  
    RtShCo:[{latitude:{type:String},longitude:{type:String}}],
    RtShCo2:{type:{type:String},coordinates:[{type:Number},{type:Number}]},
    RtShCoCd:{type:Number},
    RtShCoLn:{type:String},
    RtPdAmt:{type:String},
    RtPdAmtDt:{type:String},
    RtPdAmtTm:{type:String},
    RtAcnSt:{type:String},  
    RtRnwSt:{type:String},
    RtAcnBlkSt:{type:String},
    RtAdr1:{type:String},
    RtAdr2:{type:String},
    RtAdr3:{type:String},
    RtAdr4:{type:String},
    RtAdr5:{type:String},
    RtAdr6:{type:String},
    RtAdr7:{type:String},
    
    RtPin:{type:Number},
    RtHbl:{type:String},
    RtHbl2:{type:String},
    RtHbl3:{type:String},
    RtTlk:{type:String},
    RtTlk2:{type:String},
    RtTlk3:{type:String},
    RtDst:{type:String},
    RtDst2:{type:String},
    RtSt:{type:String},
    RtSt2:{type:String},
    RtLdMk:{type:String},
    RtRefTy:{type:String},
    RtRefCd:{type:String},

    RtRefCdUsg:{type:String},
    RtRegTy:{type:String},
    RtRegDt1:{type:String},
    RtRegDt2:{type:Number},
    RtRegDt3:{type:String},
    RtSlOrg:{type:String},
    RtSlOrgCd:{type:String},
    RtSlId:{type:String},
    RtSlRegTy:{type:String},
    RtSlRegSts:{type:String}
},{
    collection:'RtRegFull'
})

RTreg_full.index({RtShNm:'text',RtUnm:'text',RtShBrcNm:'text',RtHbl:'text',RtHbl2:'text',RtHbl3:'text',RtTlk:'text',RtTlk2:'text',RtTlk3:'text',RtDst:'text',RtDst2:'text',RtSt:'text',RtSt2:'text'})
const RTReg = mongoose.model('RTregFull',RTreg_full)
module.exports = RTReg;






