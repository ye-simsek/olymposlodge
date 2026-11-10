<?php

namespace Tests\Feature;

use App\Mail\BookingRequestReceived;
use App\Models\Reservation;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class BookingRequestTest extends TestCase
{
    use RefreshDatabase;

    private function payload(Room $room, array $overrides = []): array
    {
        return [
            'room_id' => $room->id,
            'check_in' => now()->addDays(10)->toDateString(),
            'check_out' => now()->addDays(13)->toDateString(),
            'rooms' => 1, 'adults' => 2, 'children' => 1,
            'title' => 'Mrs', 'first_name' => 'Ada', 'last_name' => 'Lovelace',
            'email' => 'ada@example.com', 'phone' => '+90 555', 'country' => 'GB',
            'arrival_time' => '14:00–16:00', 'notes' => 'Quiet room please.',
            ...$overrides,
        ];
    }

    private function request(array $payload)
    {
        return $this->from('/en/booking')->post('/en/booking', $payload);
    }

    public function test_a_valid_request_is_stored_as_a_pending_reservation(): void
    {
        $room = Room::factory()->create();

        $this->request($this->payload($room))
            ->assertRedirect('/en/booking')
            ->assertSessionHas('success');

        $reservation = Reservation::sole();
        $this->assertSame($room->id, $reservation->room_id);
        $this->assertSame('pending', $reservation->status);
        $this->assertSame('direct', $reservation->channel);
        $this->assertSame('Mrs Ada Lovelace', $reservation->guest_name);
        $this->assertSame('ada@example.com', $reservation->guest_email);
        $this->assertSame(2, $reservation->adults);
        $this->assertSame(1, $reservation->children);
        $this->assertSame(3, $reservation->nights);
        $this->assertSame('Quiet room please.', $reservation->guest_notes);
        $this->assertStringContainsString('14:00–16:00', $reservation->internal_notes);
        $this->assertMatchesRegularExpression('/^OL-\d{4}-\d{4}$/', $reservation->confirmation_number);
    }

    public function test_a_request_never_quotes_a_price(): void
    {
        // Rates come from the lodge's reply, not from seeded placeholder prices.
        $room = Room::factory()->create(['price_per_night' => '120.00']);

        $this->request($this->payload($room));

        $this->assertEquals(0, Reservation::sole()->total_price);
    }

    public function test_the_lodge_is_emailed_when_a_notification_address_is_configured(): void
    {
        Mail::fake();
        config(['contact.notify_to' => 'frontdesk@example.com']);
        $room = Room::factory()->create();

        $this->request($this->payload($room));

        Mail::assertSent(BookingRequestReceived::class, fn (BookingRequestReceived $mail) => $mail->hasTo('frontdesk@example.com')
            && $mail->hasReplyTo('ada@example.com'));
    }

    public function test_a_mail_failure_does_not_lose_the_request(): void
    {
        config(['contact.notify_to' => 'frontdesk@example.com']);
        Mail::shouldReceive('to')->andThrow(new \RuntimeException('SMTP down'));

        $this->request($this->payload(Room::factory()->create()))->assertSessionHas('success');

        $this->assertSame(1, Reservation::count());
    }

    public function test_dates_guest_and_room_are_validated(): void
    {
        $room = Room::factory()->create();
        $inactive = Room::factory()->create(['is_active' => false]);

        $this->request($this->payload($room, [
            'check_in' => now()->subDay()->toDateString(),
            'check_out' => now()->subDays(2)->toDateString(),
            'first_name' => '', 'email' => 'not-an-email', 'adults' => 0,
        ]))->assertSessionHasErrors(['check_in', 'check_out', 'first_name', 'email', 'adults']);

        $this->request($this->payload($inactive))->assertSessionHasErrors(['room_id']);

        $this->assertSame(0, Reservation::count());
    }

    public function test_requests_are_rate_limited_and_honeypot_submissions_dropped(): void
    {
        $room = Room::factory()->create();

        $this->request($this->payload($room, ['website' => 'https://spam.example']))->assertSessionHas('success');
        $this->assertSame(0, Reservation::count());

        for ($i = 0; $i < 4; $i++) {
            $this->request($this->payload($room))->assertRedirect('/en/booking');
        }
        $this->request($this->payload($room))->assertStatus(429);
    }
}
