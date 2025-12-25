export const maxDuration = 30;

const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:8000';

export async function POST(req: Request) {
  try {
    console.log('[Next.js Route] Received chat request');
    console.log('[Next.js Route] Python API URL:', PYTHON_API_URL);
    
    const { messages } = await req.json();
    console.log('[Next.js Route] Messages:', JSON.stringify(messages).substring(0, 100));
    
    console.log('[Next.js Route] Forwarding to Python API...');
    const response = await fetch(`${PYTHON_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    console.log('[Next.js Route] Python API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Next.js Route] Python API error:', errorText);
      throw new Error(`Python API returned ${response.status}: ${errorText}`);
    }

    console.log('[Next.js Route] Streaming response...');
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('[Next.js Route] Error:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    return new Response(`AI agent error: ${errorMsg}`, { status: 500 });
  }
}
