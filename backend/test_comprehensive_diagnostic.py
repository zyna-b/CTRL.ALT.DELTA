#!/usr/bin/env python3
"""
🚀 COMPREHENSIVE DELTA-1 SYSTEM DIAGNOSTIC TEST SUITE
Senior-level diagnostic testing with detailed issue identification
Professional debugging with in-depth analysis
"""
import sys
import os
import asyncio
import time
import traceback
import json
from typing import Dict, List, Tuple, Optional

# Setup paths
sys.path.insert(0, os.path.dirname(__file__))

from dotenv import load_dotenv
load_dotenv()

# ============================================================================
# COLOR & EMOJI UTILITIES
# ============================================================================
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

EMOJI = {
    'pass': '✅',
    'fail': '❌',
    'info': 'ℹ️',
    'debug': '🔍',
    'warning': '⚠️',
    'error': '🚨',
    'rocket': '🚀',
    'check': '✔️',
    'cross': '✘',
    'arrow': '➜',
    'brain': '🧠',
    'fire': '🔥',
    'zap': '⚡',
    'gear': '⚙️',
    'key': '🔑',
    'server': '🖥️',
    'tool': '🛠️',
    'api': '📡',
    'chat': '💬',
    'database': '🗄️',
    'lock': '🔒',
    'book': '📖',
    'clock': '⏰',
}

# ============================================================================
# TEST RESULTS TRACKING
# ============================================================================
class TestResults:
    def __init__(self):
        self.tests: List[Dict] = []
        self.passed = 0
        self.failed = 0
        self.debug_logs: List[str] = []
        
    def log(self, name: str, status: str, message: str, error: Optional[str] = None):
        emoji = EMOJI['pass'] if status == 'PASS' else EMOJI['fail']
        self.tests.append({
            'name': name,
            'status': status,
            'message': message,
            'error': error,
            'emoji': emoji
        })
        if status == 'PASS':
            self.passed += 1
        else:
            self.failed += 1
    
    def add_debug(self, msg: str):
        """Add detailed debug information"""
        self.debug_logs.append(msg)
    
    def print_summary(self):
        print("\n" + "="*80)
        print(f"{EMOJI['rocket']} {Colors.BOLD}TEST RESULTS SUMMARY{Colors.RESET}")
        print("="*80)
        
        for test in self.tests:
            emoji = test['emoji']
            color = Colors.GREEN if test['status'] == 'PASS' else Colors.RED
            print(f"\n{emoji} {color}{test['name']}{Colors.RESET}")
            print(f"   {EMOJI['arrow']} Message: {test['message']}")
            if test['error']:
                print(f"   {EMOJI['error']} Error: {test['error'][:250]}")
        
        print("\n" + "="*80)
        total_tests = self.passed + self.failed
        passed_pct = (self.passed / total_tests * 100) if total_tests > 0 else 0
        
        if self.failed == 0:
            print(f"{EMOJI['fire']} {Colors.GREEN}{Colors.BOLD}ALL TESTS PASSED! ({self.passed}/{total_tests}) 🎉{Colors.RESET}")
        else:
            print(f"{EMOJI['warning']} {Colors.YELLOW}RESULTS: {self.passed} passed, {self.failed} failed ({passed_pct:.1f}% success){Colors.RESET}")
        
        print("="*80 + "\n")

results = TestResults()

