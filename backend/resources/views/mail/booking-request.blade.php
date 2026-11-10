New reservation request from the website. Nothing is confirmed and no price was shown to the guest.

Reference: {!! $reservation->confirmation_number !!}
Room:      {!! $reservation->room?->name_en ?? '-' !!}
Check-in:  {!! $reservation->check_in->format('d.m.Y') !!}
Check-out: {!! $reservation->check_out->format('d.m.Y') !!} ({!! $reservation->nights !!} nights)
Guests:    {!! $reservation->adults !!} adults, {!! $reservation->children !!} children

Name:      {!! $reservation->guest_name !!}
Email:     {!! $reservation->guest_email !!}
Phone:     {!! $reservation->guest_phone ?: '-' !!}
Country:   {!! $reservation->guest_country ?: '-' !!}

{!! $reservation->internal_notes !!}

Guest's requests:
{!! $reservation->guest_notes ?: '-' !!}

--
Reply to this email to send the guest availability and the rate.
The request is stored in the admin panel under Reservations with status "pending".
