
const User = require("../models/user")
const validate = require('../utils/validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');


const register = async(req,res)=>{
    try{
    validate(req.body);
    const {firstname, emailId, password} = req.body;
    req.body.password = await bcrypt.hash(password,10);
    req.body.role = 'user';
    const user = await User.create(req.body);
    const  token = jwt.sign({_id:user._id,emailId: emailId,role: 'user'}, process.env.JWT_KEY, {expiresIn: '1h'});
    res.cookie('token', token, {maxAge: 60*60*1000});
    res.status(201).send("User Registered Successfully");
    }

    catch(err){
        res.status(400).send("Error:" + err.message);

    }

}

const login = async(req,res)=>{
    try{
        const {emailId, password} = req.body;
        if(!emailId || !password){
            return res.status(400).send("Error: Invalid Credentials");
        }
        const user = await User.findOne({emailId});

        if(!user){
            return res.status(401).send("Error: User not found");
        }

        const match = await bcrypt.compare(password,user.password);

        if(!match){
            return res.status(401).send("Error: Invalid Credentials");
        }

        const  token = jwt.sign({_id:user._id,emailId: emailId,role: user.role}, process.env.JWT_KEY, {expiresIn: '1h'});
        res.cookie('token', token, {maxAge: 60*60*1000});
        res.status(200).send("Login Successful");

    }
    catch(err){
        res.status(401).send("Error:" + err.message);

    }
}

// logout feature
const logout = async(req, res)=>{
    try{
        const {token} = req.cookies;

        if(!token){
            return res.status(400).send("Error: Token not found");
        }

        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`, JSON.stringify(payload));
        await redisClient.expireAt(`token:${token}`, payload.exp);
        
        res.cookie("token", null, {expires: new Date(Date.now())});
        res.status(200).send("Logout Successful");
    }
    catch(err){
       res.status(401).send("Error: " + err.message);

    }
}

const adminRegister = async(req, res)=>{
   try{
    validate(req.body);
    const {firstname, emailId, password} = req.body;
    req.body.password = await bcrypt.hash(password,10);
    // req.body.role = 'admin';
    const user = await User.create(req.body);
    const  token = jwt.sign({_id:user._id,emailId: emailId,role: user.role}, process.env.JWT_KEY, {expiresIn: '1h'});
    res.cookie('token', token, {maxAge: 60*60*1000});
    res.status(201).send("Admin Registered Successfully");
    }

    catch(err){
        res.status(400).send("Error:" + err.message);

    }

}


const getProfile = async(req, res)=>{
    try{
        const user = req.result;
        res.status(200).send(user);
    }
    catch(err){
        res.status(400).send("Error: " + err.message);
    }
}

module.exports = {
    register,
    login,
    logout,
    getProfile,
    adminRegister
}