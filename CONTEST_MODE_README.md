# 🎮 1v1 Live Contest Mode - Implementation Guide

## Overview
This feature enables real-time 1v1 coding competitions between users with WebSocket-based live updates, real-time code sharing, and automatic winner determination.

---

## 🏗️ Architecture

### Backend Stack
- **Express.js** - REST API
- **Socket.io** - Real-time WebSocket communication
- **MongoDB** - Persistent storage
- **Redis** - Session/token management
- **Judge0 API** - Code execution

### Frontend Stack
- **React 19** - UI framework
- **React Router 7** - Navigation
- **Monaco Editor** - Code editing
- **Socket.io Client** - Real-time client
- **TailwindCSS** - Styling

---

## 📁 File Structure

### Backend Files Created
```
BackEnd/src/
├── models/
│   └── contest.js                 # Contest schema
├── controllers/
│   └── contestController.js       # Contest business logic
├── routes/
│   └── contest.js                 # Contest API routes
├── utils/
│   └── roomManager.js             # In-memory room management
└── index.js                       # Updated with Socket.io
```

### Frontend Files Created
```
FrontEnd/src/
├── context/
│   └── ContestContext.jsx         # Contest state management
├── Components/ProblemsPage/
│   ├── ContestLanding.jsx         # Room join/create interface
│   ├── ContestBattle.jsx          # Live battle interface
│   ├── Contest.css                # Landing page styles
│   └── ContestBattle.css          # Battle page styles
├── services/
│   └── contestApi.js              # Contest API wrapper
└── App.jsx                        # Updated routes
```

---

## 🚀 How It Works

### Step 1: Create Room
```
User A clicks "Create Room"
  ↓
Backend generates unique 6-char room code (e.g., "ABC123")
  ↓
Random problem selected from database
  ↓
Contest created in MongoDB with player1 = User A
  ↓
User A joins WebSocket room
```

### Step 2: Join Room
```
User B enters room code
  ↓
Backend verifies room exists and is waiting
  ↓
User B added as player2
  ↓
Contest status changed to "active"
  ↓
Timer starts: 30 minutes (1800 seconds)
  ↓
Both users join WebSocket room
```

### Step 3: Live Battle
```
Both editors connected via Socket.io
↓
Each keystroke broadcast to opponent
  ↓
Real-time code sync (read-only for opponent)
  ↓
Timer counts down
  ↓
Chat for communication between players
```

### Step 4: Submission & Winner
```
Player submits code
  ↓
Status updated: "SUBMITTED" ✅
  ↓
Points awarded (50 to first, 25 to second)
  ↓
Time recorded
  ↓
When time up or both submitted → Results modal
```

---

## 📡 WebSocket Events

### Client → Server
```javascript
// Join room
socket.emit('join-room', { roomCode, userId, username });

// Send code update
socket.emit('code-update', { roomCode, code, language });

// Submit code
socket.emit('submit-code', { roomCode, code, language, result });

// Send message
socket.emit('send-message', { roomCode, message, username });

// Leave room
socket.emit('leave-room', roomCode);
```

### Server → Client
```javascript
// User joined
socket.on('user-joined', { players, message });

// Opponent code updated
socket.on('opponent-code-update', { language, opponentCode });

// Player submitted
socket.on('player-submitted', { players, message });

// New message
socket.on('new-message', { username, message, timestamp });

// User left
socket.on('user-left', { players, message });
```

---

## 🛣️ Routes

### Contest Routes

#### POST /api/contest/create
- **Auth:** Required (userMiddleware)
- **Response:** `{ success, roomCode, contest }`
- Creates new contest room

#### POST /api/contest/join
- **Auth:** Required
- **Body:** `{ roomCode }`
- **Response:** `{ success, contest }`
- Join existing room

#### GET /api/contest/:roomCode
- **Auth:** Required
- **Response:** `{ success, contest }`
- Fetch contest details

#### POST /api/contest/submit
- **Auth:** Required
- **Body:** `{ roomCode, playerId, code, language }`
- **Response:** `{ success, contest }`
- Submit code

#### PUT /api/contest/:roomCode/end
- **Auth:** Required
- **Response:** `{ success, winner, contest }`
- End contest and determine winner

---

## 🎯 Contest Model

