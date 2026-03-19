const express = require('express');
const authRouter = express.Router();
const {register, login, logout, getProfile,adminRegister} = require('../controllers/userAuthent');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
// Register
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleware,logout);
authRouter.get('/getProfile', userMiddleware, getProfile);
authRouter.post('/admin/register/first', adminRegister);
authRouter.post('/admin/register', adminMiddleware, adminRegister);


module.exports = authRouter;
 
// login

// logout

// getprofile
