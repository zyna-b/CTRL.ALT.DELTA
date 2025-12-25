/**
 * Delta-1 Agent Pipeline Integration Tests
 * Tests the complete conversation flow and tool execution
 */

import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';

const API_URL = 'http://localhost:3000/api/chat';

// Use singleton pattern for Prisma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Test user data
const testUser = {
  name: 'Test User',
  email: `test-${Date.now()}@example.com`,
  intent: 'Testing lead generation automation',
};

describe('Delta-1 Agent Pipeline', () => {
  beforeAll(async () => {
    // Clean up any existing test data
    await prisma.lead.deleteMany({
      where: { email: { contains: '@example.com' } },
    });
    await prisma.callRequest.deleteMany({
      where: { email: { contains: '@example.com' } },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.lead.deleteMany({
      where: { email: testUser.email },
    });
    await prisma.callRequest.deleteMany({
      where: { email: testUser.email },
    });
    await prisma.$disconnect();
  });

  it('should respond to initial greeting', async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hey, what do you guys do?' }],
      }),
    });

    expect(response.ok).toBe(true);
    expect(response.headers.get('content-type')).toContain('text/plain');

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullResponse += decoder.decode(value, { stream: true });
      }
    }

    console.log('\n📝 Agent Response to Greeting:', fullResponse.substring(0, 200) + '...');
    
    expect(fullResponse.toLowerCase()).toMatch(/ai|automation|ctrl\.alt\.delta|build|chatbot/i);
  }, 15000);

  it('should suggest booking a call when problem is mentioned', async () => {
    const messages = [
      { role: 'user', content: 'Hey, what do you guys do?' },
      {
        role: 'assistant',
        content:
          "We build AI that actually works for your business — custom chatbots, automation, lead gen tools. What's eating up most of your time?",
      },
      { role: 'user', content: 'We spend way too much time manually qualifying leads' },
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullResponse += decoder.decode(value, { stream: true });
      }
    }

    console.log('\n📝 Agent Response to Problem:', fullResponse.substring(0, 200) + '...');

    expect(fullResponse.toLowerCase()).toMatch(/call|book|calendar|zainab|schedule/i);
  }, 15000);

  it('should ask for contact details when user agrees to book', async () => {
    const messages = [
      { role: 'user', content: 'Hey, what do you guys do?' },
      {
        role: 'assistant',
        content:
          "We build AI automation systems. What's eating up most of your time?",
      },
      { role: 'user', content: 'We spend way too much time manually qualifying leads' },
      {
        role: 'assistant',
        content:
          "Oh, we've solved that exact problem before. Want me to book you a quick 15-min call with Zainab?",
      },
      { role: 'user', content: 'Yes, let\'s book a call' },
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullResponse += decoder.decode(value, { stream: true });
      }
    }

    console.log('\n📝 Agent Response to Booking Agreement:', fullResponse.substring(0, 200) + '...');

    expect(fullResponse.toLowerCase()).toMatch(/name|email/i);
  }, 15000);

  it('should show available slots when contact details are provided', async () => {
    const messages = [
      { role: 'user', content: 'Hey, what do you guys do?' },
      {
        role: 'assistant',
        content: "We build AI automation. What's eating up your time?",
      },
      { role: 'user', content: 'Lead qualification takes forever' },
      {
        role: 'assistant',
        content: "Want to book a call with Zainab? What's your name and email?",
      },
      { role: 'user', content: `I'm ${testUser.name}, email is ${testUser.email}` },
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullResponse += decoder.decode(value, { stream: true });
      }
    }

    console.log('\n📝 Agent Response with Slots:', fullResponse.substring(0, 300) + '...');

    // Should show time slots
    expect(fullResponse.toLowerCase()).toMatch(/(monday|tuesday|wednesday|thursday|friday|available|slot|time)/i);
    
    // Should have saved lead to database
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for async DB operation
    
    const savedLead = await prisma.lead.findFirst({
      where: { email: testUser.email },
    });

    console.log('\n✅ Lead saved to database:', savedLead ? 'YES' : 'NO');
    expect(savedLead).toBeTruthy();
    expect(savedLead?.name).toBe(testUser.name);
  }, 20000);

  it('should complete booking when time slot is selected', async () => {
    // First, get available slots to pick a real one
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const messages = [
      { role: 'user', content: 'Hey, what do you guys do?' },
      {
        role: 'assistant',
        content: "We build AI automation. What's eating up your time?",
      },
      { role: 'user', content: 'Lead qualification' },
      {
        role: 'assistant',
        content: "Let's book a call. What's your name and email?",
      },
      { role: 'user', content: `I'm ${testUser.name}, ${testUser.email}` },
      {
        role: 'assistant',
        content: `Here's what's available:\n• Thursday at 10:00 AM\n• Thursday at 2:00 PM\n• Friday at 10:00 AM`,
      },
      { role: 'user', content: 'Thursday at 2pm works' },
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullResponse += decoder.decode(value, { stream: true });
      }
    }

    console.log('\n📝 Agent Booking Confirmation:', fullResponse.substring(0, 300) + '...');

    // Should confirm booking
    expect(fullResponse.toLowerCase()).toMatch(/(booked|confirmed|calendar|invite|email)/i);
    
    // Wait for async DB operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Should have created call request in database
    const callRequest = await prisma.callRequest.findFirst({
      where: { email: testUser.email },
    });

    console.log('\n✅ Call request saved to database:', callRequest ? 'YES' : 'NO');
    console.log('   Status:', callRequest?.status);
    console.log('   Booking Link/ID:', callRequest?.bookingLink || callRequest?.bookingId);
    
    expect(callRequest).toBeTruthy();
    expect(callRequest?.name).toBe(testUser.name);
    expect(callRequest?.status).toMatch(/confirmed|pending|link_generated/i);
  }, 20000);

  it('should handle edge case: user provides email in different format', async () => {
    const altEmail = `alt-test-${Date.now()}@company.com`;
    
    const messages = [
      { role: 'user', content: 'I want to book a call' },
      {
        role: 'assistant',
        content: "Great! What's your name and email?",
      },
      { role: 'user', content: `Name: John Doe, Email: ${altEmail}` },
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullResponse += decoder.decode(value, { stream: true });
      }
    }

    console.log('\n📝 Agent Response to Alt Format:', fullResponse.substring(0, 200) + '...');

    // Should still work and show slots or ask clarification
    expect(fullResponse.length).toBeGreaterThan(0);
    
    // Clean up
    await prisma.lead.deleteMany({ where: { email: altEmail } });
    await prisma.callRequest.deleteMany({ where: { email: altEmail } });
  }, 15000);
});

