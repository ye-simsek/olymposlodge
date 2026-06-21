<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatLog;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    private string $fallbackPrompt = <<<'PROMPT'
You are "Olympos", the digital assistant of Olympos Lodge in Çıralı, Turkey.
Answer questions about Olympos Lodge and the Çıralı / Olympos region only.
Always reply in the guest's language (German, English or Turkish). Be warm and concise.
Never invent information. For details or bookings: info@olymposlodge.com.tr | +90 242 825 71 71 | /booking
PROMPT;

    private function getSystemPrompt(): string
    {
        return Setting::getValue('chat_system_prompt') ?? $this->fallbackPrompt;
    }

    public function send(Request $request)
    {
        $request->validate([
            'messages'          => 'required|array|min:1|max:40',
            'messages.*.role'   => 'required|in:user,model',
            'messages.*.text'   => 'required|string|max:2000',
            'conversation_id'   => 'nullable|uuid',
            'language'          => 'nullable|string|max:5',
        ]);

        $apiKey = config('services.gemini.key');
        if (! $apiKey) {
            return response()->json(['error' => 'Chatbot not configured.', 'unavailable' => true], 503);
        }

        $contents = collect($request->messages)
            ->map(fn ($m) => [
                'role'  => $m['role'],
                'parts' => [['text' => $m['text']]],
            ])
            ->values()
            ->all();

        $response = Http::timeout(30)->post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}",
            [
                'system_instruction' => ['parts' => [['text' => $this->getSystemPrompt()]]],
                'contents'           => $contents,
                'generationConfig'   => [
                    'maxOutputTokens' => 1024,
                    'temperature'     => 0.4,
                ],
            ]
        );

        if (! $response->successful()) {
            \Illuminate\Support\Facades\Log::error('Gemini API error', [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);
            return response()->json(['error' => 'AI service temporarily unavailable.', 'unavailable' => true], 502);
        }

        $text = $response->json('candidates.0.content.parts.0.text')
            ?? 'Sorry, I could not generate a response.';

        $userMessage = collect($request->messages)->last(fn ($m) => $m['role'] === 'user');
        if ($userMessage) {
            ChatLog::create([
                'conversation_id' => $request->input('conversation_id') ?? (string) \Illuminate\Support\Str::uuid(),
                'user_message'    => $userMessage['text'],
                'bot_response'    => $text,
                'language'        => $request->input('language'),
            ]);
        }

        return response()->json(['text' => $text]);
    }
}
