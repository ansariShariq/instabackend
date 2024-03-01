const bcrypt = require('bcrypt')

const createError = require('../utilities/createError')

const router = require('express').Router()

const User = require('../model/user.model')
//registration

router.post('/register',async(req,res)=>{
    try{
        //checking if it's a new User or not
        const alreadyAuser = await User.findOne({$or:[{username:req.body.username},{email:req.body.email}]})
      
            // console.log(alreadyAuser,req.body.email)
        
        if(alreadyAuser) return res.status(450).json({mesasge:"User already Exists"})

        //hashing of Password
        try{
            const salt = await bcrypt.genSalt(10)

        const hashedPassWord = await bcrypt.hash(req.body.password,salt) 
        req.body.password = hashedPassWord
        const user = await  User.create(req.body)
        const {password,_id,...other} = user.toObject()
       return res.status(200).json(other)
        }
        catch(err){
            return createError("password is Not Hashed")
        }
        
    }
    catch(err){
       return createError("registration is not done")
    }
})

router.post('/login',async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
       if(!user) return res.status(400).json({mesasge:"user Doesn't exists"}) 
        // console.log(user.password,req.body.password)
        if(!req.body.password) return res.json({message:"Please Provide password"})
        try{
           
            const validatePassWord = await bcrypt.compare(req.body.password,user.password)
            // console.log(validatePassWord)
            if(!validatePassWord){
                console.log("Password is not correct")
                return res.status(400).json({message:"PassWord is Not Correct"})
            }
            console.log('passWord is Valid')
            return  res.status(200).json(user)  
        }
        catch(err){
            // console.error("Error Comapring PassWord",err)
            return  res.status(500).json({message:"internal Sever Error"})
               
        }

          
    }   
    catch(err){
        return createError()
    }
})


module.exports = router