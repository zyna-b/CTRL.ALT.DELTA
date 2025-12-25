# Delta-1 Bot - Production Deployment Guide

## Overview
This guide walks you through deploying the Delta-1 AI bot to production using modern cloud platforms.

**What you'll deploy**:
- **Frontend**: Next.js on Vercel (recommended)
- **Backend**: Python FastAPI on Heroku or Railway (or any cloud)
- **Database**: Supabase PostgreSQL (or your choice)

**Estimated time**: 30-45 minutes

---

## Prerequisites

Before starting, you need:
1. ✅ GitHub account (for deploying frontend)
2. ✅ Vercel account (free) - for Next.js hosting
3. ✅ Heroku or Railway account - for Python backend
4. ✅ Supabase account (free) - for database
5. ✅ Groq API key - for LLM
6. ✅ Cal.com account (optional) - for scheduling

---

## Part 1: Deploy Frontend to Vercel

### Step 1: Push code to GitHub

```bash
# If not already a git repo
git init
git add .
git commit -m "Initial commit: Delta-1 AI Bot"

# Create repo on github.com and push
git remote add origin https://github.com/YOUR_USERNAME/robot-image-editing.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Import"

### Step 3: Configure Environment Variables

In Vercel project settings:

```
PYTHON_API_URL = https://your-backend-url.herokuapp.com
# or
PYTHON_API_URL = https://your-backend-url.railway.app

GROQ_API_KEY = gsk_XXXXXXXXXXXXX
NEXT_PUBLIC_SUPABASE_URL = https://XXXXX.supabase.co
SUPABASE_SERVICE_ROLE_KEY = sb_secret_XXXXXXXXXXXXX
```

### Step 4: Deploy

1. Click "Deploy" button
2. Wait for build to complete (2-3 minutes)
3. Your frontend is live at `https://YOUR-PROJECT.vercel.app`

### Verification

- Open your Vercel URL in browser
- See "Welcome" message
- Check that Delta-1 button appears (bottom-right)

---

## Part 2: Deploy Backend to Heroku

### Option A: Using Git (Recommended)

#### Step 1: Create Heroku app

```bash
# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Create Procfile (tells Heroku how to run)
echo "web: python main.py" > Procfile

# Add Python runtime
echo "python-3.11.4" > runtime.txt
```

#### Step 2: Add environment variables

```bash
heroku config:set GROQ_API_KEY=gsk_XXXXXXXXXXXXX
heroku config:set DATABASE_URL=postgresql://...
heroku config:set CAL_BOOKING_LINK=https://cal.com/...
```

#### Step 3: Deploy

```bash
# Push to Heroku
git push heroku main

# Check logs
heroku logs --tail
```

#### Step 4: Verify

```bash
# Test health endpoint
curl https://your-app-name.herokuapp.com/health

# Should return JSON with status "healthy"
```

---

### Option B: Using Railway (Easier)

Railway is newer and often easier than Heroku.

#### Step 1: Connect GitHub

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub repo

#### Step 2: Configure Environment

1. Click "Add Service" → "PostgreSQL" (for database)
2. Click "Configure" and add variables:

```
GROQ_API_KEY=gsk_XXXXXXXXXXXXX
DATABASE_URL=postgresql://...
CAL_BOOKING_LINK=https://cal.com/...
```

#### Step 3: Configure Start Command

1. In Railway settings, set "Start Command":
```
pip install -r backend/requirements.txt && cd backend && python main.py
```

#### Step 4: Deploy

1. Click "Deploy"
2. Wait for build (2-3 minutes)
3. View logs to confirm running

#### Step 5: Get Public URL

1. Click "Generate Domain"
2. Your backend is at `https://YOUR-RAILWAY-URL.railway.app`

---

## Part 3: Update Frontend with Backend URL

### In Vercel Dashboard

1. Go to your Vercel project settings
2. Find "Environment Variables"
3. Update `PYTHON_API_URL`:

```
PYTHON_API_URL = https://your-heroku-app.herokuapp.com
# or
PYTHON_API_URL = https://your-railway-url.railway.app
```

