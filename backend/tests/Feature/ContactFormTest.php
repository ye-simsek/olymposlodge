<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactFormTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_renders_contact_page(): void
    {
        $this->get('/en/contact')
            ->assertOk()
            ->assertInertia(fn (\Inertia\Testing\AssertableInertia $p) => $p->component('Contact'));
    }

    public function test_valid_submission_persists_and_redirects_back(): void
    {
        $response = $this->from('/en/contact')->post('/en/contact', [
            'firstname' => 'Ada', 'lastname' => 'Lovelace',
            'email' => 'ada@example.com', 'phone' => '+90 555',
            'subject' => 'Reservation', 'message' => 'Hello there.',
        ]);

        $response->assertRedirect('/en/contact');
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Ada Lovelace', 'email' => 'ada@example.com',
            'subject' => 'Reservation', 'language' => 'en', 'status' => 'new',
        ]);
    }

    public function test_missing_required_fields_yield_validation_errors(): void
    {
        $response = $this->from('/en/contact')->post('/en/contact', [
            'firstname' => '', 'email' => 'not-an-email', 'message' => '',
        ]);

        $response->assertSessionHasErrors(['firstname', 'lastname', 'email', 'subject', 'message']);
        $this->assertSame(0, ContactMessage::count());
    }
}
