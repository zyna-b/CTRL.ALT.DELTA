#!/usr/bin/env python3
from dotenv import load_dotenv
load_dotenv()

from agent import get_llm

try:
    llm = get_llm()
    print(f"LLM loaded: {type(llm).__name__}")
    print(f"Model: {llm.model_name if hasattr(llm, 'model_name') else 'unknown'}")
except Exception as e:
    print(f"Error: {type(e).__name__}: {e}")
