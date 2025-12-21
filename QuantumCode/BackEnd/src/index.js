const express =  require('express')
const app = express();
const cors = require('cors');

require('dotenv').config();
const main = require('./config/db')
const cookieparser = require('cookie-parser');
const authRouter = require('./routes/userAuth');
const problemRouter = require('./routes/problems');
const redisClient = require('./config/redis');

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieparser());
app.use('/user', authRouter);
app.use('/api/problems', problemRouter);


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




