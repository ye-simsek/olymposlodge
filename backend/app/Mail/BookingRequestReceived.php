<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingRequestReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Reservation $reservation)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: sprintf(
                'Reservation request %s: %s to %s',
                $this->reservation->confirmation_number,
                $this->reservation->check_in->format('d.m.Y'),
                $this->reservation->check_out->format('d.m.Y'),
            ),
            replyTo: [new Address($this->reservation->guest_email, $this->reservation->guest_name)],
        );
    }

    public function content(): Content
    {
        return new Content(text: 'mail.booking-request');
    }
}
