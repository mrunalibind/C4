let mongoose=require("mongoose")
let connection=mongoose.connect("mongodb+srv://mrunali:mrunalibind@cluster0.tsxywrf.mongodb.net/IP?retryWrites=true&w=majority");

module.exports={connection}