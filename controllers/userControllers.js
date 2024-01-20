const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");
const Registeruser=asyncHandler(async(req,res)=>{
    const{username,emailid,password}=req.body;
    if(!username||!emailid||!password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const useravailable=User.findOne();
    if(useravailable){
        res.status(400);
        throw new Error("user already exists");
    }
    const hashedpassword=bcrypt.hash(password,10);
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
        {expiresIn:"1m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    res.json({message:"login user"});
});
const currentuser=asyncHandler(async(req,res)=>{
    res.json({message:"current user information"});
});
module.exports={Registeruser,
                loginuser,
                currentuser};