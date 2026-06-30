<?php

namespace Tests\Feature;

use App\Models\NewsletterSubscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsletterFormTest extends TestCase
{
    use RefreshDatabase;

    public function test_valid_subscription_redirects_back_and_persists(): void
    {
        $response = $this->from('/en/rooms')->post('/en/newsletter', [
            'email' => 'guest@example.com',
            'consent' => true,
        ]);

        $response->assertRedirect('/en/rooms');
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('newsletter_subscribers', [
            'email' => 'guest@example.com',
            'language' => 'en',
            'is_active' => true,
        ]);
    }

    public function test_missing_email_yields_validation_error(): void
    {
        $response = $this->from('/en/rooms')->post('/en/newsletter', [
            'consent' => true,
        ]);

        $response->assertRedirect('/en/rooms');
        $response->assertSessionHasErrors('email');
        $this->assertSame(0, NewsletterSubscriber::count());
    }

    public function test_consent_must_be_accepted(): void
    {
        $response = $this->from('/en/rooms')->post('/en/newsletter', [
            'email' => 'guest@example.com',
            'consent' => false,
        ]);

        $response->assertSessionHasErrors('consent');
        $this->assertSame(0, NewsletterSubscriber::count());
    }
}
