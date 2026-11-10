/**
 * YYYY-MM-DD for the visitor's local calendar day.
 *
 * Date#toISOString() reports the UTC day, which is yesterday for the first
 * hours after midnight east of UTC (Turkey, Germany) and tomorrow in the
 * evening west of it.
 */
export function toLocalDateString(d: Date): string {
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${d.getFullYear()}-${month}-${day}`;
}
