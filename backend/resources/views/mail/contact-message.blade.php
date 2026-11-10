New message from the website contact form.

Name:     {!! $contactMessage->name !!}
Email:    {!! $contactMessage->email !!}
Phone:    {!! $contactMessage->phone ?: '-' !!}
Language: {!! $contactMessage->language !!}
Subject:  {!! $contactMessage->subject !!}

{!! $contactMessage->message !!}

--
Reply to this email to answer the guest directly.
The message is also stored in the admin panel under Contact Messages.
