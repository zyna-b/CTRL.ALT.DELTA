# Delta-1 Bot - Complete Testing Guide

## Quick Start (5 minutes)

### 1. Start the Backend
```bash
cd backend
python main.py
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### 2. Start the Frontend (new terminal)
```bash
cd root directory
pnpm dev
# or: npm run dev
```

**Expected output:**
```
▲ Next.js 14.x.x
  Local: http://localhost:3000
  Ready in 2.4s
```

### 3. Open Browser & Test
- Go to `http://localhost:3000`
- Click the pink **Delta-1** button (bottom-right corner)
- Type a message and click **Send**

---

## Full Test Suite

### Test 1: Basic Conversation
**Purpose**: Verify chat is working  
**Steps**:
1. Open bot
2. Type: `"Hello, who are you?"`
3. Send

**Expected Result**:
- Bot responds with introduction
- Name contains "Delta-1"
- Mentions services offered
- Response appears in real-time (streaming)

✅ **Pass Criteria**: Response appears within 3 seconds

---

### Test 2: Quick Commands
**Purpose**: Verify suggested actions work  
**Steps**:
1. Open bot (should show 4 quick command buttons)
2. Click: `"What services do you offer?"`

**Expected Result**:
- Button disappears after click
- Bot responds about services
- Mentions: AI automation, chatbots, lead generation, MVP development

✅ **Pass Criteria**: Response is specific and relevant

---

### Test 3: Lead Saving (Most Important)
**Purpose**: Verify lead capture works end-to-end  
**Steps**:
1. Type: `"I want to book a discovery call"`
2. Bot asks for name
3. Type your name (e.g., `"John Smith"`)
4. Bot asks for email
5. Type email (e.g., `"john@example.com"`)
6. Bot shows available slots
7. Type: `"2025-01-24T10:00:00"` (or similar)
8. Confirm booking

**Expected Flow**:
```
You: I want to book a discovery call
Bot: ✓ Great! Let me get your information. What's your full name?

You: John Smith
Bot: Thanks John! What's your email address?

You: john@example.com
Bot: Available times:
    1. Monday, Jan 24 at 10:00 AM (ID: 2025-01-24T10:00:00)
    2. Monday, Jan 24 at 2:00 PM (ID: 2025-01-24T14:00:00)
    ... more times ...

You: 2025-01-24T10:00:00
Bot: ✓ Confirmed! Call scheduled for Monday, January 24 at 10:00 AM. 
     Check your email at john@example.com for the calendar invite.
```

**Expected Result**:
- Bot confirms booking was successful
- Mentions the scheduled time
- Provides email confirmation message

✅ **Pass Criteria**: Booking confirmation received

---

### Test 4: Error Handling - Invalid Email
**Purpose**: Verify input validation  
**Steps**:
1. Type: `"I want to book a discovery call"`
2. When asked for name: `"John"`
3. When asked for email: `"not-an-email"` (invalid)

**Expected Result**:
- Bot shows error: `"❌ Invalid email format"`
- Asks to try again
- Doesn't crash or hang

✅ **Pass Criteria**: Error handled gracefully

---

### Test 5: Error Handling - Server Connection
**Purpose**: Verify frontend handles backend errors  
**Steps**:
1. Stop the Python backend (Ctrl+C)
2. Try to send a message in the bot
3. Observe error handling

**Expected Result**:
- Bot shows error: `"⚠️ Connection failed: ..."`
- User can still type
- No console errors shown to user
- Clear error message explaining issue

✅ **Pass Criteria**: Error message appears within 5 seconds

---

### Test 6: Long Conversation
**Purpose**: Verify bot handles context over many messages  
**Steps**:
1. Send 10+ messages in sequence:
   - "Hi"
   - "What's your success rate?"
   - "How long does an MVP take?"
   - "What technologies do you use?"
   - "How much does it cost?"
   - "Can you help with AI chatbots?"
   - "Do you offer custom solutions?"
   - "What's your process?"
   - "How do you communicate?"
   - "When can you start?"

