const express=require("express");
const { loginuser, currentuser,Registeruser } = require("../controllers/userControllers");
const router=express.Router();

router.post("/register",Registeruser);
router.post("/login",loginuser);
router.get("/current",currentuser);
module.exports=router;
