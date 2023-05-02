let express=require("express");
let userRouter=express.Router();
let ip=require("ip");
let Redis=require("ioredis");
let redis=new Redis();
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken");

ip=ip.address();
// ip=`${ip}`;
// console.log(ip);
var ipapi = require('ipapi.co');
const { UserModel } = require("../model/user_model");
const { auth } = require("../model/middleware/auth_midd");

userRouter.post("/register",async(req,res)=>{
    
    try {
        let {name,email,password}=req.body;
        let user=await UserModel.findOne({email});
        if(user){
            return res.send("User is already present");
        }
        bcrypt.hash(password,4,async function(err,hash){
            let user=new UserModel({name,email,password:hash});
            await user.save();
            res.send("Regsitered Successfull");
        });
        

    } catch (error) {
        res.send(error.message);
    }
})

userRouter.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body;
        let user=await UserModel.findOne({email});
        if(!user){
            return res.send("Wrong credentials");
        }
        bcrypt.compare(password,user.password,function(err,result){
            if(result){
                let token=jwt.sign({email:user.email},"token");
                redis.set("token",token);
                res.send({msg:"Login Successfull",token:token});
                
            }
        })
    } catch (error) {
        res.send(error.message);
    }
})

userRouter.get("/city",auth,async(req,res)=>{
    // if(redis.get("city")){
    //     return res.send(redis.get("city"))
    // }
    var callback = function(loc){
        console.log(loc)
        res.send(loc);
        redis.set("city",loc);
    };
    ipapi.location(callback, '', '', 'city')
})

userRouter.get("/logout",async(req,res)=>{
    try {
        redis.del("token");
        res.send("Log Out Successfull");
    } catch (error) {
        res.send(error.message);
    }
})

module.exports={userRouter};