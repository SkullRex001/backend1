
const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");


const getContacts=(req,res)=>{
    console.log("the request body is:",req.body)
    const {name,email,phone}=req.body
    if(!name||!email){
        res.status(400);
        throw  new Error("All fields are mandatory");
    }
    res.status(200).json({message:"get all contacts"})
};
const createContact=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find();
    res.status(200).json(contacts)
});
const getContact=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`get contact for ${req.params.id}`})
});
const updateContact=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`update contact for ${req.params.id}`})
});
const deleteContact=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`delete contact for ${req.params.id}`})
});
module.exports={getContacts,createContact,getContact,updateContact,deleteContact};
