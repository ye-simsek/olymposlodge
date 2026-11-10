<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\NewsletterSubscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FormSpamProtectionTest extends TestCase
{
    use RefreshDatabase;

    private function contact(array $extra = [])
    {
        return $this->from('/en/contact')->post('/en/contact', [
            'firstname' => 'Ada', 'lastname' => 'Lovelace', 'email' => 'ada@example.com',
            'subject' => 'Reservation', 'message' => 'Hello there.', ...$extra,
        ]);
    }

    private function newsletter(string $email, array $extra = [])
    {
        return $this->from('/en')->post('/en/newsletter', ['email' => $email, 'consent' => true, ...$extra]);
    }

    public function test_contact_form_is_rate_limited_per_ip(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->contact()->assertRedirect('/en/contact');
        }

        $this->contact()->assertStatus(429);
        $this->assertSame(5, ContactMessage::count());
    }

    public function test_newsletter_form_is_rate_limited_per_ip(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->newsletter("guest{$i}@example.com")->assertRedirect('/en');
        }

        $this->newsletter('guest6@example.com')->assertStatus(429);
        $this->assertSame(5, NewsletterSubscriber::count());
    }

    public function test_contact_submission_with_filled_honeypot_is_dropped_silently(): void
    {
        $this->contact(['website' => 'https://spam.example'])
            ->assertRedirect('/en/contact')
            ->assertSessionHas('success');

        $this->assertSame(0, ContactMessage::count());
    }

    public function test_newsletter_submission_with_filled_honeypot_is_dropped_silently(): void
    {
        $this->newsletter('bot@example.com', ['website' => 'https://spam.example'])
            ->assertRedirect('/en')
            ->assertSessionHas('success');

        $this->assertSame(0, NewsletterSubscriber::count());
    }
}
