#!/usr/bin/env python3
"""
End-to-end test of the booking flow
"""
import requests
import json

BASE_URL = "http://localhost:8000/api/chat"

def test_flow():
    print("=" * 60)
    print("TESTING BOOKING FLOW")
    print("=" * 60)
    
    # Step 1: Request booking
    print("\n[1] User: I want to book a discovery call")
    res1 = requests.post(BASE_URL, json={
        "messages": [{"role": "user", "content": "I want to book a discovery call"}]
    })
    text1 = res1.text
    print(f"    Bot: {text1}\n")
    
    # Step 2: Provide name
    print("[2] User: Alice Smith")
    res2 = requests.post(BASE_URL, json={
        "messages": [
            {"role": "user", "content": "I want to book a discovery call"},
            {"role": "assistant", "content": text1},
            {"role": "user", "content": "Alice Smith"}
        ]
    })
    text2 = res2.text
    print(f"    Bot: {text2}\n")
    
    # Step 3: Provide email
    print("[3] User: alice@company.com")
    res3 = requests.post(BASE_URL, json={
        "messages": [
            {"role": "user", "content": "I want to book a discovery call"},
            {"role": "assistant", "content": text1},
            {"role": "user", "content": "Alice Smith"},
            {"role": "assistant", "content": text2},
            {"role": "user", "content": "alice@company.com"}
        ]
    })
    text3 = res3.text
    print(f"    Bot: {text3}\n")
    
    # Step 4: Select time
    print("[4] User: 2025-12-26T10:00:00")
    res4 = requests.post(BASE_URL, json={
        "messages": [
            {"role": "user", "content": "I want to book a discovery call"},
            {"role": "assistant", "content": text1},
            {"role": "user", "content": "Alice Smith"},
            {"role": "assistant", "content": text2},
            {"role": "user", "content": "alice@company.com"},
            {"role": "assistant", "content": text3},
            {"role": "user", "content": "2025-12-26T10:00:00"}
        ]
    })
    text4 = res4.text
    print(f"    Bot: {text4}\n")
    
    print("=" * 60)
    print("TEST COMPLETE")
    print("=" * 60)

if __name__ == "__main__":
    try:
        test_flow()
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
