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
app.use(cors({
    origin: ['https://amazon-clone-mo33.onrender.com'],
    credentials:true,
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
}))
app.use(router)

app.listen(port,()=>{
    console.log(`port running on port number ${port}`)
});
DefaultData();