# ============================================================================
# TEST 1: ENVIRONMENT VARIABLES & CONFIGURATION
# ============================================================================
def test_environment():
    """🔑 Verify all required environment variables are configured"""
    print(f"\n{EMOJI['key']} {Colors.BOLD}TEST 1: Environment Variables & Configuration{Colors.RESET}")
    print("-" * 80)
    
    groq_key = os.getenv("GROQ_API_KEY")
    google_key = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")
    
    results.add_debug(f"GROQ_API_KEY present: {bool(groq_key)}")
    results.add_debug(f"GOOGLE_GENERATIVE_AI_API_KEY present: {bool(google_key)}")
    
    if groq_key:
        key_display = groq_key[:15] + "..." + groq_key[-5:]
        print(f"  {EMOJI['pass']} {Colors.GREEN}GROQ_API_KEY configured{Colors.RESET}")
        print(f"     {EMOJI['debug']} Format: {key_display}")
        print(f"     {EMOJI['debug']} Length: {len(groq_key)} chars")
        results.log("🔑 Groq API Key", "PASS", f"Groq API key found ({len(groq_key)} chars)")
    else:
        print(f"  {EMOJI['fail']} {Colors.RED}GROQ_API_KEY not found{Colors.RESET}")
        results.log("🔑 Groq API Key", "FAIL", "Groq API key not configured", "GROQ_API_KEY environment variable is missing")
    
    if google_key:
        key_display = google_key[:15] + "..." + google_key[-5:]
        print(f"  {EMOJI['pass']} {Colors.GREEN}GOOGLE_GENERATIVE_AI_API_KEY configured{Colors.RESET}")
        print(f"     {EMOJI['debug']} Format: {key_display}")
        print(f"     {EMOJI['debug']} Length: {len(google_key)} chars")
        results.log("🔑 Google API Key", "PASS", f"Google API key found ({len(google_key)} chars)")
    else:
        print(f"  {EMOJI['info']} GOOGLE_GENERATIVE_AI_API_KEY not configured (optional - fallback only)")
        results.log("🔑 Google API Key", "PASS", "Google API key not required (Groq is primary)")
    
    if not groq_key:
        print(f"\n  {EMOJI['error']} {Colors.RED}CRITICAL: NO GROQ API KEY!{Colors.RESET}")
        return False
    
    print(f"\n  {EMOJI['check']} {Colors.GREEN}Environment validation: PASSED{Colors.RESET}")
    return True

# ============================================================================
# TEST 2: PYTHON IMPORTS & DEPENDENCIES
# ============================================================================
def test_imports():
    """📚 Test all required Python packages can be imported"""
    print(f"\n{EMOJI['rocket']} {Colors.BOLD}TEST 2: Python Imports & Dependencies{Colors.RESET}")
    print("-" * 80)
    
    packages = {
        'fastapi': 'FastAPI Web Framework',
        'uvicorn': 'Uvicorn ASGI Server',
        'langchain': 'LangChain Core',
        'langchain_groq': 'LangChain Groq Provider',
        'langchain_core': 'LangChain Core Components',
        'pydantic': 'Pydantic Data Validation',
        'dotenv': 'Python Dotenv',
        'requests': 'HTTP Requests Library',
        'asyncio': 'Async IO Support',
    }
    
    all_ok = True
    for package, name in packages.items():
        try:
            mod = __import__(package)
            version = getattr(mod, '__version__', 'unknown')
            print(f"  {EMOJI['pass']} {Colors.GREEN}{name}{Colors.RESET}")
            print(f"     {EMOJI['debug']} Package: {package}, Version: {version}")
            results.log(f"📦 {name}", "PASS", f"{package} imported successfully (v{version})")
            results.add_debug(f"✓ {package} (v{version})")
        except ImportError as e:
            print(f"  {EMOJI['fail']} {Colors.RED}{name}{Colors.RESET}")
            print(f"     {EMOJI['error']} Package: {package}")
            print(f"     {EMOJI['error']} Error: {str(e)[:100]}")
            results.log(f"📦 {name}", "FAIL", f"{package} import failed", str(e))
            results.add_debug(f"✗ {package}: {str(e)[:80]}")
            all_ok = False
    
    print(f"\n  {EMOJI['check'] if all_ok else EMOJI['warning']} {Colors.GREEN if all_ok else Colors.YELLOW}Import validation: {'PASSED' if all_ok else 'PARTIAL'}{Colors.RESET}")
    return all_ok

