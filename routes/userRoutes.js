const express=require("express");
const { loginuser, currentuser,Registeruser } = require("../controllers/userControllers");
const validateToken = require("../middlewares/validateTokenHandler");
const router=express.Router();

router.post("/register",Registeruser);
router.post("/login",loginuser);
router.get("/current",validateToken,currentuser);
module.exports=router;
