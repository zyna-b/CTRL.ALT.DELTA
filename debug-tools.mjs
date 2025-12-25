
const API_URL = 'http://localhost:3000/api/chat';

async function sendMessage(messages) {
  console.log('Sending messages:', JSON.stringify(messages, null, 2));
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error(`API returned ${response.status}: ${await response.text()}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let fullResponse = '';

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      process.stdout.write(chunk);
      fullResponse += chunk;
    }
  }
  console.log('\n\nFull Response Length:', fullResponse.length);
  return fullResponse;
}

(async () => {
  try {
    console.log('--- Debugging Test 3 ---');
    await sendMessage([
      { role: 'user', content: 'I want to book a call' },
      { role: 'assistant', content: "Great! What's your name and email?" },
      { role: 'user', content: "I'm Test User, email is test@example.com" }
    ]);
  } catch (e) {
    console.error(e);
  }
})();
