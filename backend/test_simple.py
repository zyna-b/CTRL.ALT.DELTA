#!/usr/bin/env python3
import asyncio
from dotenv import load_dotenv
load_dotenv()

from agent import run_agent
import logging

logging.basicConfig(level=logging.DEBUG)

async def test():
    print("Testing simple message...")
    try:
        response = await run_agent([
            {'role': 'user', 'content': 'Hello, what is 2+2?'}
        ])
        print(f"Response: {response}")
    except Exception as e:
        print(f"Error: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()

asyncio.run(test())
