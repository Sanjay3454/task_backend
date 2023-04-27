const mongoose=require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/TaskManager",{useNewUrlParser:true})

const tuser=mongoose.model("tuser",
{ 
    uname:String,
    email:String,
    password: String, 
    data:[]
})



module.exports={
    tuser,
    
}