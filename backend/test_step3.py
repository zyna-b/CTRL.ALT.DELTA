import requests

# Test step 3 - provide email
msg1 = {'role': 'user', 'content': 'I want to book a discovery call'}
msg2 = {'role': 'assistant', 'content': "What's your name and email?"}
msg3 = {'role': 'user', 'content': 'Alice Smith'}
msg4 = {'role': 'assistant', 'content': "I need your email too. What's your email, Alice?"}
msg5 = {'role': 'user', 'content': 'alice@company.com'}

r = requests.post('http://localhost:8000/api/chat', json={'messages': [msg1, msg2, msg3, msg4, msg5]})
print(f'Status: {r.status_code}')
print(f'Response: {r.text}')
