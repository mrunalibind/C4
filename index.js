let express=require("express");
const { userRouter } = require("./route/user_route");
const { connection } = require("./db");

let app=express();
app.use(express.json());
app.use("/user",userRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected To Db");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running");
})