**Expected Result**:
- Each response is coherent
- Bot remembers context from earlier messages
- No slowdown as conversation grows
- All responses within 3-5 seconds

✅ **Pass Criteria**: 10+ messages sent without slowdown

---

### Test 7: Toast Notifications
**Purpose**: Verify marketing notifications work  
**Steps**:
1. Don't interact with bot for 5 seconds
2. Observe bottom-right corner

**Expected Result**:
- Toast notification appears (not when bot is open)
- Message is catchy/marketing-focused
- Shows every 7-8 seconds
- Can dismiss with X button

✅ **Pass Criteria**: Toast appears and can be dismissed

---

### Test 8: UI/UX Flow
**Purpose**: Verify complete user experience  
**Steps**:
1. Open bot (click button)
2. Verify bot window opens with animations
3. Check chat area shows welcome message
4. Type a message
5. Verify message appears on right (user color)
6. Verify bot response appears on left (bot color)
7. Close bot (click X)
8. Verify smooth animation back to button

**Expected Result**:
- All animations smooth (no jank)
- Colors are: user=pink, bot=dark with pink border
- Timestamps shown for messages
- Bot icon shows "typing" state while responding

✅ **Pass Criteria**: Smooth animations, correct colors

---

### Test 9: API Response Streaming
**Purpose**: Verify responses stream character-by-character  
**Steps**:
1. Open developer tools (F12)
2. Go to Network tab
3. Send a message to bot
4. Watch the response flow in

**Expected Result**:
- Response appears in chunks (streaming)
- Not all at once (no buffering)
- Headers show: `Transfer-Encoding: chunked`
- Response appears immediately as it's generated

✅ **Pass Criteria**: Response streams visibly

---

### Test 10: Health Check Endpoint
**Purpose**: Verify backend health monitoring  
**Steps**:
1. Open terminal/curl
2. Run: `curl http://localhost:8000/health`

**Expected Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-21T10:30:00.123456",
  "services": {
    "database": "connected",
    "groq": "configured"
  }
}
```

✅ **Pass Criteria**: Returns 200 status with healthy status

---

## Performance Benchmarks

### Response Time Test
**Test**: Send a simple message and measure time to first character

```
Expected: 500-1500ms
- Connection: 100-200ms
- Agent processing: 800-1000ms
- Streaming start: 200-300ms
```

### Memory Usage
**Test**: Check browser memory while chatting

```
Expected: < 50MB
- Delta bot widget: 2-5MB
- Chat history (100 messages): 5-10MB
- DOM elements: 1-2MB
```

### CPU Usage
**Test**: Monitor CPU while bot is streaming

```
Expected: < 15%
- Message rendering: 5-8%
- Animations: 3-5%
- Network operations: 1-2%
```

---

## Debugging Tips

### If bot doesn't respond:

**Check 1: Backend Running?**
```bash
curl http://localhost:8000/health
```
Should return JSON. If error: start backend with `python main.py`

**Check 2: API URL Correct?**
In browser console:
```javascript
console.log(window.location.origin)
// Should be http://localhost:3000
// Chat should go to http://localhost:8000
```

**Check 3: Check Backend Logs**
```bash
# Terminal where backend is running - should show:
# [INFO] Running agent with input: ...
# [INFO] Agent response generated: XXX chars
```

**Check 4: Check Browser Console**
Press F12, go to Console tab
Should NOT show errors. If it does, report them.

---

### If responses are slow:

**Check Backend Performance**:
```bash
# Look for timing in logs
grep -i "Running agent" backend/backend.log
# Should show agent executes in 1-2 seconds
```

**Check Network**:
In DevTools Network tab:
- API request duration (should be < 3s)
- Response size (should be < 5KB)

**Check LLM**:
Sometimes Groq API is slow. Try again in 30 seconds.

---

### If styling looks broken:

**Restart dev server**:
```bash
# In frontend terminal (where npm is running)
# Press Ctrl+C
# Then: pnpm dev
```

**Clear cache**:
```bash
# Delete Next.js cache
rm -rf .next
pnpm dev
```

---

## Test Results Template

Use this to document your test run:

```markdown
# Test Results - [YOUR DATE]

