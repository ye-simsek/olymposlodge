/**
 * Spam trap for public forms. People never see or reach this field; bots that
 * fill every input do. The server drops any submission where it has a value
 * (see ContactController / NewsletterController).
 */
export default function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
        <div
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
        >
            <label>
                Website
                <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </label>
        </div>
    );
}