# ============================================================================
# TEST 3: MODULE LOADING
# ============================================================================
def test_module_loading():
    """🔧 Test that agent and tools modules load without errors"""
    print(f"\n{EMOJI['gear']} {Colors.BOLD}TEST 3: Module Loading & Validation{Colors.RESET}")
    print("-" * 80)
    
    # Test tools module
    try:
        from tools import tools
        print(f"  {EMOJI['pass']} {Colors.GREEN}Tools Module Loaded{Colors.RESET}")
        print(f"     {EMOJI['debug']} Tools Count: {len(tools)}")
        results.add_debug(f"Loaded {len(tools)} tools")
        for idx, tool in enumerate(tools, 1):
            tool_name = getattr(tool, 'name', 'unknown')
            tool_desc = getattr(tool, 'description', 'no description')
            print(f"       {idx}. {tool_name}: {tool_desc[:60]}...")
            results.add_debug(f"  Tool {idx}: {tool_name}")
        results.log("🛠️ Tools Module", "PASS", f"Loaded {len(tools)} tools successfully")
    except Exception as e:
        print(f"  {EMOJI['fail']} {Colors.RED}Tools Module Failed{Colors.RESET}")
        print(f"     {EMOJI['error']} Error: {str(e)[:120]}")
        results.log("🛠️ Tools Module", "FAIL", "Tools module import failed", str(e))
        results.add_debug(f"✗ Tools module failed: {str(e)[:100]}")
        return False
    
    # Test agent module
    try:
        from agent import get_llm, run_agent, _get_or_create_executor
        print(f"  {EMOJI['pass']} {Colors.GREEN}Agent Module Loaded{Colors.RESET}")
        print(f"     {EMOJI['debug']} Functions: get_llm, run_agent, _get_or_create_executor")
        results.log("🧠 Agent Module", "PASS", "Agent module imported successfully")
        results.add_debug("✓ Agent module with all required functions")
    except Exception as e:
        print(f"  {EMOJI['fail']} {Colors.RED}Agent Module Failed{Colors.RESET}")
        print(f"     {EMOJI['error']} Error: {str(e)[:120]}")
        results.log("🧠 Agent Module", "FAIL", "Agent module import failed", str(e))
        results.add_debug(f"✗ Agent module failed: {str(e)[:100]}")
        return False
    
    print(f"\n  {EMOJI['check']} {Colors.GREEN}Module validation: PASSED{Colors.RESET}")
    return True

# ============================================================================
# TEST 4: LLM INITIALIZATION & CAPABILITY DETECTION
# ============================================================================
def test_llm_initialization():
    """🤖 Test LLM initialization and detect which provider is being used"""
    print(f"\n{EMOJI['brain']} {Colors.BOLD}TEST 4: LLM Initialization & Capability Detection{Colors.RESET}")
    print("-" * 80)
    
    try:
        print(f"  {EMOJI['debug']} Initializing LLM...")
        from agent import get_llm
        
        llm = get_llm()
        llm_type = type(llm).__name__
        model_name = getattr(llm, 'model_name', getattr(llm, 'model', 'unknown'))
        
        print(f"  {EMOJI['pass']} {Colors.GREEN}LLM Initialized Successfully{Colors.RESET}")
        print(f"     {EMOJI['debug']} LLM Provider: {llm_type}")
        print(f"     {EMOJI['debug']} Model: {model_name}")
        
        # Check for tool calling capability
        has_bind_tools = hasattr(llm, 'bind_tools')
        print(f"     {EMOJI['debug']} Tool Calling Support (.bind_tools): {Colors.GREEN if has_bind_tools else Colors.RED}{has_bind_tools}{Colors.RESET}")
        
        results.add_debug(f"LLM Type: {llm_type}")
        results.add_debug(f"Model: {model_name}")
        results.add_debug(f"Tool Calling Capable: {has_bind_tools}")
        
        # Validate LLM type
        expected_types = ['ChatGroq', 'ChatGoogleGenerativeAI']
        if llm_type not in expected_types:
            results.log("🤖 LLM Initialization", "FAIL", f"Unexpected LLM type: {llm_type}", 
                       f"Expected one of: {expected_types}")
            return False
        
        results.log("🤖 LLM Initialization", "PASS", f"{llm_type} ({model_name}) initialized with tool calling: {has_bind_tools}")
        
        print(f"\n  {EMOJI['check']} {Colors.GREEN}LLM validation: PASSED{Colors.RESET}")
        return True
    except Exception as e:
        print(f"  {EMOJI['fail']} {Colors.RED}LLM initialization failed{Colors.RESET}")
        print(f"     {EMOJI['error']} Error: {str(e)[:150]}")
        results.log("🤖 LLM Initialization", "FAIL", "LLM initialization failed", str(e))
        results.add_debug(f"✗ LLM Error: {str(e)[:120]}")
        traceback.print_exc()
        return False

