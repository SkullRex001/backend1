const express=require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv=require("dotenv").config();


connectDb();
const app=express();
app.use(express.json());

const port=process.env.PORT||3000;
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(3000,()=>{
    console.log(`server is running on port ${port}`)
}); 