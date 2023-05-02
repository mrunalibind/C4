let Redis=require("ioredis");
let redis=new Redis();

let auth=async(req,res,next)=>{
    try {
        redis.get("token", (err, result) => {
            if (err) {
              console.error(err);
            } else {
               next();
            }
          });
        
        res.send("Login Again");
    } catch (error) {
        
    }
}

module.exports={auth}