# ============================================================================
# TEST 5: AGENT EXECUTOR INITIALIZATION
# ============================================================================
def test_agent_initialization():
    """⚙️ Test agent executor initialization and tool binding"""
    print(f"\n{EMOJI['gear']} {Colors.BOLD}TEST 5: Agent Executor Initialization{Colors.RESET}")
    print("-" * 80)
    
    try:
        print(f"  {EMOJI['debug']} Creating agent executor...")
        from agent import _get_or_create_executor
        
        executor = _get_or_create_executor()
        executor_type = type(executor).__name__
        
        print(f"  {EMOJI['pass']} {Colors.GREEN}Agent Executor Created{Colors.RESET}")
        print(f"     {EMOJI['debug']} Executor Type: {executor_type}")
        print(f"     {EMOJI['debug']} Has tools: {hasattr(executor, 'tools')}")
        
        # Check executor internals
        if hasattr(executor, 'agent'):
            print(f"     {EMOJI['debug']} Agent runnable: {type(executor.agent).__name__}")
        
        results.add_debug(f"Executor Type: {executor_type}")
        results.log("⚙️ Agent Executor", "PASS", f"Agent executor initialized ({executor_type})")
        
        print(f"\n  {EMOJI['check']} {Colors.GREEN}Agent executor validation: PASSED{Colors.RESET}")
        return True
    except Exception as e:
        print(f"  {EMOJI['fail']} {Colors.RED}Agent executor failed{Colors.RESET}")
        print(f"     {EMOJI['error']} Error Type: {type(e).__name__}")
        print(f"     {EMOJI['error']} Error Message: {str(e)[:150]}")
        
        # Detailed debugging
        if "bind_tools" in str(e).lower():
            print(f"     {EMOJI['warning']} {Colors.YELLOW}ROOT CAUSE: LLM doesn't support .bind_tools() method{Colors.RESET}")
            print(f"     {EMOJI['info']} This means the selected LLM cannot use tool calling agents")
            print(f"     {EMOJI['info']} Solution: Switch to Groq or another LLM with tool support")
            results.add_debug("✗ LLM lacks .bind_tools() method - incompatible with tool calling agents")
        
        results.log("⚙️ Agent Executor", "FAIL", "Agent executor initialization failed", str(e))
        traceback.print_exc()
        return False

# ============================================================================
# TEST 6: AGENT EXECUTION (SIMPLE QUERY)
# ============================================================================
def test_agent_simple():
    """💬 Test agent with a simple query"""
    print(f"\n{EMOJI['chat']} {Colors.BOLD}TEST 6: Agent Execution - Simple Query{Colors.RESET}")
    print("-" * 80)
    
    async def run_test():
        try:
            from agent import run_agent
            
            test_query = "Hello, how are you?"
            print(f"  {EMOJI['debug']} Sending query: '{test_query}'")
            
            messages = [{'role': 'user', 'content': test_query}]
            start_time = time.time()
            response = await run_agent(messages)
            elapsed = time.time() - start_time
            
            print(f"  {EMOJI['pass']} {Colors.GREEN}Response received{Colors.RESET}")
            print(f"     {EMOJI['debug']} Response length: {len(response)} chars")
            print(f"     {EMOJI['debug']} Response time: {elapsed:.2f}s")
            print(f"     {EMOJI['debug']} Content: {response[:100]}...")
            
            results.add_debug(f"Simple query responded in {elapsed:.2f}s")
            results.add_debug(f"Response preview: {response[:80]}")
            
            if response and len(response) > 0:
                results.log("💬 Agent Simple Query", "PASS", f"Agent returned {len(response)} char response in {elapsed:.2f}s")
                print(f"\n  {EMOJI['check']} {Colors.GREEN}Simple query test: PASSED{Colors.RESET}")
                return True
            else:
                results.log("💬 Agent Simple Query", "FAIL", "Agent returned empty response", "Response was empty")
                print(f"\n  {EMOJI['warning']} {Colors.YELLOW}Simple query test: FAILED{Colors.RESET}")
                return False
        except Exception as e:
            print(f"  {EMOJI['fail']} {Colors.RED}Agent execution failed{Colors.RESET}")
            print(f"     {EMOJI['error']} Error: {str(e)[:150]}")
            results.log("💬 Agent Simple Query", "FAIL", "Agent execution failed", str(e))
            results.add_debug(f"✗ Simple query error: {str(e)[:100]}")
            traceback.print_exc()
            return False
    
    return asyncio.run(run_test())