4. Redeploy by pushing code or clicking "Redeploy"

---

## Part 4: Database Setup (Supabase)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose region closest to users
4. Set password
5. Create project

### Step 2: Get Connection String

1. Go to Settings → Database
2. Copy "Connection string" (Postgres)
3. Add to your backend environment variables:

```
DATABASE_URL=postgresql://...
```

### Step 3: Initialize Database Schema

```bash
# In your backend directory
cd backend

# Install Prisma (if using)
npm install prisma
npx prisma migrate dev --name init

# Or use SQL directly in Supabase console
```

### Step 4: Create Tables

Using Supabase SQL Editor, create tables:

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  details TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE call_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  selected_time TIMESTAMP NOT NULL,
  intent TEXT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT now()
);
```

---

## Part 5: Production Checklist

### Backend (.env variables set)
- [ ] `GROQ_API_KEY` - Set and tested
- [ ] `DATABASE_URL` - Supabase connection string
- [ ] `CAL_BOOKING_LINK` - Your cal.com link
- [ ] `CAL_API_KEY` - Cal.com API key (if using)

### Frontend (Vercel environment)
- [ ] `PYTHON_API_URL` - Points to your backend
- [ ] `GROQ_API_KEY` - Same as backend
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - From Supabase
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - From Supabase

### Deployment Status
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Heroku/Railway
- [ ] Health check endpoint responds (200)
- [ ] No console errors in browser
- [ ] Bot responds to messages
- [ ] Leads can be saved to database

---

## Part 6: Testing Production Deployment

### Test 1: Basic Connectivity

```bash
# Health check
curl https://your-backend.herokuapp.com/health

# Should return:
{
  "status": "healthy",
  "services": {"groq": "configured", "database": "connected"}
}
```

### Test 2: Chat Endpoint

```bash
curl -X POST https://your-backend.herokuapp.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'

# Should return response text
```

### Test 3: Manual Browser Test

1. Open `https://YOUR-FRONTEND.vercel.app`
2. Click Delta-1 button
3. Type: "What services do you offer?"
4. Verify response appears

### Test 4: Lead Capture Flow

1. Type: "I want to book a discovery call"
2. Provide name and email
3. Select a time
4. Verify: Booking confirmed, email shown

### Test 5: Error Handling

1. Stop the backend
2. Try to send message in bot
3. Should show error: "⚠️ Connection failed"
4. Restart backend
5. Message should work again

---

## Part 7: Production Monitoring

### Setup Error Tracking

**Option 1: Sentry (Recommended)**

```bash
# In backend
pip install sentry-sdk

# In backend/main.py
import sentry_sdk
sentry_sdk.init("your-sentry-dsn")
```

**Option 2: Heroku Logs**

```bash
# View production logs
heroku logs --tail

# View recent errors
heroku logs --grep "ERROR"
```

### Setup Performance Monitoring

**Check response times**:
```bash
# Monitor in Vercel Analytics dashboard
# Check your Vercel project → Analytics → Serverless Functions

# Monitor backend
heroku logs --grep "Running agent"
# Look for "Agent response generated: XXX chars"
```

### Setup Uptime Monitoring

**Option 1: Heroku**
- Heroku automatically restarts crashed apps
- Check status at status.heroku.com

**Option 2: Uptimerobot**
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Create monitor for `https://YOUR-BACKEND/health`
3. Get alerts if backend goes down

---

## Part 8: Optimization for Production

### Enable CDN Caching

In Vercel project settings:
- Set cache headers for static assets
- Set cache control for API routes

### Optimize Database

In Supabase:
- Create index on `email` column (for lead lookups)
- Set up backup strategy
- Monitor connection pool usage

### Scale Backend (if needed)

If you get more traffic:

**Heroku**:
```bash
heroku dyno:scale web=2  # 2 dynos
```

**Railway**:
- Add more replicas in railway.app dashboard

---

## Troubleshooting Production

### Problem: "Frontend can't reach backend"

