const jwt = require("jsonwebtoken")
const User = require("../models/user");
const redisClient = require("../config/redis");

const UserMiddleware = async (req, res, next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).send("Error: Token is not present");
        }
        const payload = jwt.verify(token, process.env.JWT_KEY);

        const {_id} = payload;
        if(!_id){
            return res.status(401).send("Error: Invalid token");
        }

        const result = await User.findById(_id);

        if(!result){
            return res.status(404).send("Error: User Doesn't Exist");
        }

        // Check if token is in Redis blocklist
       const IsBlocked = await redisClient.exists(`token:${token}`);

       if(IsBlocked){
        return res.status(401).send("Error: Invalid Token");
       }

       req.result = result;
       next();

    }
    catch(err){
        res.status(401).send("Error: " + err.message);
    }
}

module.exports = UserMiddleware;