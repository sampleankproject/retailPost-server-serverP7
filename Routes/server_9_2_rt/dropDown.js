const express = require('express')
const PushDropdown = express.Router()

const dropdown3 = require('../../Models/RtDropDown3')
const dropdown1 = require('../../Models/RtDropDown1')
const dropdown2 = require('../../Models/RtDropDown2')
const dropdown4 = require('../../Models/RtDropDown4')
const dropdown5 = require('../../Models/RtDropDown5')
const dropdown6 = require('../../Models/RtDropDown6')

PushDropdown.route('/AddDropData3').post((req,res)=>{
    const add = dropdown3(req.body)
    add.save()
    .then(response=>{     
        res.json('Data added')
        console.log(response)
    })
    .catch(err=>{
        console.log(err)
    })

})

PushDropdown.route('/getDropdown3').post((req,res)=>{
    console.log(req.body)
    dropdown3.find({fieldOne:req.body.fieldOne,fieldTwo:req.body.fieldTwo,fieldThree:req.body.fieldThree},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            if(result1.length > 0){
                res.json(result1[0].fieldFour)
                console.log(result1[0].fieldFour)
            }else{
                res.json('No result found getDropdown3')
                console.log('No result found getDropdown3')
            }
           
        }
    })
})


PushDropdown.route('/AddDropData1').post((req,res)=>{
    const add = dropdown1(req.body)
    add.save()
    .then(response=>{     
        res.json('Data added 1')
        console.log(response)
    })
    .catch(err=>{
        console.log(err)
    })

})

PushDropdown.route('/getDropdown1').post((req,res)=>{
    dropdown1.find({fieldOne:req.body.fieldOne},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            if(result1.length > 0 ){
                res.json(result1[0].fieldTwo)
                console.log(result1[0].fieldTwo)
            }else{
                res.json('No result found getDropdown1')
                console.log('No result found getDropdown1')
            }
           
        }
    })
})


PushDropdown.route('/AddDropData2').post((req,res)=>{
    const add = dropdown2(req.body)
    add.save()
    .then(response=>{     
        res.json('Data added 2')
        console.log(response)
    })
    .catch(err=>{
        console.log(err)
    })

})

PushDropdown.route('/getDropdown2').post((req,res)=>{
    console.log('dropdown 2')
    console.log(req.body)
    dropdown2.find({fieldOne:req.body.fieldOne},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            if(result1.length > 0 ){
                res.json(result1[0].fieldTwo)
                console.log(result1[0].fieldTwo)
            }else{
                res.json('No data found getDropdown2')
                console.log('No data found getDropdown2')
            }
        
        }
    })
})

PushDropdown.route('/AddDropData4').post((req,res)=>{
    const add = dropdown4(req.body)
    add.save()
    .then(response=>{     
        res.json('Data added 4')
        console.log(response)
    })
    .catch(err=>{
        console.log(err)
    })

})

PushDropdown.route('/getDropdown4').post((req,res)=>{
    console.log(req.body)
    dropdown4.find({fieldOne:req.body.fieldOne,fieldTwo:req.body.fieldTwo,fieldThree:req.body.fieldThree},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            if(result1.length > 0){
                res.json(result1[0].fieldFour)
                console.log(result1[0].fieldFour)
            }else{
                res.json('No data found getDropdown4')
                console.log('No data found getDropdown4')
            }
      
        }
    })
})

PushDropdown.route('/AddDropData5').post((req,res)=>{
    const add = dropdown5(req.body)
    add.save()
    .then(response=>{     
        res.json('Data added 5')
        console.log(response)
    })
    .catch(err=>{
        console.log(err)
    })

})

PushDropdown.route('/getDropdown5').post((req,res)=>{
    console.log(req.body)
    dropdown5.find({fieldOne:req.body.fieldOne,fieldTwo:req.body.fieldTwo,fieldThree:req.body.fieldThree},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            if(result1.length > 0){
                res.json(result1[0].fieldFour)
                console.log(result1[0].fieldFour)
            }else{
                res.json('No data found getDropdown5')
                console.log('No data found getDropdown5')
            }
           
        }
    })
})


PushDropdown.route('/AddDropData6').post((req,res)=>{
    const add = dropdown6(req.body)
    add.save()
    .then(response=>{     
        res.json('Data added 6')
        console.log(response)
    })
    .catch(err=>{
        console.log(err)
    })

})

PushDropdown.route('/getDropdown6').post((req,res)=>{
    console.log(req.body)
    dropdown6.find({fieldOne:req.body.fieldOne,fieldTwo:req.body.fieldTwo},(err,result1)=>{
        if(err){
            console.log(err)
        }else{
            if(result1.length > 0){
                res.json(result1[0].fieldThree)
                console.log(result1[0].fieldThree)
            }else{
                res.json('No data found getDropdown6')
                console.log('No data found getDropdown6')
            }
           
        }
    })
})



module.exports = PushDropdown;