```javascript
{
  roomCode: String (unique, 6 chars),
  player1: {
    userId: ObjectId,
    username: String,
    code: String,
    language: String,
    isSubmitted: Boolean,
    submittedAt: Date,
    result: { status, time, memory, output },
    points: Number
  },
  player2: { ...same as player1 },
  problem: ObjectId (ref: Problem),
  problemTitle: String,
  difficulty: String,
  status: 'waiting' | 'active' | 'completed',
  timeLimit: 1800 (seconds),
  timeStarted: Date,
  timeEnded: Date,
  winner: 'player1' | 'player2' | 'draw' | null,
  winnerUserId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Pages

### 1. Contest Landing (`/contest`)
**UI: Beautiful gradient with 3 modes**

- **Home Mode**: Shows "Create Room" & "Join Room" options
- **Create Mode**: Shows creation form with tips
- **Join Mode**: Shows room code input with tips

**Features:**
- Animated background
- Smooth transitions
- Glowing text effects
- Info cards

### 2. Contest Battle (`/contest/:roomCode`)
**UI: 3-column split layout**

**Left Column (60px):**
- Timer (critical at < 5 min)
- Problem title
- Exit button

**Center (2 columns):**
- **Your Editor** (left)
  - Language selector
  - Monaco editor
  - Submit button
  - Status badge
  
- **Opponent Editor** (right)
  - Read-only code
  - Shows opponent status
  - Language match

**Right Column (33%):**
- Problem description tab
- Constraints & Examples
- Live chat section

---

## 🔧 Setup Instructions

### Backend Setup

1. **Install dependencies**
```bash
cd BackEnd
npm install
```

2. **Configure environment**
```env
PORT=3000
DB_CONNECT_STRING=mongodb+srv://...
JWT_KEY=your_secret_key
JUDGE0_API_KEY=your_judge0_key
```

3. **Run backend**
```bash
npm run dev
```

### Frontend Setup

1. **Install dependencies**
```bash
cd FrontEnd
npm install
```

2. **Configure API URL** (if needed)
Update `FrontEnd/src/services/contestApi.js` and `ContestContext.jsx` with your backend URL

3. **Run frontend**
```bash
npm run dev
```

### Database Migrations

The Contest model will be auto-created on first use. Ensure:
- MongoDB is running
- Connection string is valid
- Collections: `users`, `problems`, `contests`

---

## 🎮 User Flow

### Complete User Journey

```
1. User logs in → /auth
2. Navigates to /contest
3. Sees: Create Room | Join Room
4. Option A - Create:
   - Clicks Create
   - Gets room code (e.g., "XYZ789")
   - Shares with friend
   - Waits for opponent
5. Friend:
   - Goes to /contest
   - Selects Join
   - Enters "XYZ789"
   - Joins room → /contest/XYZ789
6. Battle starts:
   - 30-minute timer
   - Random problem loads
   - Both write code
   - Can see opponent's code
   - Can chat
7. Win condition:
   - First to submit wins
   - Or time runs out (10+10 pts)
   - Modal shows result
   - Points added to profile
```

---

## 📊 Scoring System

| Scenario | Player 1 | Player 2 |
|----------|----------|----------|
| P1 submits first | **50** 🏆 | 25 |
| P2 submits first | 25 | **50** 🏆 |
| Both submit | First wins 50 | Loses 25 |
| No submission | 10 (draw) | 10 (draw) |
| Time expired | 10 | 10 |

---

## 🐛 Troubleshooting

### WebSocket Connection Failed
- Check if backend is running on port 3000
- Verify CORS settings in Socket.io
- Check browser console for errors

### Room Not Found
- Verify room code is correct
- Room must still be in "waiting" status
- Room expires after 24 hours (optional)

### Code Not Syncing
- Check WebSocket connection status
- Verify Socket.io events are emitted
- Check browser DevTools → Network → WS

### Timer Issues
- Ensure system time is synchronized
- Check if timer interval is cleared on component unmount
- Verify timeRemaining state updates

---

## 🚀 Features Implemented

✅ Real-time 1v1 battles
✅ WebSocket code sync
✅ 30-minute timer with critical warning
✅ Automatic winner determination
✅ Live chat between players
✅ Beautiful animated UI
✅ Responsive design
✅ Database persistence
✅ Room management
✅ Score tracking

---

## 📈 Future Enhancements

- [ ] Leaderboard (all-time, weekly, daily)
- [ ] Tournament mode (multiple rounds)
- [ ] Replay functionality
- [ ] Video playback of battles
- [ ] Friend requests system
- [ ] Achievements & badges
- [ ] Stream integration
- [ ] Discord notifications
- [ ] Mobile app
- [ ] Global matchmaking

---

## 🎯 Testing Checklist

- [ ] Create room generates unique code
- [ ] Join room with valid code
- [ ] Join room with invalid code shows error
- [ ] Timer starts when both enter
- [ ] Code syncs real-time to opponent
- [ ] Submit button disables after submission
- [ ] Winner determined by submission time
- [ ] Chat messages appear for both
- [ ] Leave room disconnects properly
- [ ] Score updates in profile

---

## 📞 Support

For issues or questions:
1. Check console errors (F12 → Console)
2. Verify backend/frontend URLs
3. Check WebSocket connection in DevTools
4. Review logs in terminal

---

**Happy Coding Battles! 🚀⚔️**
