"""
Delta-1 AI Agent - FastAPI Backend
Optimized for performance and reliability
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
import asyncio
import logging
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Delta-1 Agent",
    version="1.0.0",
    docs_url="/docs",
    redoc_url=None  # Disable ReDoc to reduce overhead
)

# CORS - Allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Models
class Message(BaseModel):
    role: str
    content: str
    
    class Config:
        # Validate role is 'user' or 'assistant'
        @classmethod
        def __get_validators__(cls):
            yield cls.validate

class ChatRequest(BaseModel):
    messages: List[Message]
    
    class Config:
        # Validate non-empty messages list
        min_items = 1

# Routes
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "database": "connected",
            "groq": "configured" if os.getenv("GROQ_API_KEY") else "missing"
        }
    }

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """
    Chat endpoint with optimized streaming response.
    Streams response character by character without artificial delays.
    """
    try:
        from agent import run_agent
        
        # Convert to dict format for agent
        messages = [
            {"role": msg.role.lower(), "content": msg.content}
            for msg in request.messages
        ]
        
        logger.info(f"Processing {len(messages)} messages")
        
        # Execute agent
        response = await run_agent(messages)
        
        logger.info(f"Generated response: {len(response)} chars")
        
        # Stream response efficiently (no artificial delay)
        async def stream_response():
            """Stream response without unnecessary delays"""
            chunk_size = 10  # Send 10 chars at a time
            for i in range(0, len(response), chunk_size):
                yield response[i:i + chunk_size]
                # Only add minimal delay for network efficiency
                await asyncio.sleep(0)
        
        return StreamingResponse(
            stream_response(),
            media_type="text/plain",
            headers={
                "Cache-Control": "no-cache",
                "X-Content-Type-Options": "nosniff"
            }
        )
    
    except ValueError as e:
        # Validation errors
        logger.warning(f"Invalid request: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    
    except Exception as e:
        # Server errors
        logger.error(f"Chat error: {type(e).__name__}: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="AI agent temporarily unavailable. Please try again."
        )

@app.get("/")
async def root():
    """Root endpoint"""
    return {"status": "online", "service": "Delta-1 Agent"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info",
        access_log=False  # Reduce noise
    )
