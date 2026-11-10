<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ChatHardeningTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['services.gemini.key' => 'secret-test-key']);
    }

    private function ask()
    {
        return $this->postJson('/api/v1/chat', [
            'messages' => [['role' => 'user', 'text' => 'Hi']],
        ]);
    }

    public function test_api_key_travels_in_a_header_not_in_the_url(): void
    {
        Http::fake(['*' => Http::response([
            'candidates' => [['content' => ['parts' => [['text' => 'Hello!']]]]],
        ])]);

        $this->ask()->assertOk();

        Http::assertSent(fn (Request $request) => ! str_contains($request->url(), 'secret-test-key')
            && $request->hasHeader('x-goog-api-key', 'secret-test-key'));
    }

    public function test_a_gemini_timeout_returns_a_clean_502_instead_of_a_500(): void
    {
        Http::fake(fn () => throw new ConnectionException('cURL error 28: Operation timed out'));

        $response = $this->ask();

        $response->assertStatus(502)->assertJson(['unavailable' => true]);
        $this->assertStringNotContainsString('cURL', $response->getContent());
    }
}
