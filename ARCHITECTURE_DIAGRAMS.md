# 🎮 1v1 Contest Mode - Visual Architecture & Diagrams

## 🏗️ System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          QUANTUM CODE PLATFORM                          │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React + Vite)                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  App.jsx (Router)                                               │   │
│  │  ├── ContestProvider (WebSocket Context)                       │   │
│  │  │   ├── Socket.io Client Connection                          │   │
│  │  │   ├── State: roomCode, myCode, opponentCode, etc.          │   │
│  │  │   └── Methods: joinRoom, updateCode, submitCode, etc.      │   │
│  │  │                                                              │   │
│  │  ├── Route: /contest                                           │   │
│  │  │   └── ContestLanding Component                             │   │
│  │  │       ├── Create Room UI (Contest.css)                     │   │
│  │  │       └── Join Room UI (Contest.css)                       │   │
│  │  │                                                              │   │
│  │  └── Route: /contest/:roomCode                                 │   │
│  │      └── ContestBattle Component                              │   │
│  │          ├── Header (Timer, Title, Exit)                      │   │
│  │          ├── Left Editor: Your Code                           │   │
│  │          ├── Right Editor: Opponent Code (Read-only)          │   │
│  │          └── Right Panel: Problem + Chat (ContestBattle.css)  │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Services:                                                              │
│  ├── contestApi.js - REST API calls                                   │
│  └── Socket.io-client - WebSocket events                             │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
                                    ↕ (HTTP + WebSocket)
┌──────────────────────────────────────────────────────────────────────────┐
│                      BACKEND (Express + Node.js)                        │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Express Server (index.js)                                      │   │
│  │  ├── HTTP Routes (CORS Middleware)                             │   │
│  │  ├── Socket.io Server                                          │   │
│  │  │   └── Real-time Communication Handler                       │   │
│  │  └── Database Connections (MongoDB + Redis)                    │   │
│  │                                                                 │   │
│  ├─ routes/contest.js                                              │   │
│  │  ├── POST /api/contest/create → createContestRoom             │   │
│  │  ├── POST /api/contest/join → joinContestRoom                 │   │
│  │  ├── GET /api/contest/:roomCode → getContestByRoomCode        │   │
│  │  ├── POST /api/contest/submit → submitCode                    │   │
│  │  └── PUT /api/contest/:roomCode/end → endContest              │   │
│  │                                                                 │   │
│  ├─ controllers/contestController.js                               │   │
│  │  ├── Room generation logic                                     │   │
│  │  ├── Player management                                         │   │
│  │  ├── Contest status updates                                    │   │
│  │  └── Winner determination                                      │   │
│  │                                                                 │   │
│  ├─ utils/roomManager.js                                          │   │
│  │  ├── addUserToRoom()                                           │   │
│  │  ├── removeUserFromRoom()                                      │   │
│  │  ├── updatePlayerCode()                                        │   │
│  │  ├── submitPlayerCode()                                        │   │
│  │  └── getRoom()                                                 │   │
│  │                                                                 │   │
│  ├─ Socket.io Events Handler                                      │   │
│  │  ├── join-room → broadcast: user-joined                        │   │
│  │  ├── code-update → broadcast: opponent-code-update             │   │
│  │  ├── submit-code → broadcast: player-submitted                 │   │
│  │  ├── send-message → broadcast: new-message                     │   │
│  │  └── leave-room → broadcast: user-left                         │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Middleware:                                                            │
│  ├── userMiddleware - JWT validation                                  │
│  └── CORS - Cross-origin requests                                     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
                                    ↕ (Mongoose)
┌──────────────────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB + Redis)                           │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  MongoDB Collections:                                                   │
│  ├── users                                                              │
│  │   └── User Profile + Stats                                         │
│  │                                                                      │
│  ├── problems                                                           │
│  │   └── Problem Data (title, description, test cases, etc.)         │
│  │                                                                      │
│  └── contests (NEW)                                                     │
│      ├── roomCode (unique)                                             │
│      ├── player1 & player2 (userId, code, status, points)             │
│      ├── problem (reference)                                           │
│      ├── status (waiting/active/completed)                             │
│      ├── timer (start/end time)                                        │
│      └── winner (player1/player2/draw)                                 │
│                                                                          │
│  Redis (Sessions):                                                      │
│  ├── Token Blacklist (logout)                                          │
│  └── Session Cache                                                      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                          EXTERNAL SERVICES                              │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Judge0 API (Code Execution)                                            │
│  └── For future: Run user-submitted code against test cases            │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 WebSocket Communication Flow

