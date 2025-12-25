#!/usr/bin/env python3
"""Test agent creation step by step"""
import os
import sys
from dotenv import load_dotenv

load_dotenv()

print("🔍 Step-by-step agent creation debugging...")
print("="*60)

# Step 1: LLM
print("\n1️⃣ Creating LLM...")
try:
    from langchain_groq import ChatGroq
    llm = ChatGroq(
        model='llama-3.3-70b-versatile',
        groq_api_key=os.getenv('GROQ_API_KEY'),
        temperature=0.7,
        max_tokens=500,
        timeout=30,
        max_retries=1
    )
    print(f"✅ LLM created: {type(llm).__name__}")
    print(f"   Model: llama-3.3-70b-versatile")
    print(f"   Has bind_tools: {hasattr(llm, 'bind_tools')}")
except Exception as e:
    print(f"❌ LLM creation failed: {e}")
    sys.exit(1)

# Step 2: Tools
print("\n2️⃣ Loading tools...")
try:
    from tools import tools
    print(f"✅ Tools loaded: {len(tools)} tools")
    for t in tools:
        print(f"   - {t.name}")
except Exception as e:
    print(f"❌ Tools loading failed: {e}")
    sys.exit(1)

# Step 3: Prompt
print("\n3️⃣ Creating prompt...")
try:
    from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ])
    print(f"✅ Prompt created: {type(prompt).__name__}")
except Exception as e:
    print(f"❌ Prompt creation failed: {e}")
    sys.exit(1)

# Step 4: Create agent
print("\n4️⃣ Creating tool calling agent...")
try:
    from langchain.agents import create_tool_calling_agent
    print(f"   LLM type check: {type(llm).__name__}")
    print(f"   LLM has bind_tools: {hasattr(llm, 'bind_tools')}")
    print(f"   Tools count: {len(tools)}")
    print(f"   Prompt type: {type(prompt).__name__}")
    
    agent = create_tool_calling_agent(llm, tools, prompt)
    print(f"✅ Agent created: {type(agent).__name__}")
except Exception as e:
    print(f"❌ Agent creation failed!")
    print(f"   Error type: {type(e).__name__}")
    print(f"   Error message: {str(e)}")
    print(f"\n   Full traceback:")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Step 5: Create executor
print("\n5️⃣ Creating agent executor...")
try:
    from langchain.agents import AgentExecutor
    executor = AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=False,
        max_iterations=5,
        handle_parsing_errors=True,
        return_intermediate_steps=False,
        early_stopping_method="force"
    )
    print(f"✅ Executor created: {type(executor).__name__}")
except Exception as e:
    print(f"❌ Executor creation failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

print("\n" + "="*60)
print("✅ ALL STEPS SUCCESSFUL! Agent is ready to use.")
