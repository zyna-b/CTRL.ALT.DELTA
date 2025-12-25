#!/usr/bin/env python3
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

# Load env first
from dotenv import load_dotenv
load_dotenv()

# Now test
import asyncio
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

async def test_agent():
    from agent import run_agent
    
    logger.info("=" * 60)
    logger.info("TESTING BOOKING FLOW")
    logger.info("=" * 60)
    
    # Step 1
    logger.info("\n[STEP 1] User: I want to book a discovery call")
    messages = [{'role': 'user', 'content': 'I want to book a discovery call'}]
    try:
        response = await run_agent(messages)
        logger.info(f"Agent Response: {response}")
    except Exception as e:
        logger.error(f"ERROR: {type(e).__name__}: {e}", exc_info=True)
        return
    
    # Step 2
    logger.info("\n[STEP 2] User: My name is John Smith")
    messages = [
        {'role': 'user', 'content': 'I want to book a discovery call'},
        {'role': 'assistant', 'content': response},
        {'role': 'user', 'content': 'My name is John Smith'}
    ]
    try:
        response = await run_agent(messages)
        logger.info(f"Agent Response: {response}")
    except Exception as e:
        logger.error(f"ERROR: {type(e).__name__}: {e}", exc_info=True)
        return
    
    # Step 3
    logger.info("\n[STEP 3] User: My email is john@example.com")
    messages = [
        {'role': 'user', 'content': 'I want to book a discovery call'},
        {'role': 'assistant', 'content': 'response'},
        {'role': 'user', 'content': 'My name is John Smith'},
        {'role': 'assistant', 'content': 'response'},
        {'role': 'user', 'content': 'My email is john@example.com'}
    ]
    try:
        response = await run_agent(messages)
        logger.info(f"Agent Response: {response}")
    except Exception as e:
        logger.error(f"ERROR: {type(e).__name__}: {e}", exc_info=True)
        return

if __name__ == '__main__':
    asyncio.run(test_agent())