## Environment
- Backend: Python main.py (localhost:8000)
- Frontend: pnpm dev (localhost:3000)
- Browser: [Chrome/Firefox/Safari]

## Tests Passed ✅
- [ ] Test 1: Basic Conversation
- [ ] Test 2: Quick Commands
- [ ] Test 3: Lead Saving
- [ ] Test 4: Invalid Email Error
- [ ] Test 5: Server Connection Error
- [ ] Test 6: Long Conversation
- [ ] Test 7: Toast Notifications
- [ ] Test 8: UI/UX Flow
- [ ] Test 9: API Streaming
- [ ] Test 10: Health Check

## Performance Results
- Average response time: ___ms (target < 3000ms)
- Memory usage: ___MB (target < 50MB)
- CPU peak: __% (target < 15%)

## Issues Found
(List any bugs or unexpected behavior)

## Overall Status
- [ ] PASS - All tests successful
- [ ] PASS WITH NOTES - Minor issues, not blocking
- [ ] FAIL - Critical issue needs fixing
```

---

## Automated Test Commands

### Quick 1-minute test:
```bash
# Terminal 1: Start backend
cd backend && python main.py

# Terminal 2: Start frontend
pnpm dev

# Terminal 3: Health check
curl http://localhost:8000/health

# Then:
# 1. Open http://localhost:3000
# 2. Click bot button
# 3. Type "Hello" and send
# 4. Verify response appears
```

### CI/CD Integration Test:
```bash
# Add to package.json or test script
#!/bin/bash
set -e

# Start backend in background
cd backend && python main.py &
BACKEND_PID=$!
sleep 2

# Health check
curl -f http://localhost:8000/health || exit 1

# Start frontend build test
cd ..
pnpm build

# Kill backend
kill $BACKEND_PID

echo "✅ All tests passed"
```

---

## What Success Looks Like

### 🟢 Green Light (Everything Working)
- ✅ Bot responds to all messages within 3 seconds
- ✅ Leads can be saved with name/email
- ✅ Booking times display correctly
- ✅ Animations are smooth
- ✅ No console errors
- ✅ Health check returns 200

### 🟡 Yellow Light (Minor Issues)
- ⚠️ Responses take 3-5 seconds sometimes
- ⚠️ Occasional animation stutter
- ⚠️ One test fails but others pass

### 🔴 Red Light (Blocking Issues)
- ❌ Bot never responds
- ❌ Backend won't start
- ❌ Lead saving fails completely
- ❌ Console shows critical errors

---

## Next Steps After Testing

### If All Tests Pass ✅
Congratulations! Your bot is ready to:
1. Deploy to production (Vercel + Heroku/Railway)
2. Share with team/stakeholders
3. Start collecting leads
4. Monitor conversions

### If Tests Have Issues 🔴
1. Check the debugging section above
2. Review backend logs
3. Verify all environment variables set
4. Restart services
5. Clear caches and rebuild

### Production Testing
Before launching live:
1. Test with real API keys (not test keys)
2. Test with production database
3. Run load test (100+ concurrent users)
4. Monitor error rates
5. Set up alerting for downtime

---

## Support Resources

**Need Help?**
- Check backend logs: `cat backend/backend.log`
- Check frontend logs: Browser DevTools (F12)
- Verify environment variables: `echo $GROQ_API_KEY`
- Restart everything and try again

**Documentation**:
- `FRONTEND-INTEGRATION-REVIEW.md` - Full architecture details
- `backend/README.md` - Backend setup guide
- `SETUP_INSTRUCTIONS.md` - Initial setup steps

Good luck! 🚀
