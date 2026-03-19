const express =  require('express')
const app = express();
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();
const main = require('./config/db')
const cookieparser = require('cookie-parser');
const authRouter = require('./routes/userAuth');
const problemRouter = require('./routes/problems');
const contestRouter = require('./routes/contest');
const testRouter = require('./routes/test');
const redisClient = require('./config/redis');
const RoomManager = require('./utils/roomManager');

// Suppress unhandled Redis errors
redisClient.on('error', (err) => {
  console.warn('⚠️  Redis error (non-fatal):', err.message);
});

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieparser());
app.use('/user', authRouter);
app.use('/api/problems', problemRouter);
app.use('/api/contest', contestRouter);
app.use('/api/tests', testRouter);

// Create HTTP server for Socket.io
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST']
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join contest room
  socket.on('join-room', (data) => {
    const { roomCode, userId, username } = data;
    socket.join(roomCode);

    const room = RoomManager.addUserToRoom(roomCode, userId, socket.id, username);
    
    // Broadcast to all users in room
    if (room && room.players) {
      io.to(roomCode).emit('user-joined', {
        players: room.players,
        message: `${username} joined the room`
      });
    }

    console.log(`User ${username} joined room ${roomCode}`);
  });

  // Update code in real-time
  socket.on('code-update', (data) => {
    const { roomCode, code, language } = data;
    const room = RoomManager.updatePlayerCode(roomCode, socket.id, code, language);

    // Broadcast to both players
    io.to(roomCode).emit('opponent-code-update', {
      language,
      opponentCode: code
    });
  });

  // Submit code
  socket.on('submit-code', (data) => {
    const { roomCode, code, language, result } = data;
    const room = RoomManager.submitPlayerCode(roomCode, socket.id);

    if (room && room.players) {
      io.to(roomCode).emit('player-submitted', {
        players: room.players,
        message: 'A player submitted their solution!'
      });
    }

    console.log(`Player submitted code in room ${roomCode}`);
  });

  // Contest completed - broadcast winner to both players
  socket.on('contest-completed', (data) => {
    const { roomCode, winner, winnerUserId, contest } = data;
    io.to(roomCode).emit('contest-ended', {
      winner,
      winnerUserId,
      contest
    });
    console.log(`Contest completed in room ${roomCode}. Winner: ${winner}`);
  });

  // Send message
  socket.on('send-message', (data) => {
    const { roomCode, message, username } = data;
    io.to(roomCode).emit('new-message', {
      username,
      message,
      timestamp: new Date()
    });
  });

  // Leave room
  socket.on('leave-room', (roomCode) => {
    socket.leave(roomCode);
    const room = RoomManager.removeUserFromRoom(roomCode, socket.id);
    
    if (room) {
      io.to(roomCode).emit('user-left', {
        players: room.players,
        message: 'A player left the room'
      });
    }

    console.log(`User left room ${roomCode}`);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


const InitializeConnection = async()=>{
    try{
      // Connect to MongoDB (required)
      await main();
      console.log("✅ Connected to MongoDB");

      // Connect to Redis (optional - server starts even if Redis is down)
      try {
        await redisClient.connect();
        console.log("✅ Connected to Redis");
      } catch (redisErr) {
        console.warn("⚠️  Redis connection failed (running without Redis - logout token blacklist disabled):", redisErr.message);
      }

      server.listen(parseInt(process.env.PORT), ()=>{
        console.log("🚀 Server listening at port number: " + process.env.PORT);
        console.log("🔌 WebSocket server ready");
      })
    }
    catch(err){
      console.log("❌ Fatal Error: " + err);
    }
}

InitializeConnection();