```
                    CLIENT A                       SERVER                       CLIENT B
                       |                             |                            |
                       |                             |                            |
    [1] USER JOINS     |                             |                            |
    ─────────────────> |  emit('join-room')  ┌──────────────┐                    |
                       |                     │  RoomManager │                    |
                       |                     │ .addUserToRoom                    |
                       |                     └──────────────┘                    |
                       |<─────── broadcast: user-joined ─────────────────────────>|
                       |                     |                            [receives]
                       |                     |                                    |
    [2] CODE SYNC      |                     |                                    |
    ─────────────────> |  emit('code-update')|─────────────────────┐             |
    [typing works]     |                     |                     |             |
                       |                     |  updatePlayerCode   |             |
                       |<── broadcast: opponent-code-update ────────────────────>|
                       |                     |  [read-only view]   |             |
                       |                     |                     |             |
                       |                     |  (REPEAT FOR EVERY  |             |
                       |                     |   KEYSTROKE)        |             |
                       |                     |                     |             |
    [3] CHAT           |                     |                     |             |
    ─────────────────> |  emit('send-message'|─────────────────────┐             |
    [sends message]    |                     |                     |             |
                       |<── broadcast: new-message ────────────────────────────> |
                       |                     |                                   |
                       |                     |                                   |
    [4] SUBMIT CODE    |                     |                                   |
    ─────────────────> | emit('submit-code') |─────────────────────┐            |
                       |                     |  submitPlayerCode   |            |
                       |                     |  points += 50       |            |
                       |<── broadcast: player-submitted ─────────────────────────>|
                       | [WINNER! 50 pts]    | [2nd place! 25 pts] | [receives] |
                       |                     |                                   |
                       |                     | [If time expired or  |            |
                       |                     |  both submitted →    |            |
                       |                     |  Determine Winner]   |            |
                       |                     |                                   |
    [5] LEAVE ROOM     |                     |                                   |
    ─────────────────> | emit('leave-room')  |─────────────────────┐             |
                       |                     | removeUserFromRoom  |             |
                       |                     └──────────────────────┘             |
                       |<──── broadcast: user-left ─────────────────────────────>|
                       |                     |                            [receives]
```

---

## 📱 UI Layout Diagram - Battle Page

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            BATTLE HEADER (100px)                             │
│  ⚔️ 1v1 Challenge  │  Problem: Two Sum    │      ⏱️ 30:00      │  ✕ Exit    │
└────────┬────────────────────────────────────┬──────────────────┬──────┬──────┘
         │                                    │                  │      │
         │                                    │                  │      │
         │                                    │                  │      │