describe('Database Integration', () => {
  it('should verify Lead model schema', async () => {
    const testLead = await prisma.lead.create({
      data: {
        name: 'Schema Test',
        email: `schema-test-${Date.now()}@example.com`,
        details: 'Testing schema',
        source: 'test',
      },
    });

    console.log('\n✅ Lead created with ID:', testLead.id);
    expect(testLead.id).toBeTruthy();
    expect(testLead.createdAt).toBeInstanceOf(Date);

    await prisma.lead.delete({ where: { id: testLead.id } });
  });

  it('should verify CallRequest model schema', async () => {
    const testCallRequest = await prisma.callRequest.create({
      data: {
        name: 'Schema Test',
        email: `schema-test-${Date.now()}@example.com`,
        intent: 'Testing schema',
        selectedTime: new Date(),
        status: 'pending',
      },
    });

    console.log('\n✅ CallRequest created with ID:', testCallRequest.id);
    expect(testCallRequest.id).toBeTruthy();
    expect(testCallRequest.createdAt).toBeInstanceOf(Date);

    await prisma.callRequest.delete({ where: { id: testCallRequest.id } });
  });
});

describe('Tool Execution', () => {
  it('should verify saveLead tool saves to database', async () => {
    const uniqueEmail = `tool-test-${Date.now()}@example.com`;
    
    const messages = [
      { role: 'user', content: `I'm Tool Test User, my email is ${uniqueEmail}, interested in automation` },
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    // Consume stream
    const reader = response.body?.getReader();
    if (reader) {
      while (true) {
        const { done } = await reader.read();
        if (done) break;
      }
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const lead = await prisma.lead.findFirst({
      where: { email: uniqueEmail },
    });

    console.log('\n✅ saveLead tool executed:', lead ? 'SUCCESS' : 'FAILED');
    expect(lead).toBeTruthy();

    await prisma.lead.delete({ where: { id: lead!.id } });
  }, 15000);
});
