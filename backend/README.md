# Delta-1 Agent - Python Backend

## Quick Start

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Copy environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

3. Generate Prisma client:
```bash
prisma generate --schema=../prisma/schema.prisma
```

4. Run the server:
```bash
python main.py
```

Server will start at: http://localhost:8000

## API Endpoints

- `GET /` - Service status
- `GET /health` - Health check
- `POST /api/chat` - Chat with agent (streaming)
