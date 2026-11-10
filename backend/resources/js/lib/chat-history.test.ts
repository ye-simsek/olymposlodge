import { describe, expect, it } from 'vitest';
import { buildChatHistory, MAX_HISTORY_MESSAGES, MAX_MESSAGE_CHARS, type ChatMessage } from './chat-history';

const user = (text: string): ChatMessage => ({ role: 'user', text });
const model = (text: string): ChatMessage => ({ role: 'model', text });

describe('buildChatHistory', () => {
    it('truncates a long model reply to the length the server accepts', () => {
        const history = buildChatHistory([user('hi'), model('x'.repeat(5000)), user('and then?')]);

        expect(history[1].text.length).toBe(MAX_MESSAGE_CHARS);
        expect(history.every((m) => m.text.length <= MAX_MESSAGE_CHARS)).toBe(true);
    });

    it('keeps only the most recent messages in a long conversation', () => {
        const long: ChatMessage[] = [];
        for (let i = 0; i < 60; i++) long.push(user(`q${i}`), model(`a${i}`));
        long.push(user('latest'));

        const history = buildChatHistory(long);

        expect(history.length).toBeLessThanOrEqual(MAX_HISTORY_MESSAGES);
        expect(history.at(-1)).toEqual({ role: 'user', text: 'latest' });
    });

    it('always starts with a user turn', () => {
        const long: ChatMessage[] = [];
        for (let i = 0; i < 60; i++) long.push(user(`q${i}`), model(`a${i}`));

        expect(buildChatHistory(long)[0].role).toBe('user');
    });

    it('leaves local error bubbles out of what is sent to the model', () => {
        const history = buildChatHistory([
            user('hi'),
            { role: 'model', text: 'Assistant temporarily unavailable', error: true },
            user('hello?'),
        ]);

        expect(history).toEqual([user('hi'), user('hello?')]);
    });

    it('sends only role and text', () => {
        expect(Object.keys(buildChatHistory([user('hi')])[0]).sort()).toEqual(['role', 'text']);
    });
});
