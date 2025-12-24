/**
 * Tests for SQLite session storage
 */

import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import {
  addMessage,
  closeDb,
  createSession,
  deleteSession,
  getLastSession,
  getSession,
  listSessions,
  updateSessionStats,
} from './storage.js';

describe('storage', () => {
  let testSessionId: string;

  beforeAll(() => {
    // Tests use the real database (creates in data dir)
  });

  afterAll(() => {
    // Clean up test data
    if (testSessionId) {
      deleteSession(testSessionId);
    }
    closeDb();
  });

  test('creates a session', () => {
    const session = createSession('claude-sonnet-4', '/tmp/test');
    testSessionId = session.id;

    expect(session.id).toBeDefined();
    expect(session.model).toBe('claude-sonnet-4');
    expect(session.messages).toEqual([]);
    expect(session.totalTokens).toBe(0);
  });

  test('adds messages to session', () => {
    const userMsg = addMessage(testSessionId, 'user', 'Hello, Claude!', 5);
    expect(userMsg.role).toBe('user');
    expect(userMsg.content).toBe('Hello, Claude!');
    expect(userMsg.tokens).toBe(5);

    const assistantMsg = addMessage(testSessionId, 'assistant', 'Hello! How can I help?', 10);
    expect(assistantMsg.role).toBe('assistant');
  });

  test('retrieves session with messages', () => {
    const session = getSession(testSessionId);

    expect(session).not.toBeNull();
    expect(session?.messages.length).toBe(2);
    expect(session?.messages[0].role).toBe('user');
    expect(session?.messages[1].role).toBe('assistant');
  });

  test('updates session stats', () => {
    updateSessionStats(testSessionId, 100, 0.05, 'Test conversation');

    const session = getSession(testSessionId);
    expect(session?.totalTokens).toBe(100);
    expect(session?.totalCost).toBe(0.05);
  });

  test('lists sessions', () => {
    const sessions = listSessions(5);

    expect(sessions.length).toBeGreaterThan(0);
    expect(sessions[0].id).toBeDefined();
  });

  test('gets last session', () => {
    const last = getLastSession();

    expect(last).not.toBeNull();
    expect(last?.id).toBe(testSessionId);
  });

  test('deletes session', () => {
    const deleted = deleteSession(testSessionId);
    expect(deleted).toBe(true);

    const session = getSession(testSessionId);
    expect(session).toBeNull();

    // Clear so afterAll doesn't try to delete again
    testSessionId = '';
  });
});
