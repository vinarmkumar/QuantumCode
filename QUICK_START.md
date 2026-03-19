# ⚡ QUICK START - 1v1 Contest Mode

## 🚀 Installation (2 minutes)

### Terminal 1: Backend
```bash
cd BackEnd
npm install
npm run dev
```
✅ Server running on http://localhost:3000

### Terminal 2: Frontend
```bash
cd FrontEnd
npm install
npm run dev
```
✅ App running on http://localhost:5173

---

## 🎮 How to Test

### Test Setup (2 users)
1. **User A**: Open http://localhost:5173 in Chrome
2. **User B**: Open http://localhost:5173 in Firefox (or incognito tab)

### Test Flow

**Step 1: User A - Create Room**
```
1. Login
2. Navigate to /contest
3. Click "Create Room" card
4. Click "✨ Create Room" button
5. Get room code (e.g., "ABC123")
6. Copy code
```

**Step 2: User B - Join Room**
```
1. Login (different user)
2. Navigate to /contest
3. Click "Join Room" card
4. Paste room code "ABC123"
5. Click "🚀 Join Room"
```

**Step 3: Battle Starts**
```
1. Both see countdown timer: 30:00
2. Problem loads on right panel
3. Start coding in your editor
4. Watch opponent's code update live
5. Send messages in chat
6. Click "Submit" when done
```

**Step 4: Winner Determined**
```
- Whoever clicks Submit first wins 🏆
- See result modal
- Points added (50 to winner, 25 to loser)
- Click "← Back to Problems" to exit
```

---

## 📝 Key Features to Try

✅ **Real-time Code Sync**
- Type code in your editor
- See it appear in opponent's read-only view instantly

✅ **Live Chat**
- Send messages during battle
- See opponent's messages in real-time

✅ **Timer Countdown**
- Turns red at < 5 minutes
- Pulses critically
- Auto-ends at 0:00

✅ **Language Selection**
- Change language (JavaScript, Python, C++, Java)
- Opponent sees your language choice

✅ **Submit & Win**
- First to submit wins
- See instant result modal
- Profile points update

---

## 🆘 Common Issues & Fixes

### ❌ WebSocket connection error
**Fix:** Make sure backend is running on port 3000
```bash
npm run dev  # in BackEnd folder
```

### ❌ Room code not working
**Fix:** 
- Copy-paste exact code (uppercase)
- Make sure User A still in waiting
- Refresh and try again

### ❌ Code not syncing
**Fix:**
- Check browser console (F12)
- Verify WebSocket shows in DevTools
- Restart backend: `npm run dev`

### ❌ Timer not working
**Fix:**
- System clock might be off
- Refresh page
- Check browser console for errors

---

## 🎯 What to Test

### Functionality ✅
- [ ] Create room works
- [ ] Join room works with correct code
- [ ] Join room fails with wrong code
- [ ] Both users see same problem
- [ ] Code syncs in real-time
- [ ] Chat works
- [ ] Timer counts down
- [ ] Submit button works
- [ ] Winner is determined
- [ ] Modal shows result

### UI/UX ✅
- [ ] Animations smooth
- [ ] Colors vibrant
- [ ] Text readable
- [ ] Buttons responsive
- [ ] Layout responsive on mobile
- [ ] No console errors
- [ ] Smooth transitions

### Edge Cases ✅
- [ ] User leaves room → other user notified
- [ ] Browser refresh → room persists
- [ ] Time expires → auto-end
- [ ] Both submit same time → first timestamp wins
- [ ] Network lag → eventual consistency

---

## 📱 URL Routes

| Route | Purpose |
|-------|---------|
| `/contest` | Launch page (create/join) |
| `/contest/ABC123` | Battle page for room |
| `/problems` | Back to problems |

---

## 🔗 API Endpoints

### Create Room
```
POST http://localhost:3000/api/contest/create
Response: { success, roomCode, contest }
```

### Join Room
```
POST http://localhost:3000/api/contest/join
Body: { roomCode: "ABC123" }
Response: { success, contest }
```

### Get Contest
```
GET http://localhost:3000/api/contest/ABC123
Response: { success, contest }
```

### Submit Code
```
POST http://localhost:3000/api/contest/submit
Body: { roomCode, playerId, code, language }
Response: { success, contest }
```

---

## 📊 Database Check

### View Contest Data
```javascript
// Browser Console
fetch('http://localhost:3000/api/contest/ABC123', {
    credentials: 'include'
}).then(r => r.json()).then(d => console.log(d))
```

---

## 🎬 Demo Scenario

**Time: 5 minutes**

1. Create room (0:00) - 30s
2. Both join (0:30) - 30s
3. Read problem (1:00) - 1m
4. Write code (2:00) - 2m
5. Submit & see result (4:00) - 1m
6. Total: ~4-5 minutes ✅

---

## 🏆 Scoring Examples

### Example 1: Clear Winner
```
User A submits at 10:00 → 50 pts ✅
User B submits at 11:45 → 25 pts
```

### Example 2: Time Expires
```
No one submits by 0:00 → Both get 10 pts (draw)
```

### Example 3: Late Submission
```
User A submits at 2:30 → 50 pts ✅
User B doesn't submit → 0 pts
```

---

## 💡 Tips for Best Experience

1. **Fullscreen** the battle page for best view
2. **Test on 2 browsers** - Chrome + Firefox
3. **Same problem** - Both see identical problem
4. **Read problem first** - Understand it before coding
5. **Chat taunts** - Optional but fun! 😄
6. **Mobile** - Responsive, but desktop better

---

## 🚨 Need Help?

1. **Check Console**: F12 → Console tab
2. **Check Network**: F12 → Network → WS for WebSocket
3. **Check Backend Logs**: Terminal where you ran `npm run dev`
4. **Check Frontend Logs**: Browser console (F12)

---

## 📚 Files to Check

- Backend: `BackEnd/src/index.js` (Socket.io setup)
- Frontend: `FrontEnd/src/context/ContestContext.jsx` (State)
- Routes: `FrontEnd/src/App.jsx` (New routes)
- UI: `FrontEnd/src/Components/ProblemsPage/ContestBattle.jsx`

---

## ✨ Ready? Let's Battle! ⚔️

1. Run backend & frontend
2. Open 2 browser tabs/windows
3. Login different users
4. Navigate to `/contest`
5. Click "Create Room"
6. Share code with other user
7. Watch the magic happen! 🎉

**Happy coding battles!** 🚀
