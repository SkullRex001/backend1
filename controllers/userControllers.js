const asyncHandler=require("express-async-handler");
const errorHandler=require("../middlewares/errorHandler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");
const Registeruser=asyncHandler(async(req,res)=>{
  
    const{username,emailid,password}=req.body;
    console.log(username)
    if(!username||!emailid||!password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const useravailable= await User.findOne({
        username : username
    });
    console.log(useravailable)

    console.log()
    if(useravailable){
        res.status(400);
        console.log('hii2')
        res.send('user Already Exist')
        throw new Error("user already exists");
        
        
    }
    const hashedpassword= await bcrypt.hash(password,10);
    console.log("Hashed passwordis:",hashedpassword);
    const user=await User.create({
        username,
        emailid,
        password:hashedpassword
    });
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.emailid});
    }else{
        res.status(400);
        throw new Error("user data is not valid");
    }
    res.json({message:"register the user"});
});
const loginuser=asyncHandler(async(req,res)=>{
    const {emailid,password}=req.body;
    
    if(!emailid||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({emailid});
    
    if(user&&(await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN,
        {expiresIn:"45m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    res.json({message:"login user"});
});
const currentuser=asyncHandler(async(req,res)=>{
    res.json(req.user);
});
module.exports={Registeruser,
                loginuser,
                currentuser};