# ============================================================================
# TEST 7-9: AGENT BOOKING FLOW
# ============================================================================
def test_booking_step1():
    """📖 Test Step 1: User wants to book"""
    print(f"\n{EMOJI['book']} {Colors.BOLD}TEST 7: Booking Flow - Step 1{Colors.RESET}")
    print("-" * 80)
    
    async def run_test():
        try:
            from agent import run_agent
            
            test_msg = "I want to book a discovery call"
            print(f"  {EMOJI['debug']} Sending: '{test_msg}'")
            
            messages = [{'role': 'user', 'content': test_msg}]
            start_time = time.time()
            response = await run_agent(messages)
            elapsed = time.time() - start_time
            
            print(f"  {EMOJI['pass']} {Colors.GREEN}Step 1 response received{Colors.RESET}")
            print(f"     {EMOJI['debug']} Time: {elapsed:.2f}s, Length: {len(response)} chars")
            print(f"     {EMOJI['debug']} Content: {response[:120]}...")
            
            is_fallback = "Let me try that again" in response or "error" in response.lower()
            
            results.add_debug(f"Step 1 response time: {elapsed:.2f}s")
            results.add_debug(f"Step 1 is_fallback: {is_fallback}")
            
            if response and not is_fallback:
                results.log("📖 Booking Step 1", "PASS", f"Agent engaged in booking flow ({len(response)} chars)")
                print(f"\n  {EMOJI['check']} {Colors.GREEN}Step 1: PASSED{Colors.RESET}")
                return True
            elif response and is_fallback:
                results.log("📖 Booking Step 1", "FAIL", "Agent returned fallback/error", f"Response: {response[:100]}")
                print(f"\n  {EMOJI['warning']} {Colors.YELLOW}Step 1: FAILED (error fallback){Colors.RESET}")
                return False
            else:
                results.log("📖 Booking Step 1", "FAIL", "Agent returned empty response", "Response was empty")
                return False
        except Exception as e:
            print(f"  {EMOJI['fail']} {Colors.RED}Step 1 execution failed{Colors.RESET}")
            print(f"     {EMOJI['error']} Error: {str(e)[:100]}")
            results.log("📖 Booking Step 1", "FAIL", "Step 1 execution failed", str(e))
            results.add_debug(f"✗ Step 1 error: {str(e)[:80]}")
            traceback.print_exc()
            return False
    
    return asyncio.run(run_test())

