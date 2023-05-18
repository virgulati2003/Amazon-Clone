const mongoose=require("mongoose")
const DB="mongodb+srv://vir123:Vir%402208@cluster0.2uaeynv.mongodb.net/Amazonweb?retryWrites=true&w=majority"
mongoose.connect(DB).then(()=>console.log("connection is successfully done")).catch((error)=>console.log("error hai" + error.message))