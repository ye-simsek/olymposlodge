<div style="display: flex; flex-direction: column; gap: 1rem; padding: 0.5rem 0;">
    @foreach ($logs as $log)
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            {{-- User message --}}
            <div style="display: flex; justify-content: flex-end;">
                <div style="
                    max-width: 80%;
                    background: #1e293b;
                    color: #f1f5f9;
                    padding: 0.625rem 0.875rem;
                    border-radius: 1rem 1rem 0.25rem 1rem;
                    font-size: 0.875rem;
                    line-height: 1.5;
                ">
                    {{ $log->user_message }}
                </div>
            </div>

            {{-- Bot response --}}
            <div style="display: flex; justify-content: flex-start;">
                <div style="
                    max-width: 80%;
                    background: #f8fafc;
                    color: #1e293b;
                    border: 1px solid #e2e8f0;
                    padding: 0.625rem 0.875rem;
                    border-radius: 1rem 1rem 1rem 0.25rem;
                    font-size: 0.875rem;
                    line-height: 1.6;
                ">
                    <div class="chat-md">
                        {!! \Illuminate\Support\Str::markdown($log->bot_response, ['html_input' => 'escape', 'allow_unsafe_links' => false]) !!}
                    </div>
                    <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.375rem;">
                        {{ $log->created_at->format('H:i') }}
                    </div>
                </div>
            </div>
        </div>
    @endforeach
</div>

<style>
    .chat-md p                    { margin: 0 0 0.4rem; }
    .chat-md p:last-child         { margin-bottom: 0; }
    .chat-md strong               { font-weight: 600; }
    .chat-md em                   { font-style: italic; }
    .chat-md ul, .chat-md ol      { margin: 0.25rem 0 0.4rem 1.25rem; padding: 0; }
    .chat-md li                   { margin-bottom: 0.2rem; }
    .chat-md li:last-child        { margin-bottom: 0; }
</style>
