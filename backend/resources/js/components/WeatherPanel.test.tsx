import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import WeatherPanel from './WeatherPanel';

vi.mock('@inertiajs/react', () => ({
    usePage: () => ({ props: { locale: 'en' } }),
}));

vi.mock('@/hooks/use-translation', () => ({
    useTranslation: () => ({ t: (k: string) => k, tRaw: () => [] }),
}));

const respond = (ok: boolean, body: unknown) =>
    vi.fn(async () => ({ ok, status: ok ? 200 : 429, json: async () => body })) as unknown as typeof fetch;

afterEach(() => vi.restoreAllMocks());

describe('WeatherPanel', () => {
    it('shows "unavailable" instead of crashing when the API answers with an error body', async () => {
        // What Open-Meteo sends when rate-limited or on a bad request.
        globalThis.fetch = respond(false, { error: true, reason: 'Minutely API request limit exceeded.' });

        render(<WeatherPanel />);

        await waitFor(() => expect(screen.getByText('weather.unavailable')).toBeDefined());
    });

    it('shows "unavailable" when a 200 response is missing the expected fields', async () => {
        globalThis.fetch = respond(true, { latitude: 36.4 });

        render(<WeatherPanel />);

        await waitFor(() => expect(screen.getByText('weather.unavailable')).toBeDefined());
    });

    it('renders the temperature for a valid response', async () => {
        globalThis.fetch = respond(true, {
            current: { temperature_2m: 21.4, weathercode: 0, windspeed_10m: 5, winddirection_10m: 90 },
            daily: {
                time: ['2026-11-10'], weathercode: [0], temperature_2m_max: [23], temperature_2m_min: [14],
                windspeed_10m_max: [9], winddirection_10m_dominant: [90], sea_surface_temperature_max: [22],
            },
        });

        render(<WeatherPanel />);

        await waitFor(() => expect(screen.getByText('21°')).toBeDefined());
    });
});
