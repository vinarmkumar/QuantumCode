const jwt = require("jsonwebtoken")
const User = require("../models/user");
const redisClient = require("../config/redis");

const adminMiddleware = async (req, res, next)=>{
    try{
        // Check for token in cookies first, then in Authorization header
        let token = null;
        
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization) {
            // Extract token from Bearer header
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }
        
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

        // Check both token role and database role
        const isAdmin = (payload.role === 'admin') || (result.role === 'admin');
        
        if(!isAdmin){
            return res.status(403).send("Error: Access Denied. Admins Only. Token role: " + payload.role + ", DB role: " + result.role);
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

module.exports = adminMiddleware;