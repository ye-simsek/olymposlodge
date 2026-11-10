<?php

namespace Tests\Feature;

use App\Mail\ContactMessageReceived;
use App\Models\ContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactNotificationTest extends TestCase
{
    use RefreshDatabase;

    private const FORM = [
        'firstname' => 'Ada', 'lastname' => 'Lovelace',
        'email' => 'ada@example.com', 'phone' => '+90 555',
        'subject' => 'Reservation', 'message' => 'Hello there.',
    ];

    public function test_the_lodge_is_emailed_when_a_notification_address_is_configured(): void
    {
        Mail::fake();
        config(['contact.notify_to' => 'frontdesk@example.com']);

        $this->from('/en/contact')->post('/en/contact', self::FORM)->assertRedirect('/en/contact');

        Mail::assertSent(ContactMessageReceived::class, fn (ContactMessageReceived $mail) => $mail->hasTo('frontdesk@example.com')
            && $mail->hasReplyTo('ada@example.com')
            && $mail->contactMessage->message === 'Hello there.');
    }

    public function test_no_email_is_sent_when_no_notification_address_is_configured(): void
    {
        Mail::fake();
        config(['contact.notify_to' => null]);

        $this->from('/en/contact')->post('/en/contact', self::FORM)->assertRedirect('/en/contact');

        Mail::assertNothingSent();
        $this->assertSame(1, ContactMessage::count());
    }

    public function test_a_mail_failure_does_not_lose_the_message_or_break_the_form(): void
    {
        config(['contact.notify_to' => 'frontdesk@example.com']);
        Mail::shouldReceive('to')->andThrow(new \RuntimeException('SMTP down'));

        $response = $this->from('/en/contact')->post('/en/contact', self::FORM);

        $response->assertRedirect('/en/contact')->assertSessionHas('success');
        $this->assertSame(1, ContactMessage::count());
    }
}
