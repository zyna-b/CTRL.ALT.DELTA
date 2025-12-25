#!/usr/bin/env python
"""Direct test of the agent to identify issues"""
import asyncio
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

async def main():
    try:
        from agent import run_agent
        
        print("Testing agent with simple message...")
        response = await run_agent([{'role': 'user', 'content': 'Hello'}])
        print(f"Success! Response length: {len(response)}")
        print(f"Response preview: {response[:200]}")
    except Exception as e:
        print(f"Error type: {type(e).__name__}")
        print(f"Error message: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    asyncio.run(main())
