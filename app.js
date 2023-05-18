require("dotenv").config()
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const port=process.env.port || 8005
require("./db/conn")
const Products=require("./models/productsSchema")
const DefaultData=require("./defaultdata")
const cors=require("cors")
const router=require("./routes/router")
const cookieParser = require("cookie-parser");
app.use(express.json())
app.use(cookieParser(""));
app.use(cors())
app.use(router)
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}
app.listen(port,()=>{
    console.log(`port running on port number ${port}`)
});
DefaultData();