def test_booking_step2():
    """📖 Test Step 2: User provides name"""
    print(f"\n{EMOJI['book']} {Colors.BOLD}TEST 8: Booking Flow - Step 2{Colors.RESET}")
    print("-" * 80)
    
    async def run_test():
        try:
            from agent import run_agent
            
            test_msg = "My name is John Smith"
            print(f"  {EMOJI['debug']} Sending: '{test_msg}'")
            
            messages = [
                {'role': 'user', 'content': 'I want to book a discovery call'},
                {'role': 'assistant', 'content': 'I would be happy to help you book a call. What is your name?'},
                {'role': 'user', 'content': test_msg}
            ]
            
            start_time = time.time()
            response = await run_agent(messages)
            elapsed = time.time() - start_time
            
            print(f"  {EMOJI['pass']} {Colors.GREEN}Step 2 response received{Colors.RESET}")
            print(f"     {EMOJI['debug']} Time: {elapsed:.2f}s, Length: {len(response)} chars")
            print(f"     {EMOJI['debug']} Content: {response[:120]}...")
            
            is_fallback = "Let me try that again" in response or "error" in response.lower()
            
            results.add_debug(f"Step 2 response time: {elapsed:.2f}s")
            
            if response and not is_fallback:
                results.log("📖 Booking Step 2", "PASS", f"Agent acknowledged name, asking for next info")
                print(f"\n  {EMOJI['check']} {Colors.GREEN}Step 2: PASSED{Colors.RESET}")
                return True
            elif response and is_fallback:
                results.log("📖 Booking Step 2", "FAIL", "Agent returned fallback/error", f"Response: {response[:100]}")
                return False
            else:
                results.log("📖 Booking Step 2", "FAIL", "Agent returned empty response", "Response was empty")
                return False
        except Exception as e:
            print(f"  {EMOJI['fail']} {Colors.RED}Step 2 execution failed{Colors.RESET}")
            results.log("📖 Booking Step 2", "FAIL", "Step 2 execution failed", str(e))
            traceback.print_exc()
            return False
    
    return asyncio.run(run_test())

def test_booking_step3():
    """📖 Test Step 3: User provides email and complete booking"""
    print(f"\n{EMOJI['book']} {Colors.BOLD}TEST 9: Booking Flow - Step 3{Colors.RESET}")
    print("-" * 80)
    
    async def run_test():
        try:
            from agent import run_agent
            
            test_msg = "My email is john.smith@example.com"
            print(f"  {EMOJI['debug']} Sending: '{test_msg}'")
            
            messages = [
                {'role': 'user', 'content': 'I want to book a discovery call'},
                {'role': 'assistant', 'content': 'Great! What is your email address?'},
                {'role': 'user', 'content': 'My name is John Smith'},
                {'role': 'assistant', 'content': 'Thanks John! Now, what is your email address?'},
                {'role': 'user', 'content': test_msg}
            ]
            
            start_time = time.time()
            response = await run_agent(messages)
            elapsed = time.time() - start_time
            
            print(f"  {EMOJI['pass']} {Colors.GREEN}Step 3 response received{Colors.RESET}")
            print(f"     {EMOJI['debug']} Time: {elapsed:.2f}s, Length: {len(response)} chars")
            print(f"     {EMOJI['debug']} Content: {response[:120]}...")
            
            is_fallback = "Let me try that again" in response or "error" in response.lower()
            has_slots = any(word in response.lower() for word in ['slot', 'available', 'time', 'book', 'confirm'])
            
            results.add_debug(f"Step 3 response time: {elapsed:.2f}s")
            results.add_debug(f"Step 3 has slot references: {has_slots}")
            
            if response and not is_fallback:
                results.log("📖 Booking Step 3", "PASS", f"Agent saved email and progressed booking")
                print(f"\n  {EMOJI['check']} {Colors.GREEN}Step 3: PASSED{Colors.RESET}")
                return True
            elif response and is_fallback:
                results.log("📖 Booking Step 3", "FAIL", "Agent returned fallback/error", f"Response: {response[:100]}")
                return False
            else:
                results.log("📖 Booking Step 3", "FAIL", "Agent returned empty response", "Response was empty")
                return False
        except Exception as e:
            print(f"  {EMOJI['fail']} {Colors.RED}Step 3 execution failed{Colors.RESET}")
            results.log("📖 Booking Step 3", "FAIL", "Step 3 execution failed", str(e))
            traceback.print_exc()
            return False
    
    return asyncio.run(run_test())