┌────────▼────────────────────┐  ┌────────────▼──────────────┐  │      │
│   YOUR CODE (LEFT)           │  │  OPPONENT'S CODE (RIGHT)  │  │      │
│  ────────────────────────── │  │  ────────────────────────│  │      │
│ 🔵 You        [⏳ Solving]  │  │ 🔴 Opponent  [⏳ Solving]│  │      │
│                              │  │                          │  │      │
│ [JavaScript ▼]               │  │ [JavaScript ▼] (disabled)│  │      │
│ ┌──────────────────────────┐ │  │ ┌──────────────────────┐ │  │      │
│ │                          │ │  │ │  (opponent's code)   │ │  │      │
│ │  function twoSum(arr) {  │ │  │ │  auto-updating...   │ │  │      │
│ │    // Your code here      │ │  │ │                    │ │  │      │
│ │  }                        │ │  │ │                    │ │  │      │
│ │                          │ │  │ │                    │ │  │      │
│ │                          │ │  │ │                    │ │  │      │
│ └──────────────────────────┘ │  │ └──────────────────────┘ │  │      │
│                              │  │                          │  │      │
│ [🚀 Submit Solution]         │  │ Opponent: Waiting...    │  │      │
│                              │  │                          │  │      │
└────────┬────────────────────┘  └────────────┬──────────────┘  │      │
         │                                    │                  │      │
         │                (SPLIT 60% | 40%)  │                  │      │
         │                                    │                  │      │
         └────────────────────────────────────┴──────────────────┘      │
                                                                         │
         ┌──────────────────────────────────────────────────────────────┤
         │                    RIGHT PANEL (33%)                         │
         │  ──────────────────────────────────────────────────────    │
         │  [Description]                                             │
         │                                                             │
         │  Two Sum                                        [Easy]      │
         │                                                             │
         │  Given an array of integers nums and an integer target...  │
         │                                                             │
         │  📋 Constraints:                                           │
         │  2 <= nums.length <= 10^4                                 │
         │  -10^9 <= nums[i] <= 10^9                                 │
         │                                                             │
         │  🔍 Examples:                                              │
         │  Input: nums = [2,7,11,15], target = 9                    │
         │  Output: [0,1]                                             │
         │                                                             │
         │  ─────────────────────────────────────────────────── │
         │                   💬 CHAT SECTION                      │
         │  ─────────────────────────────────────────────────── │
         │  .                                                      │
         │  You: Good luck! 🚀                                     │
         │  Opponent: Thanks! You too!                             │
         │  You: First one done here...                            │
         │                                                         │
         │  ┌──────────────────────────────────┐                  │
         │  │ Send a message... |_ [SEND]      │                  │
         │  └──────────────────────────────────┘                  │
         │                                                         │
         └─────────────────────────────────────────────────────────┘
```

---

## 🎯 Data Flow - Contest Creation

```
USER A CLICKS "CREATE ROOM"
     │
     ├─> Frontend: contestApi.createRoom()
     │   │
     │   └─> Backend: POST /api/contest/create
     │       │
     │       ├─> Generate roomCode = generateRoomCode() → "ABC123"
     │       ├─> Fetch random problem
     │       ├─> Create Contest in MongoDB
     │       │   {
     │       │     roomCode: "ABC123",
     │       │     player1: { userId: User_A_ID, username: "Alex" },
     │       │     problem: Problem_ID,
     │       │     status: "waiting",
     │       │     timeLimit: 1800
     │       │   }
     │       └─> Response: { success, roomCode, contest }
     │
     └─> Frontend: Store roomCode in state
         │
         ├─> Navigate to /contest/ABC123
         ├─> Join WebSocket room
         │   socket.emit('join-room', { roomCode, userId, username })
         │
         └─> Show "Waiting for opponent..." screen
             │
             └─ Wait... 
                │
                └─> USER B JOINS
                    │
                    ├─> Backend verifies room exists
                    ├─> Adds player2 to contest
                    ├─> Changes status: "waiting" → "active"
                    ├─> Records timeStarted
                    │
                    └─> Socket: broadcast user-joined
                        │
                        ├─> User A receives update
                        ├─> User B receives confirmation
                        │
                        └─> BATTLE STARTS!
                            ├─ Timer: 30:00
                            ├─ Problem loads
                            ├─ Editors activate
                            └─ Real-time sync begins
```

---

## 📊 Scoring Decision Tree

```
BATTLE ENDS (Time expired or both submitted)
     │
     ├─> Check if player1.isSubmitted
     │   │
     │   ├─ YES ┬─> Check if player2.isSubmitted
     │   │      │   │
     │   │      │   ├─ YES ┬─> Compare submission times
     │   │      │   │      │   │
     │   │      │   │      │   ├─ P1 first → P1 = 50, P2 = 25 [WINNER: P1]
     │   │      │   │      │   │
     │   │      │   │      │   └─ P2 first → P1 = 25, P2 = 50 [WINNER: P2]
     │   │      │   │      │
     │   │      │   │      │
     │   │      │   └─ NO ──────→ P1 = 50, P2 = 0 [WINNER: P1]
     │   │      │
     │   │      │
     │   └─ NO ─┤
     │          │
     │          ├─> Check if player2.isSubmitted
     │          │   │
     │          │   ├─ YES ──────→ P1 = 0, P2 = 50 [WINNER: P2]
     │          │   │
     │          │   └─ NO ──────→ P1 = 10, P2 = 10 [DRAW]
     │          │
     │          │
     │          └─> No submissions ──→ [DRAW]
     │
     └─> Save to MongoDB
         Update userStats
         Emit result modal
         Return to problems
```

---

## 🔐 Authentication & Security Flow

```
USER LOGIN
   │
   ├─> POST /user/login (email, password)
   ├─> Backend:
   │   ├─ Find user by email
   │   ├─ Compare password (bcrypt)
   │   └─ Generate JWT token (1 hour expiry)
   │
   └─> Response: JWT in HTTP-only cookie
       │
       ├─> Frontend stores in context
       ├─> All requests include credentials: true
       │
       └─> Can now access protected routes
           │
           └─> POST /api/contest/create
               │
               ├─> Check JWT in cookies
               ├─> Verify token not blacklisted (Redis)
               ├─> Extract userId from token
               ├─> Create contest with this userId
               │
               └─> ✅ Verified & Authorized
```

---

## 🌐 Responsive Layout Diagram

### Desktop (1200px+)
```
┌──────┬──────────────────────────────┬─────────┐
│      │                              │         │
│      │      BATTLE AREA             │ PROBLEM │
│      │      (2 EDITORS)             │  CHAT   │
│      │                              │         │
└──────┴──────────────────────────────┴─────────┘
  60%          40%                         33%
```

### Tablet (768px - 1199px)
```
┌────────────────────────────────┐
│                                │
│      BATTLE AREA               │
│      (2 EDITORS STACKED)       │
│                                │
├────────────────────────────────┤
│     PROBLEM + CHAT             │
│    (BELOW EDITORS)             │
│                                │
└────────────────────────────────┘
```

### Mobile (< 768px)
```
┌──────────────────┐
│  YOUR EDITOR     │
├──────────────────┤
│ OPPONENT EDITOR  │
├──────────────────┤
│ PROBLEM PANEL    │
├──────────────────┤
│ CHAT SECTION     │
└──────────────────┘
```

---

## 🔗 API Call Sequence Diagram

```
Frontend                          Backend                         Database

1. Create Room
  createRoom()
  ──POST /api/contest/create──>
                                Generate roomCode
                                Fetch random problem
                                Create Document
                                <──── Response ──────────────>
  Store roomCode
  
2. Join Room
  joinRoom(code)
  ──POST /api/contest/join──>
                                Find contest
                                Add player2
                                Update status
                                <──── Response ──────────────>
  Navigate to battle
  
3. Battle Operations
  submitCode()
  ──POST /api/contest/submit──>
                                Update player code
                                Mark submitted
                                <──── Response ──────────────>
  Show result modal
  
4. End Contest
  endContest()
  ──PUT /api/contest/:id/end──>
                                Determine winner
                                Award points
                                Save result
                                <──── Response ──────────────>
  Display result modal
```

---

## ✨ Animation Trigger Points

```
PAGE LOAD
   │
   ├─> Hero background: gradientShift (continuous)
   ├─> Title: titleGlow + titleFloat (2s loop)
   ├─> Cards: shimmer on card (3s loop)
   │   Staggered: card1 (0s), card2 (0.2s), card3 (0.4s)
   │
   └─> Info items: pulse (2s loop)

CARD HOVER
   │
   ├─> Border: brighten
   ├─> Background: darken
   ├─> Icon: rotate + bounce
   └─> Scale: -10px up

BUTTON CLICK
   │
   ├─> On hover: scale 1.05 + glow intensify
   ├─> On active: scale 0.95 (down press)
   └─> On submit: disable + fade

BATTLE START
   │
   ├─> Editors: slideIn (0.3s)
   ├─> Panel: slideIn from right (0.3s)
   ├─> Timer: begins pulsing
   └─> Status badges: fadeIn

TIMER CRITICAL (< 5:00)
   │
   ├─> Color: cyan → red
   ├─> Animation: pulse 0.5s (1.0 → 1.1 scale)
   ├─> Text-shadow: intensify
   └─> Urgency: felt by player

SUBMISSION
   │
   ├─> Button: disable + green glow
   ├─> Status: fadeOut "SOLVING" → fadeIn "SUBMITTED"
   ├─> Modal: scale pop-in (0.3s)
   └─> Result: color change (green/red)
```

---

This architecture ensures:
- ✅ Real-time synchronization
- ✅ Scalable room management
- ✅ Persistent data storage
- ✅ Beautiful user experience
- ✅ Secure authentication
- ✅ Responsive design

**All diagrams represent the complete 1v1 Contest Mode implementation!** 🎮⚔️
