import os
import logging
import asyncio
from datetime import datetime
from dotenv import load_dotenv

# LangChain Imports
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage

# Local Imports
from tools import tools

# Load environment variables
load_dotenv()

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

_agent_executor = None

def get_llm():
    """Initialize Google Gemini LLM"""
    api_key = os.getenv("GOOGLE_API_KEY")
    # Fallback to the other key name if specific one not found
    if not api_key:
        api_key = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")
        
    if not api_key:
        raise ValueError("CRITICAL: GOOGLE_API_KEY is missing. Check your .env file.")
    
    # Map it for LangChain
    os.environ["GOOGLE_API_KEY"] = api_key
    
    logger.info("✓ Initializing Gemini 1.5 Flash")
    return ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0.3,
        max_retries=2
    )

def get_system_prompt():
    date_str = datetime.now().strftime("%A, %B %d, %Y")
    return f"""You are Delta-1, the AI Sales Agent for Ctrl. Alt. Delta.
Current Date: {date_str}

YOUR GOAL: Qualify leads and book discovery calls.

BEHAVIOR:
- Be professional, concise (under 50 words), and helpful.
- ALWAYS use tools to save data or check availability.

TOOL RULES:
1. User gives Name + Email -> Call 'save_lead_tool'.
2. User asks for time -> Call 'get_available_slots_tool'.
3. User picks time -> Call 'book_call_tool'.
"""

def get_agent_executor():
    global _agent_executor
    if _agent_executor is None:
        try:
            llm = get_llm()
            
            prompt = ChatPromptTemplate.from_messages([
                ("system", get_system_prompt()),
                MessagesPlaceholder(variable_name="chat_history"),
                ("human", "{input}"),
                MessagesPlaceholder(variable_name="agent_scratchpad"),
            ])
            
            agent = create_tool_calling_agent(llm, tools, prompt)
            
            _agent_executor = AgentExecutor(
                agent=agent,
                tools=tools,
                verbose=True,
                handle_parsing_errors=True
            )
            logger.info("✓ Delta-1 Agent Ready (Power: Gemini Flash)")
        except Exception as e:
            logger.error(f"Failed to init agent: {e}")
            raise
    return _agent_executor

async def run_agent(messages: list) -> str:
    try:
        # Safety check for empty messages
        if not messages:
            return "Hello! How can I help you today?"
            
        chat_history = []
        user_input = ""
        
        # Robust parsing
        for msg in messages:
            role = msg.get('role', '')
            content = msg.get('content', '')
            if role == 'user':
                user_input = content 
                chat_history.append(HumanMessage(content=content))
            elif role == 'assistant':
                chat_history.append(AIMessage(content=content))
        
        # Pop last message to use as input
        if chat_history and isinstance(chat_history[-1], HumanMessage):
            chat_history.pop()

        executor = get_agent_executor()
        
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(
            None,
            lambda: executor.invoke({
                "input": user_input,
                "chat_history": chat_history
            })
        )
        
        return result['output']

    except Exception as e:
        logger.error(f"AGENT FAILURE: {e}")
        return "I encountered a system error. Please try again."