export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    /** A local "assistant unavailable" bubble. Shown to the guest, never sent to the model. */
    error?: boolean;
}

// Must stay within the limits in ChatController::send() (max:40 messages, max:2000 chars each).
// A request that breaks them is rejected with 422, which used to lock the chat until reload.
export const MAX_HISTORY_MESSAGES = 20;
export const MAX_MESSAGE_CHARS = 2000;

/** The slice of the conversation that is sent to the server with each new message. */
export function buildChatHistory(messages: ChatMessage[]): Array<Pick<ChatMessage, 'role' | 'text'>> {
    const recent = messages.filter((m) => !m.error).slice(-MAX_HISTORY_MESSAGES);

    // The model expects the conversation to open with the guest, not with itself.
    const firstUser = recent.findIndex((m) => m.role === 'user');

    return recent
        .slice(firstUser === -1 ? recent.length : firstUser)
        .map(({ role, text }) => ({ role, text: text.slice(0, MAX_MESSAGE_CHARS) }));
}
