#!/usr/bin/env python3
"""Quick test of bind_tools capability"""
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

load_dotenv()

print("🔍 Testing ChatGroq bind_tools capability...")
print("="*60)

llm = ChatGroq(
    model='llama-3.3-70b-versatile',
    groq_api_key=os.getenv('GROQ_API_KEY')
)

print(f"LLM Type: {type(llm).__name__}")
print(f"Has bind_tools attribute: {hasattr(llm, 'bind_tools')}")

if hasattr(llm, 'bind_tools'):
    is_callable = callable(getattr(llm, 'bind_tools'))
    print(f"Is bind_tools callable: {is_callable}")
    
    if is_callable:
        try:
            print("\n🔍 Attempting to call bind_tools([])...")
            result = llm.bind_tools([])
            print(f"✅ SUCCESS: bind_tools() works!")
            print(f"   Result type: {type(result).__name__}")
            print(f"   Result has invoke: {hasattr(result, 'invoke')}")
        except Exception as e:
            print(f"❌ FAILED: {e}")
else:
    print("❌ ChatGroq does NOT have bind_tools attribute!")
    print(f"   Available methods: {[m for m in dir(llm) if not m.startswith('_')][:10]}")
