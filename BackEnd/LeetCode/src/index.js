const express =  require('express')
const app = express();

require('dotenv').config();
const main = require('./config/db')
const cookieparser = require('cookie-parser');
const authRouter = require('./routes/userAuth');
const problemRouter = require('./routes/problemCreator'); // Added problem router
const userProblemRouter = require('./routes/userProblem'); // Added user problem router
const redisClient = require('./config/redis');

app.use(express.json());
app.use(cookieparser());
app.use('/user', authRouter);
app.use('/problem', problemRouter); // Mount the problem router
app.use('/solve', userProblemRouter); // Mount the user problem solver router

const InitializeConnection = async()=>{
    try{
      await Promise.all([main(), redisClient.connect()]);
     console.log("Connected to DB and Redis Successfully");
     app.listen(process.env.PORT, ()=>{
        console.log("Server listening at port number: " + process.env.PORT);
    })
    }
    catch(err){
      console.log("Error" + err);
    }
}

InitializeConnection();