**Cause**: Wrong `PYTHON_API_URL` in Vercel

**Fix**:
1. Go to Vercel settings → Environment Variables
2. Update `PYTHON_API_URL` to correct backend URL
3. Redeploy frontend
4. Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)

### Problem: "Database connection error"

**Cause**: Wrong DATABASE_URL

**Fix**:
1. Copy fresh DATABASE_URL from Supabase
2. Update in Heroku/Railway:
   ```bash
   heroku config:set DATABASE_URL=postgresql://...
   ```
3. Restart app:
   ```bash
   heroku restart
   ```

### Problem: "Timeout waiting for response"

**Cause**: Backend crashed or slow

**Fix**:
1. Check logs: `heroku logs --tail`
2. Restart: `heroku restart`
3. Check GROQ API: Is it working?
4. Check database: Is it accessible?

### Problem: "Backend won't start"

**Cause**: Missing dependencies or env variables

**Fix**:
1. Check `requirements.txt` has all dependencies
2. Verify all env variables set:
   ```bash
   heroku config
   ```
3. Check logs for specific error:
   ```bash
   heroku logs -n 50
   ```

---

## Maintenance

### Regular Tasks

**Weekly**:
- [ ] Check error logs for patterns
- [ ] Verify bot is responding correctly
- [ ] Monitor response times

**Monthly**:
- [ ] Review database for leads
- [ ] Check API usage (Groq)
- [ ] Backup important data

**Quarterly**:
- [ ] Update dependencies:
  ```bash
  pip install --upgrade -r requirements.txt
  npm upgrade
  ```
- [ ] Review and optimize database queries
- [ ] Analyze bot conversations for improvements

### Update Deployment

**To deploy updates**:

```bash
# Backend changes
git add backend/
git commit -m "Update: [description]"
git push heroku main  # Heroku auto-deploys

# Frontend changes
git add app/
git commit -m "Update: [description]"
git push origin main  # Vercel auto-deploys
```

---

## Production URLs Reference

After deployment, you'll have:

```
Frontend: https://YOUR-PROJECT.vercel.app
Backend: https://your-app.herokuapp.com (or railway.app)
Database: postgresql://... (Supabase)
API Health: https://your-app.herokuapp.com/health
API Chat: https://your-app.herokuapp.com/api/chat
Docs: https://your-app.herokuapp.com/docs
```

---

## Security Checklist

- [ ] All API keys in environment variables (never in code)
- [ ] CORS restricted to your frontend domain only
- [ ] Database backups enabled (Supabase auto-backup)
- [ ] HTTPS enforced (automatic on Vercel & Heroku)
- [ ] Rate limiting setup (optional but recommended)
- [ ] Input validation enabled (already implemented)
- [ ] Error messages don't expose sensitive info

---

## Performance Expectations

After production deployment:

| Metric | Expected |
|--------|----------|
| Frontend load time | < 2s |
| First bot response | < 3s |
| Subsequent responses | < 2s |
| Uptime | > 99.5% |
| Database latency | < 100ms |

---

## Next Steps

1. ✅ Deploy frontend to Vercel
2. ✅ Deploy backend to Heroku/Railway
3. ✅ Connect Supabase database
4. ✅ Set environment variables
5. ✅ Test all flows
6. ✅ Set up monitoring
7. ✅ Launch to users!

---

## Support

**If you get stuck:**
1. Check the troubleshooting section above
2. Review logs: `heroku logs --tail`
3. Check Vercel build logs in dashboard
4. Try redeploying: Push code again
5. Contact platform support (Vercel, Heroku, Supabase)

**Documentation**:
- `FRONTEND-INTEGRATION-REVIEW.md` - Architecture
- `TESTING-GUIDE.md` - Local testing
- `OPTIMIZATIONS-DETAILS.md` - Performance details

**Questions?**
- Vercel docs: vercel.com/docs
- Heroku docs: devcenter.heroku.com
- Railway docs: railway.app/docs
- Supabase docs: supabase.com/docs

Good luck with your production deployment! 🚀
