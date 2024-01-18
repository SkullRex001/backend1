const mongoose=require("mongoose");

const contactSchema=mongoose.Schema({
    name : {
        type:String,
        required:[true,"Please add the contact"]
    },
    email : {
        type:String,
        required:[true,"Please add the contact email address"]
    },
},
    {
        timestamps:true,
    }
);
module.exports=mongoose.model("Contact",contactSchema)