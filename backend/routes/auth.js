
const router = require('express').Router();

const User = require('../models/User');

const bcrypt = require('bcrypt');



// register 
router.post("/register",async(req,res)=>{
 try{
        let existingUser = await User.findOne({username:req.body.username})

        if(existingUser){
            res.status(400).json('username already exists').send()
            return
        }

         existingUser = await User.findOne({email:req.body.email})
        if(existingUser){
            res.status(400).json('email already exists').send()
            return
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,   
        })
                    
        res.status(200).json({username: user.username, email: user.email, profilePic: user.profilePic}).send();
        

    }catch(err){
        res.status(500).json(err);

    }


})

//for the Login 

router.post('/login',async (req,res)=>{

try{

const user = await User.findOne({username: req.body.username})
 
if(!user){
    res.status(400).json("wrong username").send()
    return
}

const validated =await bcrypt.compare(req.body.password, user.password)

if(!validated){
    res.status(400).json("wrong password").send()
    return
} 

res.status(200).json({username: user.username, email: user.email, profilePic: user.profilePic}).send()
}catch(err){
    res.status(500).json(err).send();
}

})


module.exports =router
