#!/usr/bin/env python3
import asyncio
from dotenv import load_dotenv
load_dotenv()

# Test direct agent call
from agent import run_agent

async def test():
    try:
        print("Testing agent with: 'I want to book'")
        response = await run_agent([{'role': 'user', 'content': 'I want to book'}])
        print(f"✓ Response: {response[:100]}")
    except Exception as e:
        print(f"✗ Error: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()

asyncio.run(test())