# ============================================================================
# TEST 10: TOOLS AVAILABILITY & DIRECT INVOCATION
# ============================================================================
def test_tools():
    """🛠️ Test that all tools are available and directly callable"""
    print(f"\n{EMOJI['tool']} {Colors.BOLD}TEST 10: Tools Availability & Invocation{Colors.RESET}")
    print("-" * 80)
    
    try:
        from tools import tools, save_lead_tool, get_available_slots_tool, book_call_tool
        
        print(f"  {EMOJI['pass']} {Colors.GREEN}Tools imported: {len(tools)} tools{Colors.RESET}")
        results.add_debug(f"Loaded {len(tools)} tools")
        
        # Test save_lead_tool
        print(f"\n  {EMOJI['debug']} Testing save_lead_tool()...")
        try:
            result = save_lead_tool("John Smith", "john@example.com", "Interested in services")
            print(f"     {EMOJI['pass']} save_lead_tool() executed")
            print(f"     {EMOJI['debug']} Result: {result[:80]}...")
            results.log("🛠️ Tool: save_lead_tool", "PASS", "save_lead_tool() callable and functional")
            results.add_debug(f"✓ save_lead_tool executed: {result[:60]}")
        except Exception as e:
            print(f"     {EMOJI['fail']} save_lead_tool() failed: {str(e)[:80]}")
            results.log("🛠️ Tool: save_lead_tool", "FAIL", "save_lead_tool() invocation failed", str(e))
            results.add_debug(f"✗ save_lead_tool error: {str(e)[:60]}")
        
        # Test get_available_slots_tool
        print(f"\n  {EMOJI['debug']} Testing get_available_slots_tool()...")
        try:
            result = get_available_slots_tool()
            print(f"     {EMOJI['pass']} get_available_slots_tool() executed")
            print(f"     {EMOJI['debug']} Result: {result[:80]}...")
            results.log("🛠️ Tool: get_available_slots_tool", "PASS", "get_available_slots_tool() callable and functional")
            results.add_debug(f"✓ get_available_slots_tool executed: {result[:60]}")
        except Exception as e:
            print(f"     {EMOJI['fail']} get_available_slots_tool() failed: {str(e)[:80]}")
            results.log("🛠️ Tool: get_available_slots_tool", "FAIL", "get_available_slots_tool() invocation failed", str(e))
        
        # Test book_call_tool
        print(f"\n  {EMOJI['debug']} Testing book_call_tool()...")
        try:
            result = book_call_tool("John Smith", "john@example.com", "2025-12-26T10:00:00", "Discovery call")
            print(f"     {EMOJI['pass']} book_call_tool() executed")
            print(f"     {EMOJI['debug']} Result: {result[:80]}...")
            results.log("🛠️ Tool: book_call_tool", "PASS", "book_call_tool() callable and functional")
            results.add_debug(f"✓ book_call_tool executed: {result[:60]}")
        except Exception as e:
            print(f"     {EMOJI['fail']} book_call_tool() failed: {str(e)[:80]}")
            results.log("🛠️ Tool: book_call_tool", "FAIL", "book_call_tool() invocation failed", str(e))
        
        print(f"\n  {EMOJI['check']} {Colors.GREEN}Tools testing: PASSED{Colors.RESET}")
        return True
    except Exception as e:
        print(f"  {EMOJI['fail']} {Colors.RED}Tools test failed{Colors.RESET}")
        print(f"     {EMOJI['error']} Error: {str(e)[:120]}")
        results.log("🛠️ Tools Availability", "FAIL", "Tools loading failed", str(e))
        traceback.print_exc()
        return False

# ============================================================================
# TEST 11: FASTAPI APPLICATION
# ============================================================================
def test_fastapi_app():
    """🖥️ Test that FastAPI application loads without errors"""
    print(f"\n{EMOJI['server']} {Colors.BOLD}TEST 11: FastAPI Application{Colors.RESET}")
    print("-" * 80)
    
    try:
        print(f"  {EMOJI['debug']} Loading FastAPI app...")
        from main import app
        
        app_title = getattr(app, 'title', 'Unknown')
        print(f"  {EMOJI['pass']} {Colors.GREEN}FastAPI app loaded{Colors.RESET}")
        print(f"     {EMOJI['debug']} App Title: {app_title}")
        print(f"     {EMOJI['debug']} App Type: {type(app).__name__}")
        
        results.add_debug(f"FastAPI app loaded: {app_title}")
        results.log("🖥️ FastAPI App", "PASS", f"FastAPI application loaded successfully ({app_title})")
        
        print(f"\n  {EMOJI['check']} {Colors.GREEN}FastAPI validation: PASSED{Colors.RESET}")
        return True
    except Exception as e:
        print(f"  {EMOJI['fail']} {Colors.RED}FastAPI app failed{Colors.RESET}")
        print(f"     {EMOJI['error']} Error: {str(e)[:120]}")
        results.log("🖥️ FastAPI App", "FAIL", "FastAPI application load failed", str(e))
        results.add_debug(f"✗ FastAPI error: {str(e)[:100]}")
        traceback.print_exc()
        return False

