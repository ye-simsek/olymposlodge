<?php

namespace Tests\Feature;

use App\Models\Reservation;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReservationIntegrityTest extends TestCase
{
    use RefreshDatabase;

    private function reserve(Room $room): Reservation
    {
        return Reservation::create([
            'room_id' => $room->id,
            'confirmation_number' => Reservation::nextConfirmationNumber(),
            'guest_name' => 'Guest', 'guest_email' => 'guest@example.com',
            'check_in' => '2027-05-01', 'check_out' => '2027-05-03',
        ]);
    }

    public function test_confirmation_numbers_stay_unique_after_a_reservation_is_deleted(): void
    {
        $room = Room::factory()->create();
        $first = $this->reserve($room);
        $this->reserve($room);
        $third = $this->reserve($room);

        $first->delete();
        $fourth = $this->reserve($room);

        $this->assertNotSame($third->confirmation_number, $fourth->confirmation_number);
        $this->assertStringEndsWith('-0004', $fourth->confirmation_number);
    }

    public function test_numbering_restarts_each_year(): void
    {
        $room = Room::factory()->create();
        $this->travelTo('2026-12-31');
        $this->reserve($room);

        $this->travelTo('2027-01-02');

        $this->assertSame('OL-2027-0001', Reservation::nextConfirmationNumber());
    }

    public function test_a_room_with_reservations_cannot_be_deleted(): void
    {
        $room = Room::factory()->create();
        $this->reserve($room);

        $this->assertFalse($room->delete());

        $this->assertNotNull($room->fresh());
        $this->assertSame(1, Reservation::count());
    }

    public function test_a_room_without_reservations_can_be_deleted(): void
    {
        $room = Room::factory()->create();

        $this->assertTrue($room->delete());
        $this->assertNull($room->fresh());
    }
}
