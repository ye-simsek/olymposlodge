<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ChatRateLimitTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'services.gemini.key' => 'test-key',
            'services.gemini.rate_limit' => 3,
        ]);

        // Kein echter Gemini-Call: gültige Antwortstruktur faken
        // (ChatController liest candidates.0.content.parts.0.text).
        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [
                    ['content' => ['parts' => [['text' => 'Hallo!']]]],
                ],
            ]),
        ]);
    }

    private function sendChat(string $ip = '10.1.1.1')
    {
        return $this->withServerVariables(['REMOTE_ADDR' => $ip])
            ->postJson('/api/v1/chat', [
                'messages' => [['role' => 'user', 'text' => 'Hi']],
            ]);
    }

    public function test_allows_requests_under_the_limit(): void
    {
        for ($i = 0; $i < 3; $i++) {
            $this->sendChat()->assertOk();
        }
    }

    public function test_blocks_requests_over_the_limit(): void
    {
        for ($i = 0; $i < 3; $i++) {
            $this->sendChat()->assertOk();
        }

        $response = $this->sendChat();

        $response->assertStatus(429);
        $response->assertJson(['unavailable' => false]);
        $response->assertJsonStructure(['error', 'unavailable', 'retry_after']);
    }

    public function test_limit_is_per_ip(): void
    {
        for ($i = 0; $i < 3; $i++) {
            $this->sendChat('10.1.1.1')->assertOk();
        }

        // Andere IP hat einen eigenen Zähler und darf weiterhin.
        $this->sendChat('10.2.2.2')->assertOk();
    }

    public function test_rate_limit_is_configurable(): void
    {
        config(['services.gemini.rate_limit' => 1]);

        $this->sendChat('10.3.3.3')->assertOk();
        $this->sendChat('10.3.3.3')->assertStatus(429);
    }
}