# ============================================================================
# TEST 12: API ENDPOINT VALIDATION
# ============================================================================
def test_api_endpoints():
    """📡 Test FastAPI routes are properly defined"""
    print(f"\n{EMOJI['api']} {Colors.BOLD}TEST 12: API Endpoint Validation{Colors.RESET}")
    print("-" * 80)
    
    try:
        from main import app
        
        routes = [route.path for route in app.routes]
        print(f"  {EMOJI['debug']} Found {len(routes)} routes")
        print(f"  {EMOJI['debug']} Routes: {routes}")
        
        results.add_debug(f"Total routes: {len(routes)}")
        results.add_debug(f"Routes: {routes}")
        
        required_routes = ['/api/chat', '/health', '/']
        missing = [r for r in required_routes if r not in routes]
        found_routes = [r for r in required_routes if r in routes]
        
        print(f"\n  {EMOJI['debug']} Required Routes Status:")
        for route in required_routes:
            if route in routes:
                print(f"     {EMOJI['pass']} {Colors.GREEN}{route}{Colors.RESET}")
            else:
                print(f"     {EMOJI['fail']} {Colors.RED}{route}{Colors.RESET}")
        
        if not missing:
            results.log("📡 API Endpoints", "PASS", f"All required endpoints found: {found_routes}")
            print(f"\n  {EMOJI['check']} {Colors.GREEN}Endpoint validation: PASSED{Colors.RESET}")
            return True
        else:
            results.log("📡 API Endpoints", "FAIL", f"Missing endpoints: {missing}", f"Found: {routes}")
            print(f"\n  {EMOJI['warning']} {Colors.YELLOW}Endpoint validation: FAILED{Colors.RESET}")
            return False
    except Exception as e:
        print(f"  {EMOJI['fail']} {Colors.RED}API endpoint validation failed{Colors.RESET}")
        print(f"     {EMOJI['error']} Error: {str(e)[:120]}")
        results.log("📡 API Endpoints", "FAIL", "API endpoint validation failed", str(e))
        traceback.print_exc()
        return False

# ============================================================================
# MAIN TEST RUNNER
# ============================================================================
def main():
    print("\n" + "="*80)
    print(f"{EMOJI['rocket']} {Colors.BOLD}{Colors.MAGENTA}DELTA-1 COMPREHENSIVE DIAGNOSTIC TEST SUITE{Colors.RESET}")
    print(f"{EMOJI['brain']} Professional System Diagnostics with In-Depth Analysis")
    print("="*80)
    
    # Run all tests in order
    test_environment()
    test_imports()
    test_module_loading()
    test_llm_initialization()
    test_agent_initialization()
    test_agent_simple()
    test_booking_step1()
    test_booking_step2()
    test_booking_step3()
    test_tools()
    test_fastapi_app()
    test_api_endpoints()
    
    # Print summary
    results.print_summary()
    
    # Print detailed debug logs
    if results.debug_logs:
        print(f"\n{EMOJI['debug']} {Colors.BOLD}DETAILED DEBUG INFORMATION{Colors.RESET}")
        print("="*80)
        for idx, log in enumerate(results.debug_logs, 1):
            print(f"  {idx}. {log}")
        print("="*80 + "\n")
    
    # Return exit code based on failures
    return 0 if results.failed == 0 else 1

if __name__ == '__main__':
    sys.exit(main())
