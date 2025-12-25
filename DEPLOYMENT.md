# Deployment Guide

## Quick Start (Both services on same machine)

### Using Screen (Linux/Mac)

```bash
# Start Python backend in screen
screen -S backend
cd backend
python main.py
# Detach: Ctrl+A, D

# Start Next.js in another screen
screen -S frontend
pnpm run build
pnpm run start
# Detach: Ctrl+A, D

# Reattach to screens
screen -r backend
screen -r frontend
```

### Using PM2 (Recommended)

```bash
# Install PM2
npm install -g pm2

# Start both services
pm2 start ecosystem.config.js

# View logs
pm2 logs

# Restart
pm2 restart all

# Stop
pm2 stop all
```

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: 'delta-backend',
      script: 'python',
      args: 'backend/main.py',
      interpreter: 'none',
      env: {
        PORT: 8000
      }
    },
    {
      name: 'delta-frontend',
      script: 'pnpm',
      args: 'start',
      env: {
        PORT: 3000,
        PYTHON_API_URL: 'http://localhost:8000'
      }
    }
  ]
};
```

## Cloud Deployment

### Option 1: Vercel (Frontend) + Render (Backend)

**Frontend on Vercel:**
1. Connect GitHub repository
2. Set environment variables:
   - `PYTHON_API_URL=https://your-backend.onrender.com`
3. Deploy automatically on push

**Backend on Render:**
1. Create new Web Service
2. Runtime: Python 3.11
3. Build Command: `pip install -r backend/requirements.txt`
4. Start Command: `cd backend && python main.py`
5. Set environment variables (all API keys)
6. Deploy

### Option 2: Railway (Full Stack)

1. Create new project
2. Add two services:
   - Python Backend: `cd backend && python main.py`
   - Next.js Frontend: `pnpm run start`
3. Set environment variables for both
4. Enable public networking
5. Deploy

### Option 3: Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - GROQ_API_KEY=${GROQ_API_KEY}
      - GOOGLE_GENERATIVE_AI_API_KEY=${GOOGLE_GENERATIVE_AI_API_KEY}
      - DATABASE_URL=${DATABASE_URL}
      - CAL_API_KEY=${CAL_API_KEY}
    restart: unless-stopped

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:3000"
    environment:
      - PYTHON_API_URL=http://backend:8000
    depends_on:
      - backend
    restart: unless-stopped
```

Create `backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "main.py"]
```

Create `Dockerfile.frontend`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]
```

Deploy:
```bash
docker-compose up -d
```

## Environment Variables

### Required for Both Services

```env
# AI APIs
GROQ_API_KEY=gsk_...
GOOGLE_GENERATIVE_AI_API_KEY=AIza...

# Cal.com
CAL_API_KEY=cal_live_...
CAL_EVENT_TYPE_ID=...
CAL_BOOKING_LINK=https://cal.com/...

# Database (if using Prisma)
DATABASE_URL=postgresql://...
```

### Frontend Only
```env
PYTHON_API_URL=http://localhost:8000  # or production URL
```

## SSL/HTTPS

### Using Caddy (Automatic HTTPS)

Install Caddy and create `Caddyfile`:
```
your-domain.com {
    reverse_proxy localhost:3000
}

api.your-domain.com {
    reverse_proxy localhost:8000
}
```

Start:
```bash
caddy run
```

### Using Nginx + Let's Encrypt

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Get SSL:
```bash
sudo certbot --nginx -d your-domain.com -d api.your-domain.com
```

## Monitoring

### Health Checks

Python backend: `GET http://localhost:8000/health`
Next.js frontend: `GET http://localhost:3000/api/chat` (with test payload)

### Logs

```bash
# PM2
pm2 logs

# Docker
docker-compose logs -f

# Direct
tail -f backend.log frontend.log
```

### Uptime Monitoring

Use services like:
- UptimeRobot
- Better Uptime
- Pingdom

Configure to check `/health` endpoint every 5 minutes.

## Scaling

### Horizontal Scaling

Backend (stateless):
```bash
# Start multiple backend instances
python main.py --port 8000 &
python main.py --port 8001 &
python main.py --port 8002 &

# Use nginx load balancer
upstream backend {
    server localhost:8000;
    server localhost:8001;
    server localhost:8002;
}
```

Frontend (Vercel auto-scales)

### Database Connection Pooling

If using Prisma with PostgreSQL:
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20"
```

## Backup & Recovery

### Database Backups (if using Prisma)

```bash
# Automated daily backups
0 2 * * * pg_dump $DATABASE_URL > /backups/db-$(date +\%Y\%m\%d).sql
```

### Configuration Backups

Keep environment variables in secure vault:
- 1Password
- AWS Secrets Manager
- HashiCorp Vault

## Cost Optimization

### API Usage

- Groq: 100K tokens/day free (upgrade to Dev tier for more)
- Gemini: Generous free tier
- Consider caching common responses

### Hosting

**Free Tier Options:**
- Vercel: Frontend (free for hobby)
- Render: Backend (512MB RAM free)
- Supabase: Database (500MB free)

**Paid (Recommended for production):**
- Vercel Pro: $20/month
- Render Standard: $7/month
- Railway: ~$10/month (usage-based)

## Security Checklist

- [ ] All API keys in environment variables (not in code)
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] HTTPS/SSL active
- [ ] Monitoring and logging enabled
- [ ] Database backups scheduled
- [ ] Error messages don't leak sensitive data

## Troubleshooting Deployment

**Backend won't start:**
```bash
# Check Python version
python --version  # Should be 3.11+

# Check dependencies
pip install -r requirements.txt

# Check environment
python -c "import os; print(os.getenv('GROQ_API_KEY'))"
```

**Frontend can't reach backend:**
```bash
# Test backend directly
curl http://localhost:8000/health

# Check PYTHON_API_URL
echo $PYTHON_API_URL

# Check CORS settings in backend/main.py
```

**High memory usage:**
- Reduce `max_tokens` in agent.py
- Enable connection pooling
- Use gunicorn with worker limits:
  ```bash
  gunicorn -w 2 -k uvicorn.workers.UvicornWorker main:app
  ```

## Support

For deployment issues, check:
1. Server logs
2. Environment variables
3. Network connectivity
4. API rate limits
5. [GitHub Issues](https://github.com/your-repo/issues)
